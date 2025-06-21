import React, { useState, useEffect } from 'react';
import { Settings, Share, MoreHorizontal, Grid, Heart, Play } from 'lucide-react';
import { mockUser, mockVideos } from '../services/mockData';
import { formatNumber } from '../utils/helpers';

const Profile = () => {
  const [user, setUser] = useState(mockUser);
  const [userVideos, setUserVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('videos');

  useEffect(() => {
    // Simulate loading user videos
    const loadUserVideos = () => {
      // Get first 6 videos as user's videos for demo
      const videos = mockVideos.slice(0, 6);
      setUserVideos(videos);
    };

    loadUserVideos();
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${user.name} on STRMLY`,
          text: `Check out ${user.name}'s profile on STRMLY!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Could show toast notification here
      }
    } catch (error) {
      console.error('Error sharing profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">{user.username}</h1>
          {user.verified && (
            <div className="ml-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleShare}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <Share size={20} />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-4">
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={user.image}
            alt={user.name}
            className="w-20 h-20 rounded-full border-2 border-gray-600"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
            <p className="text-gray-400 text-sm mb-3">{user.bio}</p>
            
            {/* Stats */}
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="text-lg font-semibold">{user.following}</div>
                <div className="text-gray-400 text-sm">Following</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{user.followers}</div>
                <div className="text-gray-400 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{user.likes}</div>
                <div className="text-gray-400 text-sm">Likes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mb-6">
          <button className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/80 transition-colors">
            Edit Profile
          </button>
          <button className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
            Share Profile
          </button>
          <button className="bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-700 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab('videos')}
          className={`flex-1 py-3 px-4 text-center relative ${
            activeTab === 'videos' ? 'text-white' : 'text-gray-400'
          }`}
        >
          <Grid size={20} className="mx-auto mb-1" />
          <span className="text-xs">Videos</span>
          {activeTab === 'videos' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('liked')}
          className={`flex-1 py-3 px-4 text-center relative ${
            activeTab === 'liked' ? 'text-white' : 'text-gray-400'
          }`}
        >
          <Heart size={20} className="mx-auto mb-1" />
          <span className="text-xs">Liked</span>
          {activeTab === 'liked' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'videos' && (
          <div className="grid grid-cols-3 gap-1">
            {userVideos.map((video, index) => (
              <div
                key={video.id}
                className="relative aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden group cursor-pointer"
              >
                <img
                  src={video.userImage}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center justify-between text-white text-xs">
                      <div className="flex items-center">
                        <Play size={12} className="mr-1" />
                        <span>{formatNumber(video.likes)}</span>
                      </div>
                      {video.isPaid && (
                        <div className="bg-green-500 px-1 py-0.5 rounded text-xs">
                          ₹{formatNumber(video.earnings)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'liked' && (
          <div className="text-center py-12">
            <Heart size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No liked videos yet</p>
            <p className="text-gray-500 text-sm mt-2">
              Videos you like will appear here
            </p>
          </div>
        )}

        {/* Empty state for videos */}
        {activeTab === 'videos' && userVideos.length === 0 && (
          <div className="text-center py-12">
            <Grid size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No videos yet</p>
            <p className="text-gray-500 text-sm mt-2">
              Create your first video to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 