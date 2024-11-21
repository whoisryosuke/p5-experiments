import React, { useEffect } from "react";
import { Sample } from "../types";
import { Sampler } from "tone";

type Props = {
  samples: Sample[];
};

const SamplePlayer = ({samples}: Props) => {
  // Load all samples
  // Keep track of sample presses in store

  useEffect(() => {
    samples.forEach(sample => {

    })
    // ToneJS load samples and store as refs 
    const sampleComponent = new Sampler({
      urls: {
        C1: "C1.mp3",
        C2: "C2.mp3",
        C3: "C3.mp3",
        C4: "C4.mp3",
        C5: "C5.mp3",
        C6: "C6.mp3",
        C7: "C7.mp3",
      },
      baseUrl: "http://localhost:3000/samples/piano-acoustic/",
    }).toDestination();
  
    return () => {
      // Cleanup samples on unmount
      second
    }
  }, [third])
  

  return <div>SamplePlayer</div>;
};

export default SamplePlayer;
