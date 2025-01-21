import React from "react";
import KeyboardKeyWhiteUser from "./KeyboardKeyWhiteUser";
import KeyboardKeyWhiteApp from "./KeyboardKeyWhiteApp";
import { generateKeysByOctave } from "../../helpers/music-keyboard";
import { KeyboardKeyTypes } from "./KeyboardKeyStyled";
import styled from "styled-components";

type Props = {
  type: KeyboardKeyTypes;
};

const TAG_HEIGHT = `2rem`;
const TAG_NAMES: Record<KeyboardKeyTypes, string> = {
  user: "You",
  app: "Reference",
};

const TAG_POSITIONS: Record<KeyboardKeyTypes, string> = {
  user: `
    top:-${TAG_HEIGHT};
  `,
  app: `
    bottom:-${TAG_HEIGHT};
  `,
};

const KeyboardTag = styled.div<Props>`
  display: flex;
  align-items: center;
  min-height: calc(${TAG_HEIGHT} - 0.5rem);
  position: absolute;
  right: 0;
  ${(props) => TAG_POSITIONS[props.type]}
  z-index: 420;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;

  background: ${({ theme, type }) =>
    theme.colors[`${type == "app" ? "green" : "blue"}-8`]};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 0.4rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const KeyboardUI = ({ type, ...props }: Props) => {
  const keys = generateKeysByOctave();
  const octaves = Object.keys(keys);
  console.log("baseNotes", octaves);
  const KeyComponent =
    type == "user" ? KeyboardKeyWhiteUser : KeyboardKeyWhiteApp;

  const position =
    type == "app"
      ? {
          top: 0,
          left: 0,
        }
      : {
          bottom: 0,
          left: 0,
        };
  return (
    <div
      style={{
        width: "100%",
        position: "fixed",
        ...position,
        zIndex: 420,
        borderRadius: 8,
      }}
      {...props}
    >
      <KeyboardTag type={type}>{TAG_NAMES[type]}</KeyboardTag>
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
