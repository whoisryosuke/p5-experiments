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

type Props = {};

const FILENAME = "RainSoundVizR3";
const MUSIC_FILE = "/samples/assorted/2024-12-14-rain-on-window.mp3";

const RainSoundVizR3 = (props: Props) => {
  const Sketch = (p: p5) => {
    let y = 100;
    let audioCtx: AudioContext;
    let audioBuffer: AudioBuffer;
    let analyser: AnalyserNode;
    let bufferLength: number;
    let audioElement: HTMLAudioElement;
    let dataArray: Uint8Array<ArrayBuffer>;
    let waveformData;
    let audioLoaded = false;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(60);

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

      // We get 1024 samples back, but don't use all of them
      // but if we only use first chunk - data isn't consistent
      // so we spread out the points across the entire data set
      // skipCount = 4 would be every 4th data point gets used
      const skipChunk = 4;
      const segmentWidth = p.width / (bufferLength / skipChunk);

      const radius = p.height / 4;
      const startX = p.width / 4;
      const startY = p.height;
      const resolution = bufferLength / skipChunk;
      for (let i = 0; i < bufferLength / skipChunk; i++) {
        // All the magic happens in the y axis here
        // The audio data comes back in a range from 0 (lows) - 128 (mid) - 256 (high)
        const audioFreqencyHeight = 128;
        const v = p.map(dataArray[i + skipChunk], 0, audioFreqencyHeight, 0, 1);
        const textHeight = p.map(
          dataArray[i + skipChunk],
          0,
          audioFreqencyHeight,
          -3,
          1
        );

        // Draw circle in center of screen
        const angle = (p.TWO_PI / resolution) * i;
        const baseX = startX + p.cos(angle) * radius;
        const baseY = startY + p.sin(angle) * radius;

        const y = baseX;
        const x = baseY;
        const position = p.createVector(x, y);
        // We want to explode the points from center more outwards
        // So we calculate the normal of the current position vector
        // and use that with the audio data to make a vec to multiply the position against
        const normalDirection = position.copy().normalize();
        const normalAmplitude = p.createVector(v, v);
        const normalExplosion = normalDirection.mult(normalAmplitude);
        const positionExploded = position.mult(normalAmplitude);

        // p.vertex(x, y);
        p.textSize(12 * textHeight);
        const color = p.color(BASE_COLORS["blue-4"]);
        color.setAlpha(255 * textHeight);
        p.stroke(color);
        p.strokeWeight(4 * textHeight);
        // p.text("💧", x, y);
        p.point(positionExploded.x, positionExploded.y, v * 100);
      }
      // p.endShape();
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default RainSoundVizR3;
