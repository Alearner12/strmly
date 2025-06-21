import React from 'react';
import { AiOutlineReload, AiOutlineWarning } from 'react-icons/ai';

const ErrorScreen = ({ onRetry, message = "Failed to load videos" }) => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-6 max-w-sm mx-auto px-6 text-center">
        {/* Error icon */}
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
          <AiOutlineWarning size={40} className="text-red-500" />
        </div>
        
        {/* Error message */}
        <div className="text-white">
          <h3 className="text-xl font-semibold mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
        </div>
        
        {/* Retry button */}
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 active:scale-95 transition-all duration-200"
        >
          <AiOutlineReload size={20} />
          <span>Try Again</span>
        </button>
        
        {/* Help text */}
        <p className="text-gray-500 text-xs">
          Check your internet connection and try again
        </p>
      </div>
    </div>
  );
};

export default ErrorScreen; 