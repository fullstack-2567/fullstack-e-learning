import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

interface PlayerProps {
  title: string;
  videoSrc: string;
  videoType?: string;
  posterSrc?: string;
}

const Player: React.FC<PlayerProps> = ({
  title,
  videoSrc,
  videoType = "video/mp4",
  posterSrc,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          "pip",
          "airplay",
          "fullscreen",
        ],
        ratio: "16:9",
        hideControls: false,
      });
    }

    return () => {
      playerRef.current?.destroy();
    };
  }, []);

  // Handle video source changes
  useEffect(() => {
    if (videoRef.current) {
      if (videoSrc) {
        setHasError(false);
        // Force video element to reload with new source
        videoRef.current.load();
      } else {
        setHasError(true);
      }
    }
  }, [videoSrc]);

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>

        {hasError ? (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <p className="text-red-400">Video source is not available</p>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-black mb-8">
            <video
              ref={videoRef}
              className="w-full"
              controls
              crossOrigin="anonymous"
              poster={posterSrc}
            >
              {videoSrc && <source src={videoSrc} type={videoType} />}
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
