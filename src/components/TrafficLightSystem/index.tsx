import {useState, useRef, useEffect} from "react";
import {cn} from "../../utils/cn";
import TrafficLight from "./TrafficLight";
import {GetHomeVideo} from "@/hooks/querry/HomeVideoQuery";

type LightState = "red" | "green" | "yellow";

export default function TrafficLightSystem({
  lightClassName,
  poleHeight,
}: {
  lightClassName?: string;
  poleHeight?: string;
}) {
  const [activeLight, setActiveLight] = useState<LightState>("red");
  const [videoSrc, setVideoSrc] = useState<string>("/demoVideo.mp4");
  const videoRef = useRef<HTMLVideoElement>(null);
  const {data} = GetHomeVideo();

  // Effect to set video source based on data or fallback
  useEffect(() => {
    if (data?.url) {
      setVideoSrc(data.url);
    } else {
      setVideoSrc("/demoVideo.mp4");
    }
  }, [data?.url]);

  // --- Core Logic Refinement ---

  // This effect now handles both playing the video and listening for its end.
  // It only runs when the activeLight is 'red' and the videoRef is available.
  useEffect(() => {
    const video = videoRef.current;

    if (activeLight === "red" && video) {
      console.log("Light is RED, configuring and playing video."); // Debugging

      const handleVideoEnd = () => {
        console.log("Video ended. Transitioning to GREEN."); // Debugging
        setActiveLight("green");
      };

      const handleVideoError = () => {
        console.error("Video error detected. Attempting fallback."); // Debugging
        // If cloud video fails, fallback to local video.
        // This will cause the outer videoSrc effect to re-run and re-render.
        if (videoSrc !== "/demoVideo.mp4") {
          setVideoSrc("/demoVideo.mp4");
        }
      };

      // Add listeners
      video.addEventListener("ended", handleVideoEnd);
      video.addEventListener("error", handleVideoError);

      // Play video from the start
      video.currentTime = 0;
      video.play().catch((e) => {
        console.error("Error playing video:", e);
        // Handle play errors (e.g., if auto-play is blocked)
        // You might want to automatically transition to green here if video can't play
        // setActiveLight("green");
      });

      // Cleanup function: Remove listeners when component unmounts
      // or when activeLight is no longer 'red' (e.g., it transitions to green).
      return () => {
        console.log("Cleaning up video event listeners."); // Debugging
        video.removeEventListener("ended", handleVideoEnd);
        video.removeEventListener("error", handleVideoError);
      };
    }
    // If activeLight is not 'red', or videoRef is not current, do nothing.
    // The cleanup will handle pausing/resetting as needed if it moves from 'red'.
  }, [activeLight, videoSrc]); // Re-run if light state changes or video source changes

  // Effect to handle light transitions (Green -> Yellow -> Red)
  // This remains mostly the same as it's purely state-based timeouts.
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (activeLight === "green") {
      console.log("Light is GREEN. Setting timeout for YELLOW."); // Debugging
      timeout = setTimeout(() => {
        setActiveLight("yellow");
      }, 2000);
    } else if (activeLight === "yellow") {
      console.log("Light is YELLOW. Setting timeout for RED."); // Debugging
      timeout = setTimeout(() => {
        setActiveLight("red");
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [activeLight]); // Only re-run when activeLight changes

  // --- End of Core Logic Refinement ---

  return (
    <div className="relative mt-10 max-w-[580px]">
      {/* Traffic Lights */}
      <div className="absolute left-0 right-0 top-5 h-4 w-full bg-gray-800 md:top-10 md:h-8" />
      <div className="absolute left-0 right-0 top-10 h-4 w-full bg-gray-800 md:top-20 md:h-8" />

      {/* Main Content */}
      <div className="relative z-10 flex items-start gap-5">
        <TrafficLight
          activeLight={activeLight}
          className={cn("md:mt-4", lightClassName)}
        />
        <div className="relative aspect-video w-full overflow-hidden border-[10px] border-gray-800 bg-white">
          {activeLight === "green" ? (
            <div className="absolute inset-0 flex items-center justify-center bg-green-100">
              <div className="text-3xl font-bold text-green-600 md:text-6xl">
                GO
              </div>
            </div>
          ) : activeLight === "yellow" ? (
            <div className="absolute inset-0 flex items-center justify-center bg-yellow-100">
              <div className="text-3xl font-bold text-yellow-600 md:text-6xl">
                GET READY
              </div>
            </div>
          ) : (
            <video
              key={videoSrc} // Add a key here to force re-render if videoSrc changes
              ref={videoRef}
              src={videoSrc}
              muted
              className="absolute inset-0 z-10 aspect-video"
            ></video>
          )}
        </div>
        <div className={cn("h-96 w-8 rounded-full bg-gray-800", poleHeight)} />
      </div>
    </div>
  );
}
