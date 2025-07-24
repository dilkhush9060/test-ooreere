/* eslint-disable @typescript-eslint/no-explicit-any */
// components/SectionTracker.tsx
import {useInView} from "framer-motion";
import {useEffect, useRef} from "react";

interface SectionTrackerProps {
  id: string;
  onInView: (id: string) => void;
  children: React.ReactNode;
  rootMargin?: string;
}

export default function SectionTracker({
  id,
  onInView,
  children,
  rootMargin = "-30% 0px -60% 0px",
}: SectionTrackerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {margin: rootMargin as any});

  useEffect(() => {
    if (isInView) onInView(id);
  }, [isInView, id, onInView]);

  return (
    <section id={id} ref={ref}>
      {children}
    </section>
  );
}
