import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../services/mockData';
import { APP_CONFIG } from '../utils/constants';

export const useInfiniteScroll = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [error, setError] = useState(null);
  
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  // Load initial videos
  const loadInitialVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getVideos(1, 5);
      setVideos(response.data);
      setHasMore(response.hasMore);
      setCurrentPage(2);
    } catch (err) {
      setError('Failed to load videos');
      console.error('Error loading initial videos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load more videos
  const loadMoreVideos = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const response = await api.getVideos(currentPage, 3);
      
      setVideos(prev => [...prev, ...response.data]);
      setHasMore(response.hasMore);
      setCurrentPage(prev => prev + 1);
    } catch (err) {
      setError('Failed to load more videos');
      console.error('Error loading more videos:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading, hasMore]);

  // Handle scroll and determine active video
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const videoElements = container.querySelectorAll('[data-video-index]');
    const containerHeight = container.clientHeight;
    const scrollTop = container.scrollTop;
    
    let activeIndex = 0;
    let maxVisibility = 0;

    videoElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Calculate visibility percentage
      const visibleTop = Math.max(rect.top, containerRect.top);
      const visibleBottom = Math.min(rect.bottom, containerRect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const elementHeight = rect.height;
      const visibilityRatio = visibleHeight / elementHeight;

      if (visibilityRatio > maxVisibility && visibilityRatio > APP_CONFIG.VIDEO_INTERSECTION_THRESHOLD) {
        maxVisibility = visibilityRatio;
        activeIndex = parseInt(element.getAttribute('data-video-index'));
      }
    });

    setActiveVideoIndex(activeIndex);

    // Check if we need to load more videos
    const scrollPercentage = (scrollTop + containerHeight) / container.scrollHeight;
    if (scrollPercentage > 0.8 && hasMore && !loading) {
      loadMoreVideos();
    }
  }, [hasMore, loading, loadMoreVideos]);

  // Setup intersection observer for better performance
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > APP_CONFIG.VIDEO_INTERSECTION_THRESHOLD) {
            const index = parseInt(entry.target.getAttribute('data-video-index'));
            setActiveVideoIndex(index);
          }
        });

        // Check for loading more videos
        const lastEntry = entries[entries.length - 1];
        if (lastEntry && lastEntry.isIntersecting && hasMore && !loading) {
          loadMoreVideos();
        }
      },
      {
        root: containerRef.current,
        rootMargin: '10px',
        threshold: [0, 0.25, 0.5, 0.75, 1.0]
      }
    );

    observerRef.current = observer;

    // Observe all video elements
    const videoElements = containerRef.current.querySelectorAll('[data-video-index]');
    videoElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [videos, hasMore, loading, loadMoreVideos]);

  // Setup scroll listener as fallback
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const throttledHandleScroll = throttle(handleScroll, 100);
    container.addEventListener('scroll', throttledHandleScroll);

    return () => {
      container.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [handleScroll]);

  // Load initial videos on mount
  useEffect(() => {
    loadInitialVideos();
  }, [loadInitialVideos]);

  // Navigation functions
  const goToNextVideo = useCallback(() => {
    if (activeVideoIndex < videos.length - 1) {
      const nextIndex = activeVideoIndex + 1;
      const nextElement = containerRef.current?.querySelector(`[data-video-index="${nextIndex}"]`);
      if (nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeVideoIndex, videos.length]);

  const goToPreviousVideo = useCallback(() => {
    if (activeVideoIndex > 0) {
      const prevIndex = activeVideoIndex - 1;
      const prevElement = containerRef.current?.querySelector(`[data-video-index="${prevIndex}"]`);
      if (prevElement) {
        prevElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeVideoIndex]);

  const goToVideo = useCallback((index) => {
    if (index >= 0 && index < videos.length) {
      const element = containerRef.current?.querySelector(`[data-video-index="${index}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [videos.length]);

  return {
    videos,
    loading,
    hasMore,
    error,
    activeVideoIndex,
    containerRef,
    loadMoreVideos,
    goToNextVideo,
    goToPreviousVideo,
    goToVideo,
    refresh: loadInitialVideos,
  };
};

// Throttle helper function
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
} 