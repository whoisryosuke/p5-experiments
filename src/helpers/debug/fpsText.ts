import p5 from "p5";

type FPSTextConfig = {
  padding: number;
  textSize: number;
};
const DEFAULT_FPS_TEXT_CONFIG: FPSTextConfig = {
  padding: 36,
  textSize: 12,
};

export const fpsText = (p: p5, userConfig: Partial<FPSTextConfig>) => {
  const config = {
    ...DEFAULT_FPS_TEXT_CONFIG,
    ...userConfig,
  };
  const padding = config.padding;

  const offset = p.map(config.textSize, 0, 12, 0, 90);

  p.push();
  p.textSize(config.textSize);
  p.text("Frame Rate:", padding, padding);
  p.text(p.frameRate(), padding + offset, padding);
  p.pop();
};
