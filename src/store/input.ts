import { create } from "zustand";

export type WhiteNotes = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type BlackNotes = "Cb" | "Db" | "Fb" | "Gb" | "Ab";
export type BaseNote = WhiteNotes | BlackNotes;
export type Octaves = "1" | "2" | "3" | "4" | "5" | "6" | "7";
export type Note = `${BaseNote}${Octaves}`;

export type UserInputMap = Record<Note, boolean>;
// Object.entries() version that's commonly used to iterate over it easily
export type UserInputMapEntries = [Note, boolean][];

const DEFAULT_USER_MAP: UserInputMap = {
  C1: false,
  C2: false,
  C3: false,
  C4: false,
  C5: false,
  C6: false,
  C7: false,
  D1: false,
  D2: false,
  D3: false,
  D4: false,
  D5: false,
  D6: false,
  D7: false,
  E1: false,
  E2: false,
  E3: false,
  E4: false,
  E5: false,
  E6: false,
  E7: false,
  F1: false,
  F2: false,
  F3: false,
  F4: false,
  F5: false,
  F6: false,
  F7: false,
  G1: false,
  G2: false,
  G3: false,
  G4: false,
  G5: false,
  G6: false,
  G7: false,
  A1: false,
  A2: false,
  A3: false,
  A4: false,
  A5: false,
  A6: false,
  A7: false,
  B1: false,
  B2: false,
  B3: false,
  B4: false,
  B5: false,
  B6: false,
  B7: false,
  Cb1: false,
  Cb2: false,
  Cb3: false,
  Cb4: false,
  Cb5: false,
  Cb6: false,
  Cb7: false,
  Db1: false,
  Db2: false,
  Db3: false,
  Db4: false,
  Db5: false,
  Db6: false,
  Db7: false,
  Fb1: false,
  Fb2: false,
  Fb3: false,
  Fb4: false,
  Fb5: false,
  Fb6: false,
  Fb7: false,
  Gb1: false,
  Gb2: false,
  Gb3: false,
  Gb4: false,
  Gb5: false,
  Gb6: false,
  Gb7: false,
  Ab1: false,
  Ab2: false,
  Ab3: false,
  Ab4: false,
  Ab5: false,
  Ab6: false,
  Ab7: false,
};

export type UserInputKeys = keyof UserInputMap;

interface InputState {
  input: UserInputMap;
  setInput: (key: UserInputKeys, input: boolean) => void;
  setMultiInput: (keys: Partial<UserInputMap>) => void;

  axes: number[];
  setAxes: (axes: number[]) => void;

  currentDevice: string;
  setCurrentDevice: (currentDevice: string) => void;
  deviceName: string;
  setDeviceName: (deviceName: string) => void;

  appInput: UserInputMap;
  setAppInput: (key: UserInputKeys, input: boolean) => void;
  setMultiAppInput: (keys: Partial<UserInputMap>) => void;
}

export const useInputStore = create<InputState>()((set) => ({
  input: DEFAULT_USER_MAP,
  setInput: (key, input) =>
    set((state) => ({ input: { ...state.input, [key]: input } })),
  setMultiInput: (keys) =>
    set((state) => ({ input: { ...state.input, ...keys } })),
  axes: [0, 0, 0, 0],
  setAxes: (axes) => set((state) => ({ axes: axes })),

  currentDevice: "KEYBOARD",
  setCurrentDevice: (currentDevice) => set(() => ({ currentDevice })),
  deviceName: "Keyboard",
  setDeviceName: (deviceName) => set(() => ({ deviceName })),

  // Game settings
  appInput: DEFAULT_USER_MAP,
  setAppInput: (key, input) =>
    set((state) => ({ appInput: { ...state.appInput, [key]: input } })),
  setMultiAppInput: (keys) =>
    set((state) => ({ appInput: { ...state.appInput, ...keys } })),
}));
