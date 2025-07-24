"use client";
import React, {useEffect, useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({children, delay = 0, className}) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (elementRef.current) {
      gsap.fromTo(
        elementRef.current,
        {autoAlpha: 0, y: 50},
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default FadeIn;
