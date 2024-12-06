import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React, { useEffect, useRef } from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "BlueskyFirehose3DEmoji";

const BlueskyFirehose3DEmoji = (props: Props) => {
  const firehoseSocket = useRef<WebSocket | null>(null);
  const loaded = useRef(false);

  useEffect(() => {
    firehoseSocket.current = new WebSocket(
      "wss://jetstream2.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post"
    );

    return () => {
      firehoseSocket.current.close();
    };
  }, []);

  const Sketch = (p: p5) => {
    let y = 100;
    let textPool: p5.Graphics[] = [];
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black
      p.camera(
        7,
        -7,
        5,
        // p.height / 2 / p.tan(p.PI / 6),
        500,
        500,
        1200,
        0,
        1,
        0
      );
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      // Track web socket messages
      if (!loaded.current) {
        if (firehoseSocket.current)
          firehoseSocket.current.onmessage = (event) => {
            // console.log("event", event.data);
            try {
              const data = JSON.parse(event.data);

              const post = data.commit.record;
              // Get text from the post (might be undefined)
              const text = post.text;
              const hasEmojis = /\p{Extended_Pictographic}/u.test(text);

              // Limit the pool to a certain number of posts
              if (hasEmojis && textPool.length < 3) {
                const onlyEmojiText = text.replace(
                  /[^\p{Extended_Pictographic}]/gu,
                  ""
                );
                // Create a texture with the emoji on it
                let textTexture = p.createGraphics(
                  window.innerWidth - 4,
                  window.innerHeight - 4
                );
                textTexture.textFont("Arial");
                textTexture.textAlign(p.CENTER);
                textTexture.textSize(133);
                textTexture.fill(3, 7, 11);
                textTexture.noStroke();
                textTexture.text(onlyEmojiText, p.width * 0.5, p.height * 0.5);

                // Add texture to pool
                textPool.push(textTexture);
              }
            } catch (error) {
              console.log("Couldnt parse data", error);
            }
          };
        loaded.current = true;
      }

      // console.log('drawing!!')

      p.strokeWeight(3);
      p.stroke(p.color(BASE_COLORS["gray-5"]));

      if (textPool.length > 0) {
        p.push();
        p.rotateX(p.HALF_PI);
        // p.textSize(p.random(10, 60));
        // p.text(
        //   textPool[0],
        //   p.random(-10, 10),
        //   p.random(-10, 10),
        //   p.random(-10, 10)
        // );
        p.translate(0, 0, 0);
        p.texture(textPool[0]);
        p.plane(window.innerWidth - 4, window.innerHeight - 4);
        p.pop();
        textPool.shift();
      }
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default BlueskyFirehose3DEmoji;
