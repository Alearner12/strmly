import { useState, useEffect, useRef, useCallback } from 'react';
import { APP_CONFIG, VIDEO_STATES } from '../utils/constants';
import { isVideoInViewport, debounce } from '../utils/helpers';

export const useVideoPlayer = (videoData, isActive = false) => {
  const videoRef = useRef(null);
  const [videoState, setVideoState] = useState(VIDEO_STATES.LOADING);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  // Handle video play/pause based on viewport visibility
  const handleVideoPlayback = useCallback(
    debounce(() => {
      const video = videoRef.current;
      if (!video) return;

      if (isActive && isVideoInViewport(video, APP_CONFIG.VIDEO_INTERSECTION_THRESHOLD)) {
        if (videoState !== VIDEO_STATES.PLAYING) {
          video.play().catch((error) => {
            console.error('Video play error:', error);
            setVideoState(VIDEO_STATES.ERROR);
          });
        }
      } else {
        if (videoState === VIDEO_STATES.PLAYING) {
          video.pause();
        }
      }
    }, APP_CONFIG.AUTO_PLAY_DELAY),
    [isActive, videoState]
  );

  // Video event handlers
  const handleLoadStart = () => {
    setVideoState(VIDEO_STATES.LOADING);
    setIsBuffering(true);
  };

  const handleCanPlay = () => {
    setIsBuffering(false);
    if (isActive) {
      handleVideoPlayback();
    }
  };

  const handlePlay = () => {
    setVideoState(VIDEO_STATES.PLAYING);
  };

  const handlePause = () => {
    setVideoState(VIDEO_STATES.PAUSED);
  };

  const handleEnded = () => {
    setVideoState(VIDEO_STATES.ENDED);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  const handleWaiting = () => {
    setIsBuffering(true);
  };

  const handleCanPlayThrough = () => {
    setIsBuffering(false);
  };

  const handleError = () => {
    setVideoState(VIDEO_STATES.ERROR);
    setIsBuffering(false);
  };

  // Control functions
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (videoState === VIDEO_STATES.PLAYING) {
      video.pause();
    } else {
      video.play().catch(handleError);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMutedState = !isMuted;
    video.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  const changeVolume = (newVolume) => {
    const video = videoRef.current;
    if (!video) return;

    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    video.volume = clampedVolume;
    setVolume(clampedVolume);
    
    if (clampedVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const seekTo = (time) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(duration, time));
  };

  // Initialize video when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial properties
    video.muted = isMuted;
    video.volume = volume;
    video.preload = 'metadata';

    // Add event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // Handle active state changes
  useEffect(() => {
    handleVideoPlayback();
  }, [isActive, handleVideoPlayback]);

  // Handle scroll-based playback
  useEffect(() => {
    const handleScroll = debounce(() => {
      handleVideoPlayback();
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleVideoPlayback]);

  return {
    videoRef,
    videoState,
    currentTime,
    duration,
    volume,
    isMuted,
    isBuffering,
    togglePlay,
    toggleMute,
    changeVolume,
    seekTo,
  };
}; 