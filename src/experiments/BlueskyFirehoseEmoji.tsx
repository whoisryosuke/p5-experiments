import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React, { useEffect, useRef } from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "BlueskyFirehoseEmoji";

const BlueskyFirehoseEmoji = (props: Props) => {
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
    let textPool = [];
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black
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
              if (hasEmojis && textPool.length < 2000) {
                textPool.push(
                  text.replace(/[^\p{Extended_Pictographic}]/gu, "")
                );
              }

              // Get image from the post
              const hasImages =
                post.embed?.$type &&
                post.embed.$type == "app.bsky.embed.images";
              const images = hasImages ? post.embed?.images : [];
              // hasImages && console.log("images", images);
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
        p.textSize(p.random(10, 60));
        p.text(
          textPool[0],
          p.random(-500, p.width - 200),
          p.random(-500, p.height - 200)
        );
        textPool.shift();
      }
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default BlueskyFirehoseEmoji;
