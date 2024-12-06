import P5Sketch from "@/components/P5Sketch";
import useBlueskyFirehose from "@/helpers/apis/useBlueskyFirehose";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React, { useRef } from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const COLORS = [
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "lime",
  "orange",
  "yellow",
];

const FILENAME = "BlueskyFirehoseGraffiti";

const BlueskyFirehoseGraffiti = (props: Props) => {
  const { socket } = useBlueskyFirehose();
  const loaded = useRef(false);
  let fonts = [];
  const Sketch = (p: p5) => {
    let y = 100;
    let textPool = [];
    let bgImg;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);
      // p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      // Load the grafitti fonts
      // Note: the second one doesn't load fast enough, gotta find a way push after
      fonts.push(p.loadFont("../fonts/GraffitiCity.otf"));
      fonts.push(p.loadFont("../fonts/DonGraffiti.otf"));

      // Load image and then render it once it's ready here.
      // We want the background to render only once, so the text can stack on top
      // and not get "erased" by rendering the background each frame
      bgImg = p.loadImage(
        "../assets/brick-wall-pexels-shonejai-1080p.jpg",
        (img) => p.image(img, 0, 0, p.width, p.height)
      );
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      // Track web socket messages
      if (!loaded.current) {
        if (socket.current)
          socket.current.onmessage = (event) => {
            // console.log("event", event.data);
            try {
              const data = JSON.parse(event.data);

              const post = data.commit.record;
              // Get text from the post (might be undefined)
              const text = post.text;
              const noEmojiText = text.replace(
                /\p{Extended_Pictographic}/u,
                ""
              );
              const noAsciiText = noEmojiText.replace(/[^\x20-\x7E]/g, "");

              // Limit the pool to a certain number of posts
              if (textPool.length < 2000) {
                textPool.push(noAsciiText);
              }
            } catch (error) {
              console.log("Couldnt parse data", error);
            }
          };
        loaded.current = true;
      }

      // console.log('drawing!!')

      p.strokeWeight(0);

      // A nice "overlap" effect
      // p.strokeWeight(3);
      // p.stroke(p.color(BASE_COLORS["gray-5"]));
      // p.blendMode(p.MULTIPLY);

      // "Spawn" a single line of text
      if (textPool.length > 0) {
        p.rotate(p.random(-p.QUARTER_PI / 2, p.QUARTER_PI / 2));
        p.textSize(p.random(30, 100));
        p.textFont(fonts[0]);
        const colorIndex = Math.round(p.random(0, COLORS.length - 1));
        const textColorName = COLORS[colorIndex];
        const textColor = p.color(BASE_COLORS[`${textColorName}-4`]);
        p.fill(textColor);
        p.text(textPool[0], p.random(-500, p.width), p.random(-500, p.height));

        // For the overlay effect, it's helpful to stack text to make it more legible
        // p.text(textPool[0], p.random(-500, p.width), p.random(-500, p.height));

        // Remove the current text string from the pool
        textPool.shift();
      }
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default BlueskyFirehoseGraffiti;
