import p5 from "p5";
import { rotateXY } from "./rotateXY";

export const drawCircle = (
  p: p5,
  radius: number,
  resolution: number,
  startX: number,
  startY: number,
  rotateAngle: number = 0
) => {
  p.beginShape(p.POINTS);
  new Array(resolution).fill(0).forEach((_, index) => {
    const angle = (p.TWO_PI / resolution) * index;
    const baseX = startX + p.cos(angle) * radius;
    const baseY = startY + p.sin(angle) * radius;

    const { x, y } = rotateXY(p, baseX, baseY, startX, startY, rotateAngle);

    p.vertex(x, y);
  });
  p.endShape();
};
