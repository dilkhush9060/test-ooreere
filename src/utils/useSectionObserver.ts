// utils/useSectionObserver.ts
import {useEffect, useRef, useState} from "react";

interface IntersectionObserverOptions extends IntersectionObserverInit {
  threshold?: number | number[];
}

export function useSectionObserver(
  sectionIds: string[],
  options: IntersectionObserverOptions = {}
) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) {
      // If no sections are found, ensure activeId is null or 'home' depending on your default
      setActiveId(null);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        let newActiveId: string | null = null;
        let maxIntersectionRatio = 0;
        let foundIntersecting = false;

        entries.forEach((entry) => {
          // If the entry is intersecting and has a significant intersection ratio
          // This prevents fleeting highlights when just grazing a section
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > maxIntersectionRatio
          ) {
            maxIntersectionRatio = entry.intersectionRatio;
            newActiveId = entry.target.id;
            foundIntersecting = true;
          }
        });

        // If no section is significantly intersecting (e.g., between sections or at top)
        // We need to decide what to highlight.
        if (!foundIntersecting) {
          // Check scroll position to determine if we are at the very top of the page
          // A small tolerance (e.g., 50px) can be used for "at the top"
          if (window.scrollY < 50) {
            // If scrolled almost to the very top
            newActiveId = null; // Signal that no section is active, letting "Home" be default
          } else {
            // Fallback: If not at the very top, and no specific section is highly active,
            // find the one closest to the top of the viewport. This handles transitions.
            let minDistance = Infinity;
            sections.forEach((section) => {
              const rect = section.getBoundingClientRect();
              // Consider sections that are partially in view or just above the viewport
              if (rect.bottom > 0) {
                // Section is not completely above the viewport
                const distance = Math.abs(rect.top); // Distance from top of viewport
                if (distance < minDistance) {
                  minDistance = distance;
                  newActiveId = section.id;
                }
              }
            });
          }
        }

        // Only update state if the active ID has actually changed to prevent unnecessary re-renders
        if (newActiveId !== activeId) {
          setActiveId(newActiveId);
        }
      },
      {
        root: null, // relative to the viewport
        // Adjust rootMargin: A negative top margin effectively shrinks the viewport from the top.
        // If your sticky navbar is, for example, 64px tall, setting -64px here
        // means sections won't be considered fully "visible" until they clear the navbar.
        // Experiment with this value based on your navbar's actual height.
        rootMargin: "0px 0px 0px 0px", // Start with '0px', then adjust if navbar covers content
        threshold: options.threshold || 0.3, // Trigger when 30% of the section is visible
        ...options,
      }
    );

    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [JSON.stringify(sectionIds), options.threshold, activeId]); // Add activeId to dependencies to prevent stale closure if used in callback

  return activeId;
}
