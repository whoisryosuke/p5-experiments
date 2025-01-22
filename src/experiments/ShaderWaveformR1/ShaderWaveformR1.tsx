import P5Sketch from "@/components/P5Sketch";
import { loadAudio } from "@/helpers/audio";
import {
  drawOscillatorLine,
  drawOscillatorLineAnimated,
} from "@/helpers/drawing/audio";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { rotateXY } from "@/helpers/drawing/rotateXY";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";
import displace from "./shaders/displace.vert";
import frag from "./shaders/frag.frag";

type Props = {};

const FILENAME = "ShaderWaveformR1";
// const MUSIC_FILE = "/samples/assorted/2024-12-14-rain-on-window.mp3";
const MUSIC_FILE =
  "/samples/assorted/Piano - Mystic Piano - Chill Playthrough.mp3";

const ShaderWaveformR1 = (props: Props) => {
  const Sketch = (p: p5) => {
    let y = 100;
    let audioCtx: AudioContext;
    let audioBuffer: AudioBuffer;
    let analyser: AnalyserNode;
    let bufferLength: number;
    let audioElement: HTMLAudioElement;
    let dataArray: Uint8Array<ArrayBuffer>;
    let waveformData;
    let customShader;
    let audioLoaded = false;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(60);
      customShader = p.createShader(displace, frag);

      audioElement = new Audio(MUSIC_FILE);
      audioCtx = new window.AudioContext();
      const audioSource = audioCtx.createMediaElementSource(audioElement);
      analyser = audioCtx.createAnalyser();

      // Configure analyser
      analyser.fftSize = 1024;
      bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      audioSource.connect(analyser);
      analyser.connect(audioCtx.destination);

      audioElement.play();
      audioElement.volume = 1.0;

      audioLoaded = true;

      p.camera(0, 0, p.height / 2 / p.tan(p.PI / 6), 0, 0, 0, 0, 1, 0);

      // Load the audio and generate waveform data
      // loadAudio(MUSIC_FILE).then((newBuffer) => {
      //   // Save the buffer with audio data
      //   audioBuffer = newBuffer;

      //   // Generate waveform data
      //   waveformData = audioBuffer.getChannelData(0);

      //   // Since we have to wait for audio to load
      //   // We have flags here to start rendering
      //   audioLoaded = true;
      // });
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);

      if (p.key == "p") {
        const isPaused = audioElement.paused;
        const isDone = audioElement.currentTime == audioElement.duration;

        if (!isPaused) {
          console.log("Pausing audio");
          audioElement.pause();
        }
        if (isPaused) {
          console.log("Resuming audio");
          audioElement.play();
        }
        if (isDone) {
          console.log("Restarting audio");
          audioElement.currentTime = 0;
          audioElement.play();
        }
      }
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      p.orbitControl();

      if (!audioLoaded) return;

      // drawOscillatorLine(p, waveformData, "blue");

      analyser.getByteTimeDomainData(dataArray);

      customShader.setUniform("time", p.millis());
      customShader.setUniform("waveform", dataArray);

      p.shader(customShader);
      p.plane(100, 100, 100, 100);
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default ShaderWaveformR1;
