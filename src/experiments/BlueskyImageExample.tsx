import P5Sketch from "@/components/P5Sketch";
import useBlueskyFirehose from "@/helpers/apis/useBlueskyFirehose";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React, { useEffect, useRef } from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "BlueskyFirehoseExample";

const BlueskyImageExample = (props: Props) => {
  const loaded = useRef(false);
  const { socket } = useBlueskyFirehose();

  const Sketch = (p: p5) => {
    let y = 100;
    let imagePool = [];
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
        if (socket.current)
          socket.current.onmessage = (event) => {
            // console.log("event", event.data);
            try {
              const data = JSON.parse(event.data);

              const did = data.did;
              const profileLinkUrl = `https://bsky.app/profile/${did}`;
              const post = data.commit.record;
              // Get text from the post (might be undefined)
              const text = post.text;
              // console.log("text", text);

              // Get image from the post
              const hasImages =
                post.embed?.$type &&
                post.embed.$type == "app.bsky.embed.images";
              const images = hasImages ? post.embed.images : [];
              // hasImages && console.log("images", images);

              if (images.length < 0) return;
              images.map((image) => {
                const link = image.image.ref["$link"];
                const mimeType = image.image.mimeType.split("/")[1];
                // The main issue here is that the CDN serves these images on HTTPS and doesn't allow for localhost
                // So you'll need to run this on a server to be able to fetch the images
                const imageUrl = `https://cdn.bsky.app/img/feed_thumbnail/plain/${did}/${link}@${mimeType}`;
                console.log("imageUrl", imageUrl);
                // Limit the pool to a certain number of posts
                if (imagePool.length < 10) {
                  p.loadImage(imageUrl, (loadedImg) =>
                    imagePool.push(loadedImg)
                  );
                }
              });
            } catch (error) {
              console.log("Couldnt parse data", error);
            }
          };
        loaded.current = true;
      }

      // console.log('drawing!!')

      p.strokeWeight(3);
      p.stroke(p.color(BASE_COLORS["gray-5"]));

      if (imagePool.length > 0) {
        console.log("displaying img", imagePool[0]);
        const x = p.random(-500, p.width - 200);
        const y = p.random(-500, p.height - 200);
        p.image(imagePool[0], x, y);
        imagePool.shift();
      }
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default BlueskyImageExample;
