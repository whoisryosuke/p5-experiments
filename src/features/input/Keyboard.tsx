import React, { useEffect, useState } from "react";
import { Note, useInputStore } from "@/store/input";

const KEY_MAP: Record<KeyboardEvent["key"], Note> = {
  // 4th octave - bottom row of keyboard
  z: "C4",
  x: "D4",
  c: "E4",
  v: "F4",
  b: "G4",
  n: "A4",
  m: "B4",
  s: "Cb4",
  d: "Db4",
  g: "Fb4",
  h: "Gb4",
  j: "Ab4",

  // 5th octave - top row of keyboard
  q: "C5",
  w: "D5",
  e: "E5",
  r: "F5",
  t: "G5",
  y: "A5",
  u: "B5",
  2: "Cb5",
  3: "Db5",
  5: "Fb5",
  6: "Gb5",
  7: "Ab5",
};

type Props = {};

const Keyboard = (props: Props) => {
  const { input, setInput } = useInputStore();
  const keys = Object.keys(KEY_MAP);

  // If pressed key is our target key then set to true
  function downHandler({ key }: KeyboardEvent): void {
    if (keys.includes(key)) {
      const noteKey = KEY_MAP[key];
      if (!input[noteKey]) setInput(noteKey, true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }: KeyboardEvent): void => {
    if (keys.includes(key)) {
      const noteKey = KEY_MAP[key];
      setInput(noteKey, false);
    }
  };

  // Add event listeners for keypress
  useEffect(() => {
    if (typeof window == "undefined") return;

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return <></>;
};

export default Keyboard;
