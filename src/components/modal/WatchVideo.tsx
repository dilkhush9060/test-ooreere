import {Button} from "@/components/ui/Button";
import {useEffect, useState} from "react";
import CustomVideoPlayer from "../VideoPlayer";

interface WatchVideoProps {
  url: string;
}

export default function WatchVideo({url}: WatchVideoProps) {
  const [open, setOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop itself, not child elements
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  if (!open) return <Button onClick={() => setOpen(true)}>View</Button>;

  return (
    <>
      <Button onClick={() => setOpen(true)}>View</Button>

      {/* Portal-style modal overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          onClick={handleBackdropClick}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal content */}
        <div className="relative z-10 max-h-[90vh] w-full max-w-[90vw]">
          <CustomVideoPlayer url={url} closeModal={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
}
