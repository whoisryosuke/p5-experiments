import { useAppStore } from "@/store/app";
import React, { useEffect, useRef, useState } from "react";
import { ChordHistory } from "../types";
import Button from "@/components/primitives/Button";
import Text from "@/components/primitives/Text";

type Props = {};

const ChordModes = (props: Props) => {
  const [enabled, setEnabled] = useState(true);
  const [mode, setMode] = useState("octave");
  const { octave, setOctave, chordHistory } = useAppStore();
  const lastTime = useRef(0);

  const handleToggleEnabled = () => {
    if (!enabled) lastTime.current = Date.now();
    setEnabled((prevState) => !prevState);
  };

  const octaveMode = (history: ChordHistory[]) => {
    console.log("octave history", history);
    if (history.length <= 0) return;
    // Ideally this triggers after the user successfully plays a chord
    // And it should cycle through the chords

    // Get the last item in our history to compare time
    const lastItem = history[0];
    if (lastTime.current >= lastItem.time) return;

    let nextOctave = octave + 1;
    if (nextOctave > 8) nextOctave = 1;
    setOctave(nextOctave);
    console.log("shifting octave");

    // Let the component know last time we updated
    lastTime.current = lastItem.time;
  };

  useEffect(() => {
    if (!enabled) return;

    console.log("music mode");
    switch (mode) {
      case "octave":
      default:
        octaveMode(chordHistory);
        break;
    }
  }, [enabled, chordHistory]);

  return (
    <div>
      <Text>
        <strong>Mode:</strong>
        {mode}
      </Text>
      <Button onClick={handleToggleEnabled}>
        {enabled ? "Pause Mode" : "Start Mode"}
      </Button>
    </div>
  );
};

export default ChordModes;
