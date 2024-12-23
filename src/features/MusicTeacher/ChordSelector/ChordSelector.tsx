import Select, { SelectOption } from "@/components/dom/Input/Select";
import Stack from "@/components/primitives/Stack";
import { useAppStore } from "@/store/app";
import { ALL_NOTE_LETTERS, BaseNote } from "@/store/input";
import React, { useMemo } from "react";

type Props = {};

const ChordSelector = (props: Props) => {
  const {
    rootNote,
    setRootNote,
    octave,
    setOctave,
    randomNote,
    setRandomNote,
  } = useAppStore();

  // Root note
  const handleRootNoteChange = (e) => {
    setRootNote(e.currentTarget.value);
  };
  const rootNoteOptions: SelectOption[] = useMemo(
    () =>
      ALL_NOTE_LETTERS.reduce((merge, noteLetter) => {
        const newOption: SelectOption = {
          key: noteLetter,
          value: noteLetter,
          name: noteLetter,
        };

        return [...merge, newOption];
      }, []),
    []
  );

  // Random Note
  const handleRandomNote = (e) => {
    let value = e.currentTarget.value;
    if (typeof value == "string") value = value == "true";
    setRandomNote(value);
  };
  const randomNoteOptions: SelectOption[] = useMemo(
    () =>
      [false, true].reduce((merge, value) => {
        const title = value ? "Use Random Note" : "Use Root Note";
        const newOption: SelectOption = {
          key: title,
          value: value,
          name: title,
        };

        return [...merge, newOption];
      }, []),
    []
  );

  // Octave
  const handleOctave = (e) => {
    setOctave(e.currentTarget.value);
  };
  const octaveOptions: SelectOption[] = useMemo(
    () =>
      new Array(8)
        .fill(0)
        .map((_, index) => index + 1)
        .reduce((merge, value) => {
          const newOption: SelectOption = {
            key: value.toString(),
            value: value,
            name: value.toString(),
          };

          return [...merge, newOption];
        }, []),
    []
  );

  return (
    <Stack>
      <Select
        value={randomNote}
        onChange={handleRandomNote}
        options={randomNoteOptions}
      />
      {!randomNote && (
        <Select
          value={rootNote}
          onChange={handleRootNoteChange}
          options={rootNoteOptions}
        />
      )}
      <Select value={octave} onChange={handleOctave} options={octaveOptions} />
    </Stack>
  );
};

export default ChordSelector;
