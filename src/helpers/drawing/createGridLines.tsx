import p5 from "p5";
import { BASE_COLORS } from "themes/colors/base";

const createGridLines = (p: p5, lineNumber: number) => {
  p.strokeWeight(0.5);
  p.stroke(p.color(BASE_COLORS["gray-8"]));
  for (let i = 0; i < lineNumber; i++) {
    const x = p.map(i, 0, lineNumber, 0, p.width);
    p.line(x, 0, x, p.height);
  }
};

export default createGridLines;
