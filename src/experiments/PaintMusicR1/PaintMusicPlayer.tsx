import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React, { useEffect, useRef } from "react";
import { BASE_COLORS } from "themes/colors/base";

// In ms
const TOTAL_TIME = 6000;
type FreqNode = {
  osc: OscillatorNode;
  gain: GainNode;
};

type Props = {};

const PaintMusicR1 = (props: Props) => {
  const soundCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    function getCanvas() {
      const canvasEl = document
        .getElementById("canvas-wrapper")
        .getElementsByTagName("canvas")[0];
      console.log("checking for canvas");
      if (canvasEl) {
        console.log("got canvas", canvasEl);
        soundCanvas.current = canvasEl;
      }
    }
    setTimeout(getCanvas, 1000);
  }, []);

  const Sketch = (p: p5) => {
    let playing = false;
    let time = 0;
    let audioCtx: AudioContext = null;
    let freqNodes: FreqNode[] = [];
    // Number is index that maps to `freqNodes`
    let audioNodes: number[] = [];

    const getXFromTime = () => {
      return (time / TOTAL_TIME) * p.width;
    };

    const playSound = () => {
      if (!soundCanvas.current) return;
      // Sample canvas for a sliver of it to detect frequency
      const ctx = soundCanvas.current.getContext("2d");
      const x = Math.floor(getXFromTime());
      console.log("sound x", x);
      // We take a 1px by `CANVAS_HEIGHT` pixel sample
      const canvasSample = ctx.getImageData(x, 0, 1, p.height);

      const data = canvasSample.data;
      // console.log("canvas data", data);

      // Image data contains RGBA, so this tells us how many "colors" or "pixels" we're sampling
      const dataSize = data.length / 4;
      const noteSegmentSize = data.length / 12;

      // Loop over each segment and average the color
      let segments: Array<Array<number>> = [];
      for (let i = 0; i < data.length; i += 4) {
        // const currentSegment = Math.floor(noteSegmentSize * i);
        const currentSegment = Math.ceil(p.map(i, 0, data.length, 0, 11));
        console.log("current segment", currentSegment);

        // data[i] // red
        // data[i + 1] // green
        // data[i + 2] // blue

        // console.log("green data", data[i + 1]);
        if (!Array.isArray(segments[currentSegment]))
          segments[currentSegment] = [];
        segments[currentSegment].push(data[i + 1]);
      }

      console.log(
        "segments",
        segments[4].filter((sample) => sample > 0)
      );
      // We average the color samples of each segment - and map them to 0-1 (from 0-255 color range)
      const segmentsAveraged = segments.map(
        (segment) => segment.reduce((a, b) => a + b) / segment.length / 255
      );
      console.log("averaged array - ideally notes?", segmentsAveraged);

      // Play notes using the averaged data
      // In this case we'll use green color to control volume
      updateOscillatorsIntensity(segmentsAveraged);
      playOscillators(segmentsAveraged);
      segmentsAveraged.forEach((avg) => {});

      // Loop
      if (playing) requestAnimationFrame(playSound);
    };

    const updateOscillatorsIntensity = (volumes: number[]) => {
      freqNodes.forEach((node, index) => {
        // console.log("updating intensity", index, volumes[index]);
        node.gain.gain.value = volumes[index];
      });
    };

    const playOscillators = (volumes: number[]) => {
      volumes.forEach((volume, index) => {
        const node = freqNodes[index];
        // 0? Don't play sound
        if (volume <= 0) {
          // Disconnect all prev nodes
          node.gain.disconnect();
        }
        // Play sound
        node.gain.connect(audioCtx.destination);
      });
    };

    const stopSound = () => {
      disconnectGainNodes();
    };

    const disconnectGainNodes = () => {
      // Disconnect all prev nodes
      freqNodes.forEach((node) => {
        node.gain.disconnect();
      });
    };

    const connectAudioNodes = () => {
      // Disconnect all prev nodes
      freqNodes.forEach((node) => {
        node.osc.disconnect();
        node.gain.disconnect();
      });

      // Chain audio nodes to output
      audioNodes.forEach((nodeIndex) => {
        const nodes = freqNodes[nodeIndex];
        nodes.osc.connect(nodes.gain);
        nodes.gain.connect(audioCtx.destination);
      });
    };

    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white

      // setup audio
      audioCtx = new AudioContext();

      // Setup 12 oscillators for each note that needs to play
      new Array(12).fill(0).forEach((_, index) => {
        const gain = audioCtx.createGain();
        const osc = audioCtx.createOscillator();
        osc.type = "sine";
        // Oscillators use frequency to determine "sound".
        // 440hz = A4 note, 220hz = A3 note.
        // We map from C4 to B4 (which is 261-492 Hz)
        // Ideally if you wanted to change octave just 1/2 or double as needed.
        osc.frequency.value = p.map(index, 0, 12, 261, 493);

        // We connect oscillator to gain
        // To make sound - we just connect/disconnect gain node from output
        osc.connect(gain);

        // The way oscillators work - once you stop, they have to be recreated
        // So we start here and when we want to play, we connect oscillator to output.
        // And to stop playing, we disconnect it
        osc.start();

        freqNodes.push({ osc, gain });
      });
    };
    p.keyPressed = () => {
      if (p.key == "k") {
        playing = !playing;
        console.log("playing", playing);

        if (playing) playSound();
        if (!playing) stopSound();
      }
    };
    p.draw = () => {
      p.clear();
      // p.background(p.color(BASE_COLORS["gray-9"]));
      if (playing) {
        // console.log("time", time);
      }

      p.noStroke();
      p.fill(p.color(BASE_COLORS["blue-5"]));
      const x = getXFromTime();

      p.rect(x, 0, 1, p.height);

      if (playing) time += p.deltaTime;
    };
  };

  return <P5Sketch id="music-player" sketch={Sketch} />;
};

export default PaintMusicR1;
