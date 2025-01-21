import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";
import displace from "./shaders/displace.vert";
import frag from "./shaders/frag.frag";

type Props = {};

const FILENAME = "TextWarpR1";

const TextWarpR1 = (props: Props) => {
  const Sketch = (p: p5) => {
    let y = 100;
    let textGraphic: p5.Graphics;
    let customShader;
    let customFont;
    let textTexture = p.createImage(
      window.innerWidth - 4,
      window.innerHeight - 4
    );
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
      p.strokeWeight(0);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);

      console.log("setting up shader", displace, frag);
      customShader = p.createShader(displace, frag);
      console.log(" shader", customShader);

      // Create a texture with the emoji on it
      customFont = p.loadFont("../../fonts/InterTight-SemiBold.ttf");
      textGraphic = p.createGraphics(
        window.innerWidth - 4,
        window.innerHeight - 4,
        p.WEBGL
      );
      textGraphic.textFont(customFont);
      textGraphic.textAlign(p.CENTER);
      textGraphic.textSize(133);
      textGraphic.fill(3, 7, 11);
      textGraphic.noStroke();
      textGraphic.text("test", 0, 0);
      textGraphic.save(textTexture);
      console.log("text texture", textTexture);
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black
      customShader.setUniform("time", p.millis());
      customShader.setUniform("uTex", textTexture);
      // p.texture(textTexture);
      p.shader(customShader);
      p.plane(window.innerWidth - 4, window.innerHeight - 4, 2, 2);

      p.orbitControl();
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default TextWarpR1;
