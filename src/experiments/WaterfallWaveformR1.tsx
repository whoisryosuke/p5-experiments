import P5Sketch from "@/components/P5Sketch";
import { loadAudio } from "@/helpers/audio";
import {
  drawOscillatorLine,
  drawOscillatorLineAnimated,
} from "@/helpers/drawing/audio";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { rotateXY } from "@/helpers/drawing/rotateXY";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5, { Camera } from "p5";
import React, { useEffect, useRef } from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "WaterfallWaveformR1";
// const MUSIC_FILE = "/samples/assorted/2024-12-14-rain-on-window.mp3";
const MUSIC_FILE =
  "/samples/assorted/Piano - Mystic Piano - Chill Playthrough.mp3";
const VOLUME = 0.3;

const WaterfallWaveformR1 = (props: Props) => {
  const audioElement = useRef<HTMLAudioElement>(new Audio(MUSIC_FILE));
  const Sketch = (p: p5) => {
    let y = 100;
    let cam: Camera;
    let audioCtx: AudioContext;
    let analyser: AnalyserNode;
    let bufferLength: number;
    // let audioElement: HTMLAudioElement;
    let dataArray: Float32Array<ArrayBuffer>;
    let audioLoaded = false;
    let button: p5.Element;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(60);

      // Create a p5.Camera object.
      cam = p.createCamera();

      // Place the camera at the top-center.
      cam.setPosition(0, -400, 800);

      // Point the camera at th

      // audioElement = new Audio(MUSIC_FILE);
      audioCtx = new window.AudioContext();
      const audioSource = audioCtx.createMediaElementSource(
        audioElement.current
      );
      analyser = audioCtx.createAnalyser();

      // Configure analyser
      analyser.fftSize = 1024;
      bufferLength = analyser.frequencyBinCount;
      dataArray = new Float32Array(bufferLength);

      audioSource.connect(analyser);
      analyser.connect(audioCtx.destination);

      // audioElement.play();
      audioElement.current.volume = VOLUME;

      audioLoaded = true;

      const button = p.createButton("Play Audio");
      button.mousePressed(() => audioElement.current.play());
      button.position(p.width - 32 - button.width, 32);

      // p.camera(0, 0, p.height / 2 / p.tan(p.PI / 6), 0, 0, 0, 0, 1, 0);

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
        const isPaused = audioElement.current.paused;
        const isDone =
          audioElement.current.currentTime == audioElement.current.duration;

        if (!isPaused) {
          console.log("Pausing audio");
          audioElement.current.pause();
        }
        if (isPaused) {
          console.log("Resuming audio");
          audioElement.current.play();
        }
        if (isDone) {
          console.log("Restarting audio");
          audioElement.current.currentTime = 0;
          audioElement.current.play();
        }
      }
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      p.orbitControl();

      p.box();

      if (!audioLoaded) return;

      // drawOscillatorLine(p, waveformData, "blue");

      analyser.getFloatFrequencyData(dataArray);

      const audioWidth = p.width;

      const segmentWidth = audioWidth / bufferLength;

      p.noFill();
      p.strokeWeight(2);
      p.stroke(BASE_COLORS[`blue-4`]);
      p.beginShape();
      for (let i = 0; i < bufferLength; i++) {
        // All the magic happens in the y axis here
        // The audio data comes back in a range from 0 (lows) - 128 (mid) - 256 (high)
        const audioFreqencyHeight = 128;
        const v = p.map(dataArray[i], -10, -100, 0, 1);
        const amplifiedV = Math.pow(v, 1.4);
        // This centers line on screen
        const y = (v * p.height) / 2 - p.height / 2;
        const x = i * segmentWidth;

        p.vertex(x, y);
      }
      p.endShape();
      // p.endShape();
    };
  };

  useEffect(() => {
    const el = audioElement.current;
    return () => {
      el.pause();
      el.remove();
    };
  }, []);

  return <P5Sketch sketch={Sketch} />;
};

export default WaterfallWaveformR1;
