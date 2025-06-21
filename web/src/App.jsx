import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoFeed from './screens/VideoFeed';
import BottomNav from './components/BottomNav';
import LoginScreen from './components/LoginScreen';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUserID = localStorage.getItem('userID');
        const storedUserData = localStorage.getItem('userData');
        
        if (storedUserID && storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Clear invalid data
        localStorage.removeItem('userID');
        localStorage.removeItem('userData');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userID');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Show main app if authenticated
  return (
    <Router>
      <div className="relative h-screen bg-black">
        <div className="pb-20">
          <Routes>
            <Route path="/" element={<VideoFeed />} />
            <Route path="/shorts" element={<VideoFeed />} />
            <Route path="/create" element={<div className="h-screen bg-black flex items-center justify-center text-white text-xl">Create Video Coming Soon</div>} />
            <Route path="/search" element={<div className="h-screen bg-black flex items-center justify-center text-white text-xl">Search Coming Soon</div>} />
            <Route 
              path="/profile" 
              element={
                <div className="min-h-screen bg-black flex items-center justify-center text-white p-6">
                  <div className="text-center max-w-md w-full">
                    <img 
                      src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-2">{user?.name || 'Demo User'}</h2>
                    <p className="text-gray-400 mb-6">{user?.email || 'demo@strmly.com'}</p>
                    <div className="space-y-4 mb-8">
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Profile Stats</h3>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-xl font-bold text-red-500">127</div>
                            <div className="text-sm text-gray-400">Following</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-red-500">2.3K</div>
                            <div className="text-sm text-gray-400">Followers</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-red-500">45.2K</div>
                            <div className="text-sm text-gray-400">Likes</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-900 p-4 rounded-lg text-left">
                        <h3 className="text-lg font-semibold mb-2">About</h3>
                        <p className="text-gray-400 text-sm">
                          Content creator passionate about technology, innovation, and storytelling. 
                          Building the future of entertainment one video at a time.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full transition-colors duration-200 font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              } 
            />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App; 