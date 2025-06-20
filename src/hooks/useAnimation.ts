import { useEffect, useRef } from "react";

export default function useAnimation(animation: () => void) {
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame>>(null);

  const animate = () => {
    animation();

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
}
