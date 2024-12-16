import { useInputStore } from "@/store/input";
import React, { useEffect, useState } from "react";
import { GeneratorConfig, TeoriaNote } from "./types";
import teoria from "teoria";
import { Chord } from "tonal";

type Props = {};

const MusicTeacher = (props: Props) => {
  const [rootNote, setRootNote] = useState("C");
  const [octave, setOctave] = useState(4);
  const [config, setConfig] = useState<GeneratorConfig>({
    type: "chord",
    scale: "mixolydian",
  });
  const { input, appInput, setMultiAppInput } = useInputStore();

  // Hydrate app with initial keys
  useEffect(() => {
    // Create note
    const fixedNote = rootNote.replace("#", "b");
    const note = teoria.note(`${fixedNote}${octave}`);
    let newNotes: TeoriaNote[] = [];
    switch (config.type) {
      case "scale":
        newNotes = note.scale(config.scale).notes();
        break;
      case "chord":
        newNotes = note.chord("sus2").notes();
        break;
    }
    console.log("new notes", newNotes);

    const notes = Chord.get("Cmaj7").notes;
    console.log("tonal chord", notes);

    const newInput = newNotes.reduce((merge, note) => {
      const inputKey = `${note.name().toLocaleUpperCase()}${note.octave()}`;
      return {
        ...merge,
        [inputKey]: true,
      };
    }, {});
    setMultiAppInput(newInput);
  }, []);

  // Check for user input vs the learning keys
  // If user succeeds, generate new keys (maybe increase score / tell user somehow?)

  return <div>MusicTeacher</div>;
};

export default MusicTeacher;
