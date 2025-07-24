// utils/useSectionObserver.ts
import {useEffect, useRef, useState, useCallback} from "react";

interface IntersectionObserverOptions extends IntersectionObserverInit {
  threshold?: number | number[];
  rootMargin?: string;
}

export function useSectionObserver(
  sectionIds: string[],
  options: IntersectionObserverOptions = {}
) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  // Memoize the callback to prevent unnecessary observer recreations
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      // Create a map of currently intersecting sections with their intersection ratios
      const intersectingSections = new Map<string, number>();

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingSections.set(entry.target.id, entry.intersectionRatio);
        }
      });

      // If no sections are intersecting, determine what should be active
      if (intersectingSections.size === 0) {
        // Check if we're at the very top of the page
        if (window.scrollY < 100) {
          setActiveId(null); // This will allow "Home" to be active in your navbar
          return;
        }

        // Find the section that's closest to the top of the viewport
        let closestSection: string | null = null;
        let minDistance = Infinity;

        sectionsRef.current.forEach((section, id) => {
          const rect = section.getBoundingClientRect();

          // Consider sections that are just above the viewport or partially visible
          if (rect.bottom > 0) {
            const distance = Math.abs(rect.top);
            if (distance < minDistance) {
              minDistance = distance;
              closestSection = id;
            }
          }
        });

        if (closestSection) {
          setActiveId(closestSection);
        }
        return;
      }

      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let mostVisibleSection: string | null = null;

      intersectingSections.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          mostVisibleSection = id;
        }
      });

      if (mostVisibleSection) {
        setActiveId(mostVisibleSection);
      }
    },
    []
  );

  useEffect(() => {
    // Clear previous sections map
    sectionsRef.current.clear();

    // Find all sections and populate the map
    const sections: HTMLElement[] = [];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        sections.push(element);
        sectionsRef.current.set(id, element);
      }
    });

    // If no sections found, set activeId to null and return
    if (sections.length === 0) {
      setActiveId(null);
      return;
    }

    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      // Adjust rootMargin to account for sticky navbar
      // Use negative top margin to exclude navbar height from intersection calculations
      rootMargin: options.rootMargin || "-80px 0px -20% 0px",
      threshold: options.threshold || [0, 0.1, 0.3, 0.5, 0.7, 1.0],
      ...options,
    });

    // Start observing all sections
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    // Initial check for the active section
    const initialCheck = () => {
      if (window.scrollY < 100) {
        setActiveId(null);
      } else {
        // Find which section should be initially active
        let initialActiveId: string | null = null;
        let maxVisibleArea = 0;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // Calculate visible area of the section
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibleArea = visibleHeight * rect.width;

          if (
            visibleArea > maxVisibleArea &&
            rect.bottom > 0 &&
            rect.top < viewportHeight
          ) {
            maxVisibleArea = visibleArea;
            initialActiveId = section.id;
          }
        });

        if (initialActiveId) {
          setActiveId(initialActiveId);
        }
      }
    };

    // Run initial check
    initialCheck();

    // Add scroll listener for edge cases
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveId(null);
      }
    };

    window.addEventListener("scroll", handleScroll, {passive: true});

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener("scroll", handleScroll);
      sectionsRef.current.clear();
    };
  }, [sectionIds, handleIntersection, options.threshold, options.rootMargin]);

  return activeId;
}
