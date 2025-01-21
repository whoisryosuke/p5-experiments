import P5Sketch from "@/components/P5Sketch";
import { loadAudio } from "@/helpers/audio";
import {
  drawOscillatorLine,
  drawOscillatorLineAnimated,
} from "@/helpers/drawing/audio";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { rotateXY } from "@/helpers/drawing/rotateXY";
import { saveArt } from "@/helpers/drawing/saveArt";
import { animate } from "motion";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

// Make them particles and have them animate using Motion lib maybe?

const FILENAME = "WaveformBallR2";
// const MUSIC_FILE = "/samples/assorted/2024-12-14-rain-on-window.mp3";
const MUSIC_FILE =
  "/samples/assorted/Piano - Mystic Piano - Chill Playthrough.mp3";

type WaveformParticle = {
  id: number;
  chunk: number;
  animation: {
    x: 0;
    y: 0;
    z: 0;
    opacity: 0;
  };
};

const WaveformBallR2 = (props: Props) => {
  const Sketch = (p: p5) => {
    const skipChunk = 4;
    let y = 100;
    let audioCtx: AudioContext;
    let audioBuffer: AudioBuffer;
    let analyser: AnalyserNode;
    let bufferLength: number;
    let audioElement: HTMLAudioElement;
    let dataArray: Uint8Array<ArrayBuffer>;
    let particles: Array<WaveformParticle> = [];
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
      particles = new Array(bufferLength).fill(0).map((_, id) => ({
        id,
        chunk: id % skipChunk,
        animation: {
          x: 0,
          y: 0,
          z: 0,
          opacity: 0,
        },
      }));

      console.log("particles", particles);

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
      // only run every 30th frame
      // update particles
      if (p.frameCount % 30 != 0) {
        if (!audioLoaded) return;

        analyser.getByteTimeDomainData(dataArray);

        // We get 1024 samples back, but don't use all of them
        // but if we only use first chunk - data isn't consistent
        // so we spread out the points across the entire data set
        // skipCount = 4 would be every 4th data point gets used
        const segmentWidth = p.width / (bufferLength / skipChunk);

        const radius = p.height / 4;
        const startX = 0;
        const startY = 0;
        const resolution = bufferLength / skipChunk;
        for (let i = 0; i < bufferLength / skipChunk; i++) {
          // All the magic happens in the y axis here
          // The audio data comes back in a range from 0 (lows) - 128 (mid) - 256 (high)
          const audioFreqencyHeight = 128;

          for (let chunkId = 0; chunkId <= skipChunk; chunkId++) {
            const dataId = i + chunkId;
            // Get the particle
            if (particles.length <= 0) return;
            const particleId = particles.findIndex(
              (particle) => particle.id == dataId
            );
            if (particleId < 0) return;

            const v = p.map(
              dataArray[dataId],
              audioFreqencyHeight / 4,
              audioFreqencyHeight,
              0,
              1
            );
            const textHeight = p.map(
              dataArray[dataId],
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

            animate(
              particles[particleId].animation,
              {
                x: positionExploded.x,
                y: positionExploded.y,
                z: v * 100,
                opacity: textHeight,
              },
              {
                duration: 0.1,
                autoplay: true,
              }
            );
          }
        }
      }

      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      p.orbitControl();

      particles.forEach((particle) => {
        const { chunk, animation } = particle;
        // p.vertex(x, y);
        p.push();
        p.rotateY(p.QUARTER_PI * chunk);
        p.textSize(12 * animation.opacity);
        const color = p.color(BASE_COLORS["blue-4"]);
        color.setAlpha(255 * animation.opacity);
        p.stroke(color);
        p.strokeWeight(4 * animation.opacity);
        // p.text("💧", x, y);
        p.point(animation.x, animation.y, animation.z);
        p.pop();
      });
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default WaveformBallR2;
