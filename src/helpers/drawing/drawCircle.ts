import p5 from "p5";

export const drawCircle = (
  p: p5,
  radius: number,
  resolution: number,
  startX: number,
  startY: number
) => {
  p.beginShape(p.POINTS);
  new Array(resolution).fill(0).forEach((_, index) => {
    const angle = (p.TWO_PI / resolution) * index;
    const x = startX + p.cos(angle) * radius;
    const y = startY + p.sin(angle) * radius;
    p.vertex(x, y);
  });
  p.endShape();
};
