import Keyboard from "@/features/input/Keyboard";
import MidiKeyboard from "@/features/input/MidiKeyboard";
import Gamepad from "@/features/input/Gamepad";
import React, { PropsWithChildren } from "react";
import MusicSwitcher from "@/features/Music/MusicSwitcher";

type Props = {};

const AppWrapper = ({ children }: PropsWithChildren<Props>) => {
  return (
    <>
      <Keyboard />
      <MidiKeyboard />
      <Gamepad />
      {/* <MusicSwitcher /> */}
      {children}
    </>
  );
};

export default AppWrapper;
