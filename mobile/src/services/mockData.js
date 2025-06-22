// Mock video data for STRMLY mobile app
export const mockVideos = [
  {
    id: 1,
    title: "DEATH",
    description: "terrifying search for a murderer whodunit/lyric honeymooners tragically cut...",
    username: "Gabbar Singh",
    userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    likes: 200000,
    comments: 13000,
    shares: 456,
    earnings: 2100,
    hashtags: ["#StartupIndia"],
    audioTitle: "Original Audio - Gabbar Singh",
    isLiked: false,
    isFollowing: false
  },
  {
    id: 2,
    title: "Tech Innovation Breakthrough",
    description: "Revolutionary AI technology that's changing everything we know about machine learning and automation in the modern world.",
    username: "@tech_innovator",
    userImage: "https://images.unsplash.com/photo-1494790108755-2616b612b1e7?w=150&h=150&fit=crop&crop=face",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    likes: 189000,
    comments: 8500,
    shares: 2100,
    earnings: 5200,
    hashtags: ["#TechInnovation", "#AI", "#Future"],
    audioTitle: "Original Audio - Tech Innovator",
    isLiked: false,
    isFollowing: false
  },
  {
    id: 3,
    title: "Startup Success Story",
    description: "From garage to unicorn: How this entrepreneur built a billion-dollar company with just $1000 and a dream.",
    username: "@startup_guru",
    userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    likes: 342000,
    comments: 25000,
    shares: 8900,
    earnings: 12500,
    hashtags: ["#StartupIndia", "#Entrepreneur", "#Success"],
    audioTitle: "Original Audio - Startup Guru",
    isLiked: true,
    isFollowing: true
  },
  {
    id: 4,
    title: "Digital Marketing Mastery",
    description: "Secrets of viral marketing revealed! Learn how top brands get millions of views and build massive audiences organically.",
    username: "@marketing_ninja",
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    likes: 98000,
    comments: 12000,
    shares: 4500,
    earnings: 7800,
    hashtags: ["#Marketing", "#Digital", "#Growth"],
    audioTitle: "Original Audio - Marketing Ninja",
    isLiked: false,
    isFollowing: false
  },
  {
    id: 5,
    title: "Fintech Revolution",
    description: "How blockchain and cryptocurrency are reshaping the financial industry. The future of money is here!",
    username: "@fintech_wizard",
    userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    likes: 156000,
    comments: 9800,
    shares: 3200,
    earnings: 6700,
    hashtags: ["#Fintech", "#Blockchain", "#Crypto"],
    audioTitle: "Original Audio - Fintech Wizard",
    isLiked: true,
    isFollowing: false
  },
  {
    id: 6,
    title: "E-commerce Empire",
    description: "Building a multi-million dollar online store from scratch. Proven strategies that actually work in 2024.",
    username: "@ecom_master",
    userImage: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    likes: 234000,
    comments: 18500,
    shares: 6700,
    earnings: 9900,
    hashtags: ["#Ecommerce", "#Business", "#Online"],
    audioTitle: "Original Audio - Ecom Master",
    isLiked: false,
    isFollowing: true
  },
  {
    id: 7,
    title: "Data Science Journey",
    description: "Transform raw data into actionable insights. Master Python, R, and machine learning algorithms to become a data science expert.",
    username: "@data_scientist",
    userImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    likes: 167000,
    comments: 11500,
    shares: 6100,
    earnings: 72000,
    hashtags: ["#datascience", "#python", "#analytics", "#ml"],
    audioTitle: "Original Audio - Data Scientist",
    isLiked: true,
    isFollowing: false
  },
  {
    id: 8,
    title: "Blockchain Revolution",
    description: "Understanding cryptocurrency, NFTs, and decentralized finance. Explore the future of digital transactions and smart contracts.",
    username: "@crypto_expert",
    userImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    likes: 98000,
    comments: 7200,
    shares: 3800,
    earnings: 41000,
    hashtags: ["#blockchain", "#crypto", "#nft", "#defi"],
    audioTitle: "Original Audio - Crypto Expert",
    isLiked: false,
    isFollowing: true
  }
];

export const mockUser = {
  id: "user_1",
  name: "Siddharth",
  username: "@siddharth_dev",
  image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
  followers: "12.5K",
  following: "234",
  likes: "1.2M",
  bio: "Tech enthusiast | Startup founder | Love creating amazing experiences ✨",
  verified: true
};

// API simulation functions
export const api = {
  getVideos: (page = 1, limit = 5) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * limit;
        const end = start + limit;
        const videos = mockVideos.slice(start, end);
        resolve({
          data: videos,
          hasMore: end < mockVideos.length,
          page,
          totalPages: Math.ceil(mockVideos.length / limit)
        });
      }, 500);
    });
  },

  toggleLike: (videoId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const video = mockVideos.find(v => v.id === videoId);
        if (video) {
          video.likes += video.isLiked ? -1 : 1;
          video.isLiked = !video.isLiked;
        }
        resolve(video);
      }, 200);
    });
  },

  toggleFollow: (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const video = mockVideos.find(v => v.username === userId);
        if (video) {
          video.isFollowing = !video.isFollowing;
        }
        resolve(video);
      }, 300);
    });
  },

  getUserProfile: (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUser);
      }, 300);
    });
  }
}; 