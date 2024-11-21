import mapRange from "@/helpers/mapRange";
import { useAppStore } from "@/store/app";
import { useInputStore } from "@/store/input";
import React, { useEffect, useRef } from "react";
import { getDestination, Oscillator, Waveform } from "tone";

type OscillatorDirections = "left" | "right";

type Props = {
  direction: OscillatorDirections;
};

const OscillatorMusic = ({ direction = "left" }: Props) => {
  const oscillatorComponent = useRef<Oscillator>(null);
  const waveform = useRef<Waveform | null>(null);
  const { axes } = useInputStore();
  const { setWaveformOscLeft, setWaveformOscRight } = useAppStore();

  // Create the oscillator
  useEffect(() => {
    if (oscillatorComponent.current == null) {
      waveform.current = new Waveform();
      console.log("Creating Oscillator");
      oscillatorComponent.current = new Oscillator()
        .chain(waveform.current, getDestination())
        .toDestination()
        .start();
      if (direction == "left") {
        setWaveformOscLeft(waveform);
      } else {
        setWaveformOscRight(waveform);
      }
    }
    return () => {
      if (oscillatorComponent.current) oscillatorComponent.current.dispose();
      if (waveform.current) waveform.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (!oscillatorComponent.current) return;
    if (direction == "left") {
      const newFrequency = mapRange(axes[0], -1, 1, 0, 400);
      oscillatorComponent.current.frequency.value = newFrequency;
    } else {
      const newFrequency = mapRange(axes[2], -1, 1, 0, 400);
      oscillatorComponent.current.frequency.value = newFrequency;
    }
  }, [axes, direction]);

  return <></>;
};

export default OscillatorMusic;
