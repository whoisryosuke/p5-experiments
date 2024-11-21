import { Clip, ClipNote, Sample } from "@/components/screens/ClipScreen/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

// Basically the key/number is the Sample # (1-16)
type SamplePressedState = Record<number, boolean>;

interface ClipStoreState {
  // Clip State
  clip: Clip;
  setClip: (clip: Clip) => void;
  setTracks: (tracks: Sample[]) => void;
  addNote: (note: ClipNote) => void;

  // Samples
  samplePressed: SamplePressedState;
  setPressed: (index: number, pressed: boolean) => void;
}

export const useClipStore = create<ClipStoreState>()(
  devtools((set) => ({
    clip: {
      time: {
        current: 0,
        total: 0,
      },
      samples: [],
      notes: [],
    },
    setClip: (clip) => set(() => ({ clip })),
    setTracks: (tracks) =>
      set((state) => ({
        clip: {
          ...state.clip,
          tracks,
        },
      })),
    addNote: (note) =>
      set((state) => {
        return {
          clip: {
            ...state.clip,
            notes: [...state.clip.notes, note],
          },
        };
      }),

    samplePressed: {
      1: false,
    },
    setPressed: (index, pressed) =>
      set((state) => ({
        samplePressed: {
          ...state.samplePressed,
          [index]: pressed,
        },
      })),
  }))
);
