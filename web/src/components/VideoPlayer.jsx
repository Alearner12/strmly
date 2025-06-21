import React from 'react';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import { VIDEO_STATES } from '../utils/constants';

const VideoPlayer = ({ 
  videoData, 
  isActive = false, 
  onDoubleClick, 
  onClick,
  className = "" 
}) => {
  const {
    videoRef,
    videoState,
    togglePlay,
    isBuffering
  } = useVideoPlayer(videoData, isActive);

  const handleVideoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onClick) {
      onClick(e);
    } else {
      togglePlay();
    }
  };

  const handleVideoDoubleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onDoubleClick) {
      onDoubleClick(e);
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <video
        ref={videoRef}
        src={videoData.videoUrl}
        className="video-player w-full h-full object-cover"
        loop
        playsInline
        muted
        preload="metadata"
        onClick={handleVideoClick}
        onDoubleClick={handleVideoDoubleClick}
        poster={videoData.thumbnail}
      />
      
      {/* Loading spinner */}
      {(videoState === VIDEO_STATES.LOADING || isBuffering) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Error state */}
      {videoState === VIDEO_STATES.ERROR && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center text-white">
            <div className="text-2xl mb-2">⚠️</div>
            <div className="text-sm">Unable to load video</div>
          </div>
        </div>
      )}
      
      {/* Play/pause overlay */}
      {videoState === VIDEO_STATES.PAUSED && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer; 