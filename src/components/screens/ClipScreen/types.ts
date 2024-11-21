export type ClipNote = {
  /**
   * Track index (see Clip["tracks"])
   */
  track: number;
  time: number;
  duration: number;
};
export type Clip = {
  time: {
    current: number;
    total: number;
  };
  samples: Sample[];
  notes: ClipNote[];
};

export type Sample = {
  file: string;
  name: string;
};
