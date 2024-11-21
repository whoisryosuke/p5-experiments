import { useClipStore } from "@/store/clip";
import React from "react";

type Props = {};

const ClipTrackPreview = (props: Props) => {
  const { clip } = useClipStore();
  return <div>ClipTrackPreview</div>;
};

export default ClipTrackPreview;
