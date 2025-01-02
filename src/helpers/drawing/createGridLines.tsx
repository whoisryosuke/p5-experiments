import p5 from "p5";
import { BASE_COLORS } from "themes/colors/base";

export const createGridLines = (p: p5, lineNumber: number) => {
  p.strokeWeight(0.5);
  p.stroke(p.color(BASE_COLORS["gray-8"]));
  for (let i = 0; i < lineNumber; i++) {
    const x = p.map(i, 0, lineNumber, 0, p.width);
    p.line(x, 0, x, p.height);
  }
};

export const createGridBoxes = (p: p5, lineNumber: number) => {
  p.strokeWeight(0.5);
  p.stroke(p.color(BASE_COLORS["gray-8"]));
  for (let x = 0; x < lineNumber; x++) {
    for (let y = 0; y < lineNumber; y++) {
      const newX = p.map(x, 0, lineNumber, 0, p.width);
      const newY = p.map(y, 0, lineNumber, 0, p.height);
      p.line(newX, 0, newX, p.height);
      p.line(0, newY, p.width, newY);
    }
  }
};

/**
 * Draws a grid and animates the vertical lines to move to the left (to simulate movement)
 * @param p
 * @param lineNumber
 * @param animatedLines
 */
export const createGridBoxesAnimated = (
  p: p5,
  lineNumber: number,
  animatedLines: number[],
  timeDelta: number,
  speed: number = 2000
) => {
  p.strokeWeight(0.5);
  p.stroke(p.color(BASE_COLORS["gray-8"]));

  // Spawn the intial grid lines
  const horizontalLineNum = lineNumber + 10;
  if (animatedLines.length == 0) {
    console.log("Spawning initial lines");
    for (let x = 0; x < horizontalLineNum; x++) {
      const newX = p.map(x, 0, lineNumber, 0, p.width);
      animatedLines.push(newX);
    }
  }

  // Spawn new lines?
  if (animatedLines.length < horizontalLineNum) {
    const prevLine = animatedLines[animatedLines.length - 2];
    const lastLine = animatedLines[animatedLines.length - 1];
    const distance = lastLine - prevLine;

    const numNewLines = horizontalLineNum - animatedLines.length;
    console.log("Spawning lines", numNewLines, prevLine, lastLine, distance);

    let lastNewLine = lastLine;
    for (let x = 0; x <= numNewLines; x++) {
      const baseX = distance + lastNewLine;
      animatedLines.push(baseX);

      lastNewLine = baseX;
    }
  }

  // Animate the lines
  for (let lineIndex = 0; lineIndex < animatedLines.length; lineIndex++) {
    const offset = timeDelta * speed;
    animatedLines[lineIndex] -= offset;

    // Draw the lines
    p.line(animatedLines[lineIndex], 0, animatedLines[lineIndex], p.height);
  }

  // Destroy lines that go past threshold
  const destroyItems = animatedLines
    .map((line, index) => {
      if (line < -10) return index;
      return false;
    })
    .filter((line) => line !== false);
  destroyItems.forEach((lineIndex) => animatedLines.splice(lineIndex, 1));

  // Draw the static vertical lines
  for (let y = 0; y < lineNumber; y++) {
    const newY = p.map(y, 0, lineNumber, 0, p.height);
    p.line(0, newY, p.width, newY);
  }
};
