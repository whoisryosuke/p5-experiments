import { BASE_COLORS } from "themes/colors/base";
import mapRange from "../mapRange";
import p5, { Graphics } from "p5";

export function drawOscillatorLine(
  p: p5 | Graphics,
  levels: Float32Array,
  colorMode = "blue"
) {
  p.strokeWeight(2);
  p.stroke(BASE_COLORS[`${colorMode}-4`]);
  const samples = 1024;
  const segmentSize = Math.floor(levels.length / samples);

  const filteredData = levels.filter((_, index) => index % segmentSize == 0);

  for (let i = 0; i < samples; i++) {
    const normalized = filteredData[i] * 10;
    const prevNormalized = filteredData[i - 1] * 10;

    const prevX = mapRange(i - 1, 0, samples, 0, p.width);
    const prevY = mapRange(
      prevNormalized,
      -1,
      1,
      p.height / 4,
      (p.height / 4) * 3
    );

    const x = mapRange(i, 0, samples, 0, p.width);
    const y = mapRange(normalized, -1, 1, p.height / 4, (p.height / 4) * 3);

    p.line(prevX, prevY, x, y);
  }
}

export function drawOscillatorLineAnimated(
  p: p5 | Graphics,
  levels: Float32Array,
  colorMode = "blue",
  progress: number,
  visibleCount: number
) {
  p.strokeWeight(2);
  p.stroke(BASE_COLORS[`${colorMode}-4`]);
  const samples = 1024;
  const segmentSize = Math.floor(levels.length / samples);

  const filteredData = levels.filter((_, index) => index % segmentSize == 0);

  const start = Math.round(mapRange(progress, 0, 1, 0, samples - visibleCount));
  const end = Math.round(Math.min(start + visibleCount, samples));

  console.log("render waveform", start, end);

  for (let i = start; i < end; i++) {
    const normalized = filteredData[i] * 10;
    const prevNormalized = filteredData[i - 1] * 10;

    const prevX = mapRange(i - 1, start, end, 0, p.width);
    const prevY = mapRange(
      prevNormalized,
      -1,
      1,
      p.height / 4,
      (p.height / 4) * 3
    );

    const x = mapRange(i, start, end, 0, p.width);
    const y = mapRange(normalized, -1, 1, p.height / 4, (p.height / 4) * 3);

    if (i == start) {
      console.log("waveform", normalized, prevNormalized);
      console.log("line", prevX, prevY, x, y);
    }

    p.line(prevX, prevY, x, y);
  }
}
