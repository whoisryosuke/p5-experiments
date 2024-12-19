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
