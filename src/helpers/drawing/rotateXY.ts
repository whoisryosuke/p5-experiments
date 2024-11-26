import p5 from "p5";

export const rotateXY = (
  p: p5,
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  angle: number
) => {
  const rotatedX =
    (x - centerX) * p.cos(angle) - (y - centerY) * p.sin(angle) + centerX;
  const rotatedY =
    (x - centerX) * p.sin(angle) + (y - centerY) * p.cos(angle) + centerY;

  return {
    x: rotatedX,
    y: rotatedY,
  };
};
