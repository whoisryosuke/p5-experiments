import React, { CSSProperties, Suspense, useEffect, useRef } from "react";
import p5 from "p5";
import { BASE_COLORS } from "themes/colors/base";
import { radToDeg } from "three/src/math/MathUtils";
import { saveArt } from "@/helpers/drawing/saveArt";

type Props = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  sketch: (p: p5) => void;
};

const P5Sketch = ({ width, height, sketch, ...props }: Props) => {
  const p5ref = useRef<p5 | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window == "undefined") return;
    if (divRef.current) p5ref.current = new p5(sketch, divRef.current);

    return () => {
      if (p5ref.current) p5ref.current.remove();
    };
  }, [sketch]);

  return <div ref={divRef}></div>;
};

export default P5Sketch;
