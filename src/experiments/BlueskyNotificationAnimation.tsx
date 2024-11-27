import P5Sketch from "@/components/P5Sketch";
import useBlueskyFirehose from "@/helpers/apis/useBlueskyFirehose";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React, { useEffect, useRef } from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

type Notification = {
  time: string;
  msg: string;
  active: boolean;
  destroy: boolean;
  created: number;
  initialPosition: {
    x: number;
    y: number;
  };
};

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  canvas.remove();
  return metrics.width;
}

const FILENAME = "BlueskyNotificationAnimation";
const NOTIFICATION_DURATION = 300;
const NOTIFICATION_LINGER_DURATION = 10;

const BlueskyNotificationAnimation = (props: Props) => {
  const loaded = useRef(false);
  const { socket } = useBlueskyFirehose();

  const Sketch = (p: p5) => {
    let currentTime = 0;
    let notifications: Notification[] = [];
    // Last time we spawned a notifiacation (uses deltaTime aka ms)
    let lastSpawn = 0;
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
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      // Track web socket messages
      if (!loaded.current) {
        if (socket.current)
          socket.current.onmessage = (event) => {
            // console.log("event", event.data);
            try {
              const data = JSON.parse(event.data);

              const post = data.commit?.record;
              // Get text from the post (might be undefined)
              const time = post.createdAt;
              const msg = post.text;

              if (!msg) return;
              if (msg.includes("\n")) return;

              // Limit the pool to a certain number of posts
              notifications.push({
                time,
                msg,
                active: false,
                destroy: false,
                created: 0,
                initialPosition: {
                  x: 0,
                  y: 0,
                },
              });

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

      // Handle spawning new notifications
      // Has enough time passed?
      currentTime += p.deltaTime;
      const timeDiff = currentTime - lastSpawn;
      if (timeDiff >= NOTIFICATION_DURATION) {
        // Spawn a notification
        const nextNotificationIndex = notifications.findIndex(
          (notification) => !notification.active
        );
        if (nextNotificationIndex >= 0) {
          const notification = notifications[nextNotificationIndex];
          notification.active = true;
          notification.created = currentTime;
          notification.initialPosition = {
            x: p.random(-500, p.width - 200),
            y: p.random(-500, p.height + 50),
          };
          lastSpawn = currentTime;
        }
      }

      // Check to delete notifications
      notifications.forEach((notification, index) => {
        if (
          notification.active &&
          (currentTime - notification.created) /
            (NOTIFICATION_DURATION * NOTIFICATION_LINGER_DURATION) >=
            1
        ) {
          console.log("fade out", notification);
          notifications[index].destroy = true;
        }
      });

      // Show and animate all notifications
      notifications
        .filter((notification) => notification.active)
        .forEach((notification) => {
          const notificationDate = new Date(notification.time);
          const niceTime = `${notificationDate.getHours()}:${notificationDate.getMinutes()}:${notificationDate.getSeconds()}`;

          // const textLength = notification.msg.length;
          // const containerWidth = textLength * 15;
          const textLength = getTextWidth(
            notification.msg,
            "normal 26px Inter"
          );
          const containerWidth = textLength;
          const containerHeight = 60;
          const containerPadding = 12;
          const containerBorderRadius = 8;

          const x = notification.initialPosition.x;
          const startY = notification.initialPosition.y;
          const fadeUpAmount =
            (currentTime - notification.created) / NOTIFICATION_DURATION;
          const fadeDownAmount =
            (currentTime - notification.created) /
            (NOTIFICATION_DURATION * NOTIFICATION_LINGER_DURATION);
          const animate = Math.max(
            Math.min(
              notification.destroy
                ? 1 - Math.abs(1 - fadeDownAmount)
                : fadeUpAmount,
              1
            ),
            -1
          );
          const y = p.lerp(startY + 30, startY, animate);

          p.push();
          p.strokeWeight(0);

          // Container box
          const fillColor = p.color(BASE_COLORS["gray-8"]);
          fillColor.setAlpha(animate * 255);
          p.fill(fillColor);
          p.rect(
            x,
            y,
            containerWidth,
            containerHeight,
            containerBorderRadius,
            containerBorderRadius,
            containerBorderRadius,
            containerBorderRadius
          );
          // Message text
          const textColor = p.color(p.color(BASE_COLORS["gray-2"]));
          textColor.setAlpha(animate * 255);
          p.fill(textColor);
          p.textSize(20);
          p.textFont("Inter");
          p.text(
            notification.msg,
            x + containerPadding,
            y + containerPadding + containerHeight / 2
          );
          const subtitleColor = p.color(p.color(BASE_COLORS["gray-4"]));
          subtitleColor.setAlpha(animate * 255);
          p.fill(subtitleColor);
          p.textSize(10);
          p.text(niceTime, x + containerPadding, y + containerPadding + 10);
          p.pop();
        });

      p.strokeWeight(3);
      p.stroke(p.color(BASE_COLORS["gray-5"]));

      // Actually delete notifications
      // notifications = notifications.filter(
      //   (notification) =>
      //     notification.destroy &&
      //     (currentTime - notification.created) /
      //       (NOTIFICATION_DURATION * (NOTIFICATION_LINGER_DURATION + 1)) >=
      //       1
      // );
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default BlueskyNotificationAnimation;
