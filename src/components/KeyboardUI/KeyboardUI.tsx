import React from "react";
import KeyboardKeyWhiteUser from "./KeyboardKeyWhiteUser";
import KeyboardKeyWhiteApp from "./KeyboardKeyWhiteApp";
import { generateKeysByOctave } from "../../helpers/music-keyboard";
import KeyboardKeyBlackSet from "./KeyboardKeyBlackSet";
import { KeyboardKeyTypes } from "./KeyboardKeyStyled";

type Props = {
  type: KeyboardKeyTypes;
};

const KeyboardUI = ({ type, ...props }: Props) => {
  const keys = generateKeysByOctave();
  const octaves = Object.keys(keys);
  console.log("baseNotes", octaves);
  const KeyComponent =
    type == "user" ? KeyboardKeyWhiteUser : KeyboardKeyWhiteApp;
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
      {...props}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          borderLeftWidth: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderRightWidth: "2px",
          borderStyle: "solid",
          borderColor: "rgba(200, 200, 200, 0.5)",
        }}
      >
        {octaves.map((octave) => {
          return (
            <div key={octave} style={{ position: "relative", flex: 1 }}>
              <div style={{ display: "flex" }}>
                {keys[octave].map((note) => (
                  <KeyComponent
                    key={note}
                    label={note}
                    octave={parseInt(octave) + 1}
                    type={type}
                  />
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
