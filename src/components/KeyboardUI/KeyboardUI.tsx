import React from "react";
import KeyboardKeyWhite from "./KeyboardKeyWhite";
import { generateKeysByOctave } from "../../helpers/music-keyboard";
import KeyboardKeyBlackSet from "./KeyboardKeyBlackSet";

type Props = {};

const KeyboardUI = (props: Props) => {
  const keys = generateKeysByOctave();
  const octaves = Object.keys(keys);
  console.log("baseNotes", octaves);
  return (
    <div
      style={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 420,
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        {octaves.map((octave) => {
          return (
            <div key={octave} style={{ position: "relative", width: "100%" }}>
              <KeyboardKeyBlackSet octave={Number(octave)} />
              <div style={{ display: "flex" }}>
                {keys[octave].map((note) => (
                  <KeyboardKeyWhite key={note} label={note} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeyboardUI;
