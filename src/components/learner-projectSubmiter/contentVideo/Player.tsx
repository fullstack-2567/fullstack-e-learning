import React, { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

interface PlayerProps {
  title: string;
  videoSrc: string;
  videoType?: string;
  posterSrc?: string;
}

const Player: React.FC<PlayerProps> = ({
  videoSrc,
  videoType = 'video/mp4',
  posterSrc,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'captions',
          'settings',
          'pip',
          'airplay',
          'fullscreen'
        ],
        ratio: '16:9',
        hideControls: false
      });
    }

    return () => {
      playerRef.current?.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen text-white flex flex-col items-center py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-black mb-8">
          <video
            ref={videoRef}
            className="w-full"
            controls
            crossOrigin="anonymous"
            poster={posterSrc}
          >
            <source src={videoSrc} type={videoType} />
            Your browser does not support the video tag.
          </video>
        </div>

      </div>
    </div>
  );
};

export default Player;