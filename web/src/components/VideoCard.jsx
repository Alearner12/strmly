import React, { useState, useRef, useEffect } from 'react';
import { 
  AiOutlineHeart, 
  AiFillHeart, 
  AiOutlineMessage, 
  AiOutlineSend,
  AiOutlinePlus,
  AiOutlineMore,
  AiOutlineExpand,
  AiOutlineBell,
  AiOutlineWallet,
  AiOutlineCheck
} from 'react-icons/ai';
import { BiRupee, BiVolumeMute, BiVolumeFull } from 'react-icons/bi';
import { formatNumber } from '../utils/helpers';
import { api } from '../services/mockData';

const VideoCard = ({ video, isActive }) => {
  const [isLiked, setIsLiked] = useState(video.isLiked || false);
  const [likesCount, setLikesCount] = useState(video.likes);
  const [isFollowing, setIsFollowing] = useState(video.isFollowing);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isActive) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case ' ':
        case 'Spacebar':
          e.preventDefault();
          togglePlayPause();
          showControlsTemporarily();
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          toggleMute();
          showControlsTemporarily();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, isPlaying]);

  const handleLike = async () => {
    if (isLikeLoading) return; // Prevent multiple clicks
    
    // Store original values for rollback
    const originalLikedState = isLiked;
    const originalLikesCount = likesCount;
    
    try {
      setIsLikeLoading(true);
      
      // Optimistic UI update - update immediately
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
      
      // Simulate API call
      await api.toggleLike(video.id);
      
      setIsLikeLoading(false);
    } catch (error) {
      // Revert changes on error
      setIsLiked(originalLikedState);
      setLikesCount(originalLikesCount);
      setIsLikeLoading(false);
      
      console.error('Failed to update like:', error);
      // You could show a toast notification here
    }
  };

  const handleFollow = async () => {
    try {
      setIsFollowing(!isFollowing);
      await api.toggleFollow(video.userName);
    } catch (error) {
      setIsFollowing(isFollowing);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleVideoClick = () => {
    togglePlayPause();
    showControlsTemporarily();
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        onClick={handleVideoClick}
        style={{ cursor: 'pointer' }}
      />
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
      

      
      {/* Top Icons - Now with bubbly button effects */}
      <div className="absolute top-4 left-0 right-0 flex justify-between items-start px-4 py-3 z-20">
        <button 
          className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all duration-200 bubble-effect"
          onClick={() => console.log('Wallet clicked')}
        >
          <AiOutlineWallet size={24} className="text-white opacity-80" />
        </button>
                  <button
          className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all duration-200 bubble-effect"
          onClick={() => console.log('Notifications clicked')}
                  >
          <AiOutlineBell size={24} className="text-white opacity-80" />
                  </button>
            </div>

      {/* Temporary Volume Control */}
      {showControls && (
        <div className="absolute top-16 right-4 z-30 animate-fade-in">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
              showControlsTemporarily();
            }}
            className="bg-black/70 backdrop-blur-sm rounded-full p-3 hover:bg-black/80 active:scale-95 transition-all duration-200 shadow-lg bubble-effect"
          >
            {isMuted ? (
              <BiVolumeMute size={24} className="text-white" />
            ) : (
              <BiVolumeFull size={24} className="text-white" />
            )}
          </button>
              </div>
      )}

      {/* Center Play/Pause Button */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-20 h-20 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl animate-fade-in">
            <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent ml-1"></div>
          </div>
        </div>
      )}

      {/* Right Side Action Buttons - Enhanced with bubble effects - Responsive */}
      <div className="absolute right-2 xs:right-3 tablet:right-4 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4 tablet:space-y-6 z-20">
            {/* Like Button */}
            <button
              onClick={handleLike}
          className="flex flex-col items-center p-2 rounded-full hover:bg-white/10 active:scale-110 transition-all duration-200 bubble-effect"
        >
          {isLiked ? (
            <AiFillHeart className="text-red-500 mb-1 animate-pulse w-7 h-7 tablet:w-8 tablet:h-8" />
          ) : (
            <AiOutlineHeart className="text-white mb-1 w-7 h-7 tablet:w-8 tablet:h-8" />
          )}
              <span className="text-white text-xs tablet:text-sm font-medium">
                {formatNumber(likesCount)}
              </span>
            </button>

            {/* Comment Button */}
        <button className="flex flex-col items-center p-2 rounded-full hover:bg-white/10 active:scale-110 transition-all duration-200 bubble-effect">
          <AiOutlineMessage className="text-white mb-1 w-7 h-7 tablet:w-8 tablet:h-8" />
              <span className="text-white text-xs tablet:text-sm font-medium">
                {formatNumber(video.comments)}
              </span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
          className="flex flex-col items-center p-2 rounded-full hover:bg-white/10 active:scale-110 transition-all duration-200 bubble-effect"
        >
          <AiOutlineSend className="text-white mb-1 w-7 h-7 tablet:w-8 tablet:h-8" />
              <span className="text-white text-xs tablet:text-sm font-medium">
                {formatNumber(video.shares)}
              </span>
            </button>

        {/* Money/Tip Button */}
        <button className="flex flex-col items-center p-2 rounded-full hover:bg-white/10 active:scale-110 transition-all duration-200 bubble-effect">
          <BiRupee className="text-white mb-1 w-8 h-8 tablet:w-9 tablet:h-9" />
          <span className="text-white text-xs tablet:text-sm font-medium">
            {formatNumber(video.earnings)}
          </span>
        </button>

        {/* Three Dots Menu */}
        <button className="flex flex-col items-center p-2 rounded-full hover:bg-white/10 active:scale-110 transition-all duration-200 bubble-effect">
          <AiOutlineMore className="text-white rotate-90 w-7 h-7 tablet:w-8 tablet:h-8" />
        </button>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-20 left-0 right-0 px-4 z-20">
        {/* Hashtag */}
        <div className="flex items-center mb-3">
          <span className="text-white font-medium text-base mr-2"># Startup India</span>
          <button className="w-5 h-5 border border-white rounded-full flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all duration-200 bubble-effect">
            <AiOutlinePlus size={12} className="text-white" />
          </button>
        </div>

        {/* User Info and Content */}
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            {/* User Profile */}
            <div className="flex items-center mb-2">
              <img
                src={video.userImage}
                alt={video.userName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="text-white font-semibold text-base mr-3">{video.userName}</span>
              <button
                onClick={handleFollow}
                className={`px-4 py-1 rounded text-sm font-medium transition-all duration-200 active:scale-95 bubble-effect ${
                  isFollowing 
                    ? 'bg-gray-600 text-white border border-gray-600' 
                    : 'border border-white text-white hover:bg-white/10'
                }`}
              >
                {isFollowing ? (
                  <div className="flex items-center">
                    <AiOutlineCheck size={12} className="mr-1" />
                    Following
              </div>
                ) : (
                  'Follow'
                )}
            </button>
                </div>

            {/* Content Text */}
            <div className="flex items-start">
              <div className="flex-1">
                <p className="text-white text-sm leading-relaxed">
                  <span className="font-bold">DEATH</span>
                  <span className="bg-gray-600 text-white text-xs px-1 py-0.5 rounded ml-2">Ep</span>
                  <span className="ml-2">terrifying search for a murderer whodunit/lyric honeymooners tragically cut...</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right Corner - Paid and Maximize Icons - Responsive */}
      <div className="absolute bottom-16 xs:bottom-20 tablet:bottom-24 right-2 xs:right-4 tablet:right-6 flex flex-col items-center space-y-2 tablet:space-y-3 z-20">
        {/* Paid Button */}
        <div className="flex flex-col items-center">
          <span className="bg-yellow-400 text-black text-xs tablet:text-sm px-2 py-1 rounded font-medium">
            Paid
          </span>
        </div>

        {/* Expand/Maximize Button */}
        <button className="flex flex-col items-center p-2 rounded-full hover:bg-white/10 active:scale-110 transition-all duration-200 bubble-effect">
          <AiOutlineExpand className="text-white opacity-70 w-5 h-5 tablet:w-6 tablet:h-6" />
        </button>
      </div>

      {/* Sound indicator */}
      {!isMuted && isPlaying && !showControls && (
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium z-10 flex items-center">
          <BiVolumeFull size={14} className="mr-1" />
          Sound On
        </div>
      )}

      {/* Keyboard shortcuts indicator */}
      {showControls && (
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-xs z-10 animate-fade-in">
          <div>Space: Play/Pause</div>
          <div>M: Mute/Unmute</div>
        </div>
      )}
    </div>
  );
};

export default VideoCard; 