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
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};
type WaveformParticle = {
  time: number;
  data: Uint8Array<ArrayBuffer>;
};

const FILENAME = "WaveformSamplerR4";
// const MUSIC_FILE = "/samples/assorted/2024-12-14-rain-on-window.mp3";
const MUSIC_FILE =
  "/samples/assorted/Piano - Mystic Piano - Chill Playthrough.mp3";
const VOLUME = 0.3;
const WAVE_BOX_HEIGHT = 50;

const WaveformSamplerR4 = (props: Props) => {
  const Sketch = (p: p5) => {
    let time = 0;
    let cam: Camera;
    let audioCtx: AudioContext;
    let audioBuffer: AudioBuffer;
    let analyser: AnalyserNode;
    let bufferLength: number;
    let audioElement: HTMLAudioElement;
    let dataArray: Uint8Array<ArrayBuffer>;
    let waveforms: WaveformParticle[] = [];
    let lastCheck = 0;
    let audioLoaded = false;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(60);
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      // Create a p5.Camera object.
      cam = p.createCamera();

      // Place the camera at the top-center.
      // cam.setPosition(0, -400, 800);
      cam.setPosition(-154.8, -202.84, 395.03);
      cam.lookAt(35.87, -78.39, 159.27);

      // Point the camera at th

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

      // audioElement.play();
      audioElement.volume = VOLUME;

      audioLoaded = true;

      setInterval(() => console.log("waveforms", waveforms), 1000);
      // DEBUG: Check camera position to sync
      // setInterval(
      //   () =>
      //     console.log(
      //       "camera",
      //       cam.eyeX,
      //       cam.eyeY,
      //       cam.eyeZ,
      //       cam.centerX,
      //       cam.centerY,
      //       cam.centerZ
      //     ),
      //   1000
      // );
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

    const addWaveform = (currentTime: number) => {
      // Get latest waveform data
      analyser.getByteTimeDomainData(dataArray);

      // Check if it's average to zero
      const sum = dataArray.reduce((prev, current) => {
        return prev + current;
      }, 0);
      const avg = sum / dataArray.length;
      // The analyzer returns a number where 128 = 0
      // so we check if anything is above or below that within a certain range
      const shouldSpawn = Math.abs(avg - 128) > 0.3;

      if (!shouldSpawn) return;
      // Store it in our cache
      // @TODO: Ideally optimize this - we don't need all values - just enough for points
      waveforms.push({
        time: currentTime,
        data: dataArray.slice(),
      });
    };

    p.draw = () => {
      const isPaused = audioElement.paused;
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      p.orbitControl();

      p.noFill();
      p.strokeWeight(0.5);
      p.stroke(BASE_COLORS[`blue-4`]);
      // p.box();

      if (!audioLoaded) return;

      // We want to run this function every 1s or so
      if (!isPaused && lastCheck > 420) {
        addWaveform(time);

        // Reset
        lastCheck = 0;
      }
      // Increment time
      lastCheck += p.deltaTime;
      time += p.deltaTime;

      waveforms.forEach((waveform, waveformIndex) => {
        const audioWidth = p.width / 4;
        const segmentWidth = audioWidth / bufferLength;
        p.beginShape();
        for (let i = 0; i < bufferLength; i++) {
          // All the magic happens in the y axis here
          // The audio data comes back in a range from 0 (lows) - 128 (mid) - 256 (high)
          const audioFrequencyHeight = 128;
          const v = p.map(waveform.data[i], 0, audioFrequencyHeight, 0, 1);
          // This centers line on screen
          const y = (v * p.height) / 2 - p.height / 2;
          const x = i * segmentWidth;

          p.vertex(x, y, waveform.time * 0.01);
        }
        // Bottom right
        p.vertex(audioWidth, WAVE_BOX_HEIGHT, waveform.time * 0.01);
        // Bottom left
        p.vertex(0, WAVE_BOX_HEIGHT, waveform.time * 0.01);
        // back to center
        p.vertex(0, 0, waveform.time * 0.01);
        p.endShape();
      });

      // end draw
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default WaveformSamplerR4;
