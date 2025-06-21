import React, { useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const VideoFeed = () => {
  const {
    videos,
    loading,
    hasMore,
    error,
    activeVideoIndex,
    containerRef,
    refresh
  } = useInfiniteScroll();

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          // goToPreviousVideo();
          break;
        case 'ArrowDown':
          e.preventDefault();
          // goToNextVideo();
          break;
        case ' ':
          e.preventDefault();
          // Toggle play/pause for current video
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-2xl mb-4">😕</div>
          <p className="text-lg mb-4">Oops! Something went wrong</p>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={refresh}
            className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading && videos.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading amazing videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-black">
      {/* Video Container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto scrollbar-hide snap-y snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            data-video-index={index}
            className="w-full h-screen snap-start"
          >
            <VideoCard
              video={video}
              isActive={index === activeVideoIndex}
            />
          </div>
        ))}

        {/* Loading indicator for more videos */}
        {loading && videos.length > 0 && (
          <div className="h-screen flex items-center justify-center bg-black snap-start">
            <div className="text-center text-white">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm">Loading more videos...</p>
            </div>
          </div>
        )}

        {/* End of feed indicator */}
        {!hasMore && videos.length > 0 && (
          <div className="h-screen flex items-center justify-center bg-black snap-start">
            <div className="text-center text-white">
              <div className="text-4xl mb-4">🎉</div>
              <p className="text-lg mb-2">You've reached the end!</p>
              <p className="text-gray-400 mb-6">Pull down to refresh for more content</p>
              <button
                onClick={refresh}
                className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors"
              >
                Refresh Feed
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pull to refresh indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-red-500/20 z-10">
        {loading && <div className="h-full bg-red-500 animate-pulse"></div>}
      </div>
    </div>
  );
};

export default VideoFeed; 