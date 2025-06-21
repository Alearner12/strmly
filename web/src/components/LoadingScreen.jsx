import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-6">
        {/* TikTok-style loading animation */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-transparent border-t-red-500 rounded-full animate-spin animation-delay-150"></div>
          <div className="absolute inset-4 border-4 border-transparent border-t-blue-500 rounded-full animate-spin animation-delay-300"></div>
        </div>
        
        {/* Loading text */}
        <div className="text-white text-lg font-medium animate-pulse">
          Loading videos...
        </div>
        
        {/* Loading dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-75"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-150"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 