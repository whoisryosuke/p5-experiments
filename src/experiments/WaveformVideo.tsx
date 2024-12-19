import P5Sketch from "@/components/P5Sketch";
import { drawOscillatorLineAnimated } from "@/helpers/drawing/audio";
import {
  createGridBoxes,
  createGridLines,
} from "@/helpers/drawing/createGridLines";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import { animate } from "motion";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

/**
 * This template takes an animation and renders it frame by frame
 * into an image sequence you can combine later into a video
 * using software like Premiere, Final Cut, or Resolve.
 *
 * Make sure to edit the variables below to change video settings 👇
 */

const FILENAME = "WaveformVideo";
// 📺 The width and height of the "video" you want to render
const WIDTH = 3840;
const HEIGHT = 2160;
/**
 * 🏃 Number of frames per second
 */
const FPS = 60;
/**
 * 🐇 Time in ms that we wait to render each frame.
 * If you have performance issues, increase this number to wait longer for render - but decrease CPU load.
 */
const TIME_BETWEEN_FRAMES = 100;
/**
 * 💽 Enables or disables saving image sequence
 */
const SAVE_ENABLED = false;

const MUSIC_FILE = "/samples/mixed/C4.mp3";

async function loadAudio(filepath: string) {
  const audioCtx = new window.AudioContext();
  try {
    const response = await fetch(filepath);

    const fileBuffer = await response.arrayBuffer();
    const audioBuffer = audioCtx.decodeAudioData(fileBuffer);
    return audioBuffer;
  } catch (err) {
    console.error(`Unable to fetch the audio file. Error: ${err.message}`);
  }
}

type Props = {};
const WaveformVideo = (props: Props) => {
  const Sketch = (p: p5) => {
    let y = 100;
    let frameNumber = 0;
    let texture: p5.Graphics;
    let animation = {
      progress: 0,
    };
    let animationControls: ReturnType<typeof animate>;
    let audioBuffer: AudioBuffer;
    let waveformData;
    let audioLoaded = false;
    /**
     * ⏯️ Enables or disables rendering frame by frame
     */
    let renderEnabled = false;
    /**
     * ⏱️ Total duration of animation/video. Time in seconds.
     */
    let renderDuration = 1;

    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30); // This FPS doesn't matter for video. Lower is better to improve perf.
      // Create the offscreen texture and store it in a local variable
      texture = p.createGraphics(WIDTH, HEIGHT);

      // Load the audio and generate waveform data
      loadAudio(MUSIC_FILE).then((newBuffer) => {
        // Save the buffer with audio data
        audioBuffer = newBuffer;

        // Generate waveform data
        waveformData = audioBuffer.getChannelData(0);

        // Grab duration
        renderDuration = audioBuffer.duration;

        // Since we have to wait for audio to load
        // We have flags here to start rendering
        audioLoaded = true;
        renderEnabled = true;

        // We create an animation to control
        animationControls = animate(
          animation,
          { progress: 1 },
          {
            // This is important, make sure it's turned off
            autoplay: false,

            // Everything else is up to you!
            // Duration of animation
            duration: renderDuration,
            // Loops infinitely
            repeat: Infinity,
            // Makes it go back and forth (without creating a sequence yourself)
            repeatType: "mirror",
          }
        );
        animationControls.pause();
      });

      // Where all the actual drawing happens.
      // This function basically keeps "looping" until we reach video duration (set above)
      const draw = () => {
        const time = frameNumber / 60;
        if (renderEnabled && time <= renderDuration) {
          animationControls.time = time;
          // We manually loop here
          p.loop();

          // Draw whatever you want!
          texture.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black
          // BG Lines
          createGridBoxes(texture, 60);

          drawOscillatorLineAnimated(
            texture,
            waveformData,
            "blue",
            // Math.min(time / renderDuration, 1), // Using internal time
            Math.min(animation.progress, 1), // Use spring based time
            1024 / 10
          );

          // We stop loop here after drawing
          p.noLoop();
        }

        // Save the canvas with frame number to compile for videos
        if (renderEnabled && time <= renderDuration) {
          if (SAVE_ENABLED) texture.save(`${FILENAME}-${frameNumber}`);

          frameNumber += 1;
          // We queue up another frame to render after this
        }
        setTimeout(draw, TIME_BETWEEN_FRAMES);
      };

      // Start the drawing the first frame
      setTimeout(draw, TIME_BETWEEN_FRAMES);
    };
    p.keyPressed = () => {};
    p.draw = () => {
      // We assume the user's screen is wider than taller, and scale based off that
      // This is a proportional calculation between the screen size and the size we need
      // 3840 / 2160 = p.width / imageHeight
      const imageHeight = (p.width * 2160) / 3840;

      // Display the offscreen texture to user for quick preview
      p.image(texture, 0, 0, p.width, imageHeight);

      // Display frame count
      p.noStroke();
      p.fill(p.color(BASE_COLORS["gray-3"]));
      p.textSize(12);
      p.textStyle("normal");
      p.text("Frame Number:".toLocaleUpperCase(), 36, 36);
      p.textStyle("bold");
      p.textSize(18);
      p.text(frameNumber, 170, 37);

      const time = frameNumber / FPS;
      p.fill(p.color(BASE_COLORS["gray-3"]));
      p.textSize(12);
      p.textStyle("normal");
      p.text("Time:".toLocaleUpperCase(), 36, 64);
      p.textStyle("bold");
      p.textSize(18);
      p.text(time.toFixed(2), 90, 65);

      // Display progress bar
      // First we render the actual progress
      p.fill(p.color(BASE_COLORS["blue-3"]));
      const progressTotalWidth = 300;
      // We use `min` here to limit it by the total duration (cause sometimes it spills over a little)
      const progress = Math.min(time / renderDuration, 1);
      const progressWidth = progress * progressTotalWidth;
      p.rect(36, 96, progressWidth, 30);
      // Then render a "blank" full size one
      p.stroke(p.color(BASE_COLORS["gray-3"]));
      p.noFill();
      p.rect(36, 96, progressTotalWidth, 30);
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default WaveformVideo;
