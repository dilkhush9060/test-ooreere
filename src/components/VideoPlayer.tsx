import {useState, useRef, useEffect} from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  SkipForward,
  SkipBack,
  Download,
  X,
} from "lucide-react";

const CustomVideoPlayer = ({
  url = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  fileName = "video",
  closeModal,
}: {
  url?: string;
  fileName?: string;
  closeModal?: () => void;
}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Auto-hide controls on mobile
  useEffect(() => {
    if (isMobile && playing) {
      if (controlsTimeout) clearTimeout(controlsTimeout);

      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);

      setControlsTimeout(timeout);

      return () => {
        if (timeout) clearTimeout(timeout);
      };
    }
  }, [playing, isMobile, showControls]);

  const showControlsTemporarily = () => {
    if (isMobile) {
      setShowControls(true);
      if (controlsTimeout) clearTimeout(controlsTimeout);

      if (playing) {
        const timeout = setTimeout(() => {
          setShowControls(false);
        }, 3000);
        setControlsTimeout(timeout);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobile) return; // Disable keyboard shortcuts on mobile

      if (
        document.activeElement !== containerRef.current &&
        !containerRef.current?.contains(document.activeElement)
      )
        return;

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          handlePlayPause();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handleRewind();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleForward();
          break;
        case "m":
          e.preventDefault();
          handleToggleMute();
          break;
        case "f":
          e.preventDefault();
          handleFullscreen();
          break;
        case "r":
          e.preventDefault();
          handleReset();
          break;
        case "Escape":
          if (!isFullscreen && closeModal) {
            e.preventDefault();
            closeModal();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    playing,
    muted,
    volume,
    isFullscreen,
    currentTime,
    duration,
    closeModal,
    isMobile,
  ]);

  useEffect(() => {
    if (!isMobile) {
      containerRef.current?.focus();
    }
  }, [isMobile]);

  const handlePlayPause = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current?.pause();
      setPlaying(false);
    }
    showControlsTemporarily();
  };

  const handleVolumeChange = (e: {target: {value: string}}) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume > 0 && muted) {
      setMuted(false);
      if (videoRef.current) {
        videoRef.current.muted = false;
      }
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
    showControlsTemporarily();
  };

  const handleSeekChange = (e: {target: {value: string}}) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - 10
      );
    }
    showControlsTemporarily();
  };

  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        duration,
        videoRef.current.currentTime + 10
      );
    }
    showControlsTemporarily();
  };

  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    showControlsTemporarily();
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    showControlsTemporarily();
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      const urlParts = url.split(".");
      const extension =
        urlParts.length > 1
          ? urlParts[urlParts.length - 1].split("?")[0]
          : "mp4";

      link.href = downloadUrl;
      link.download = fileName.includes(".")
        ? fileName
        : `${fileName}.${extension}`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      console.log("Download started successfully");
    } catch (error) {
      console.error("Download failed:", error);
      alert(
        "Download failed. Please try again or check if the video URL is accessible."
      );
    } finally {
      setDownloading(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return "0:00";
    const date = new Date(seconds * 1000);
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercentage = muted ? 0 : volume * 100;

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto w-full rounded-lg bg-gray-900 shadow-2xl ${
        isFullscreen ? "h-screen max-w-none" : "max-w-4xl"
      }`}
      tabIndex={isMobile ? -1 : 0}
      onTouchStart={showControlsTemporarily}
      onMouseMove={showControlsTemporarily}
    >
      {closeModal && !isFullscreen && (
        <button
          onClick={closeModal}
          className={`absolute z-40 rounded-full bg-white p-2 ${
            isMobile ? "right-2 top-2" : "-right-3 -top-5"
          }`}
        >
          <X size={isMobile ? 20 : 24} />
        </button>
      )}

      <video
        ref={videoRef}
        src={url}
        className="aspect-video w-full"
        onClick={handlePlayPause}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        playsInline
        preload="metadata"
      />

      {/* Mobile Play/Pause Overlay */}
      {isMobile && !showControls && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={handlePlayPause}
        >
          <div
            className={`rounded-full bg-black/50 p-4 transition-opacity ${
              playing ? "opacity-0" : "opacity-100"
            }`}
          >
            <Play size={48} className="text-white" />
          </div>
        </div>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black via-black/90 to-transparent transition-opacity duration-300 ${
          isMobile && !showControls
            ? "pointer-events-none opacity-0"
            : "opacity-100"
        } ${isMobile ? "p-2" : "p-4"}`}
      >
        {/* Progress Bar */}
        <div className={`${isMobile ? "mb-2" : "mb-3"}`}>
          <div
            className={`relative rounded-lg bg-gray-600 transition-colors hover:bg-gray-500 ${
              isMobile ? "h-1" : "h-2"
            }`}
          >
            <div
              className="absolute left-0 top-0 h-full rounded-lg bg-red-500 shadow-sm shadow-red-500/40 transition-all duration-150"
              style={{width: `${progressPercentage}%`}}
            />
            <input
              type="range"
              min={0}
              max={duration || 0}
              step="any"
              value={currentTime}
              onChange={handleSeekChange}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0 hover:opacity-10"
            />
          </div>
        </div>

        {/* Mobile Layout */}
        {isMobile ? (
          <div className="space-y-2">
            {/* Top Row - Main Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayPause}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-white transition-all ${
                    playing
                      ? "bg-red-600 shadow-lg shadow-red-500/30"
                      : "bg-green-600 shadow-lg shadow-green-500/30"
                  }`}
                >
                  {playing ? <Pause size={16} /> : <Play size={16} />}
                </button>

                <button
                  onClick={handleRewind}
                  className="hover:bg-blue-500/20 rounded-full p-1.5 text-white transition-all"
                >
                  <SkipBack size={16} />
                </button>

                <button
                  onClick={handleForward}
                  className="hover:bg-blue-500/20 rounded-full p-1.5 text-white transition-all"
                >
                  <SkipForward size={16} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleMute}
                  className="rounded-full p-1.5 text-white transition-all"
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <button
                  onClick={handleFullscreen}
                  className="rounded-full p-1.5 text-white transition-all"
                >
                  {isFullscreen ? (
                    <Minimize size={16} />
                  ) : (
                    <Maximize size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Bottom Row - Time and Additional Controls */}
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white transition-all disabled:opacity-50"
                >
                  {downloading ? (
                    <div className="border-t-blue-500 h-3 w-3 animate-spin rounded-full border-2 border-gray-300"></div>
                  ) : (
                    <Download size={12} />
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="rounded-full p-1.5 text-white transition-all hover:bg-orange-500/20"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* Volume Slider for Mobile */}
            <div className="flex items-center gap-2">
              <Volume2 size={14} className="text-white" />
              <div className="relative h-1 flex-1 rounded-lg bg-gray-600">
                <div
                  className="absolute left-0 top-0 h-full rounded-lg bg-red-500 transition-all duration-150"
                  style={{
                    width: `${volumePercentage}%`,
                    opacity: muted ? 0 : 1,
                  }}
                />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="0.1"
                  value={muted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Desktop Layout */
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePlayPause}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition-all hover:scale-110 ${
                  playing
                    ? "bg-red-600 shadow-lg shadow-red-500/30 hover:bg-red-700"
                    : "bg-green-600 shadow-lg shadow-green-500/30 hover:bg-green-700"
                }`}
              >
                {playing ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <div className="flex items-center">
                <button
                  onClick={handleRewind}
                  className="hover:bg-blue-500/20 hover:text-blue-400 rounded-full p-2 text-white transition-all hover:scale-110"
                  title="Rewind 10s"
                >
                  <SkipBack size={22} />
                </button>

                <button
                  onClick={handleForward}
                  className="hover:bg-blue-500/20 hover:text-blue-400 rounded-full p-2 text-white transition-all hover:scale-110"
                  title="Forward 10s"
                >
                  <SkipForward size={22} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleMute}
                  className={`rounded-full p-2 text-white transition-all hover:scale-110 ${
                    muted
                      ? "hover:bg-red-500/20 hover:text-red-400"
                      : "hover:bg-blue-500/20 hover:text-blue-400"
                  }`}
                >
                  {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                </button>

                <div className="relative h-1 w-20 rounded-lg bg-gray-600 transition-colors hover:bg-gray-500">
                  <div
                    className="absolute left-0 top-0 h-full rounded-lg bg-red-500 shadow-sm transition-all duration-150"
                    style={{
                      width: `${volumePercentage}%`,
                      opacity: muted ? 0 : 1,
                    }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="0.1"
                    value={muted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </div>
              </div>

              <div className="text-sm font-medium text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center gap-2 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                title="Download video"
              >
                {downloading ? (
                  <div className="border-t-blue-500 h-5 w-5 animate-spin rounded-full border-4 border-gray-300"></div>
                ) : (
                  <Download size={18} />
                )}
              </button>

              <button
                onClick={handleReset}
                className="rounded-full p-2 text-white transition-all hover:scale-110 hover:bg-orange-500/20 hover:text-orange-400"
                title="Reset to beginning"
              >
                <RotateCcw size={22} />
              </button>

              <button
                onClick={handleFullscreen}
                className={`rounded-full p-2 text-white transition-all hover:scale-110 ${
                  isFullscreen
                    ? "hover:bg-red-500/20 hover:text-red-400"
                    : "hover:bg-blue-500/20 hover:text-blue-400"
                }`}
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
