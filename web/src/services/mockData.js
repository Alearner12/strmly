// Mock video data for STRMLY app
export const mockVideos = [
  {
    id: "1",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "DEATH",
    description: "terrifying search for a murderer whodunit/lyric honeymooners tragically cut...",
    userName: "Gabbar Singh",
    userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    hashtags: ["#StartupIndia"],
    likes: 200000,
    comments: 13000,
    shares: 456,
    earnings: 2100,
    isPaid: true,
    isFollowing: false,
    duration: 45
  },
  {
    id: "2",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    title: "Tech Innovation in India 🇮🇳",
    description: "Exploring the latest tech innovations coming out of India's startup ecosystem #TechIndia #Innovation",
    userName: "Rahul Gupta",
    userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    hashtags: ["#TechIndia", "#Innovation", "#Startup"],
    likes: 189000,
    comments: 923,
    shares: 445,
    earnings: 2100,
    isPaid: false,
    isFollowing: true,
    duration: 62
  },
  {
    id: "3",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    title: "Fintech Revolution 💰",
    description: "How fintech startups are changing the game in India. From UPI to digital lending #Fintech #DigitalIndia",
    userName: "Anita Patel",
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    hashtags: ["#Fintech", "#DigitalIndia", "#UPI"],
    likes: 342000,
    comments: 2156,
    shares: 1023,
    earnings: 4500,
    isPaid: true,
    isFollowing: false,
    duration: 38
  },
  {
    id: "4",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    title: "AI & Machine Learning 🤖",
    description: "The future of AI in Indian startups. Watch how ML is transforming businesses #AI #MachineLearning #FutureOfWork",
    userName: "Vikram Singh",
    userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    hashtags: ["#AI", "#MachineLearning", "#FutureOfWork"],
    likes: 198000,
    comments: 1356,
    shares: 678,
    earnings: 2800,
    isPaid: false,
    isFollowing: true,
    duration: 55
  },
  {
    id: "5",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    title: "E-commerce Success Story 🛒",
    description: "From garage to unicorn: The incredible journey of an Indian e-commerce startup #Ecommerce #Success #Unicorn",
    userName: "Sneha Agarwal",
    userImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    hashtags: ["#Ecommerce", "#Success", "#Unicorn"],
    likes: 425000,
    comments: 3247,
    shares: 1589,
    earnings: 6100,
    isPaid: true,
    isFollowing: false,
    duration: 72
  },
  {
    id: "6",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    title: "EdTech Revolution 📚",
    description: "How EdTech is transforming education in India. From rural areas to urban centers #EdTech #Education #DigitalLearning",
    userName: "Karan Mehta",
    userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    hashtags: ["#EdTech", "#Education", "#DigitalLearning"],
    likes: 167000,
    comments: 892,
    shares: 334,
    earnings: 1900,
    isPaid: false,
    isFollowing: true,
    duration: 41
  },
  {
    id: "7",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    title: "HealthTech Innovation 🏥",
    description: "Revolutionary healthcare technology making healthcare accessible to all. Telemedicine and beyond #HealthTech #Healthcare",
    userName: "Dr. Meera Joshi",
    userImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    hashtags: ["#HealthTech", "#Healthcare", "#Telemedicine"],
    likes: 234000,
    comments: 1678,
    shares: 756,
    earnings: 3400,
    isPaid: true,
    isFollowing: false,
    duration: 58
  },
  {
    id: "8",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    title: "Sustainable Startups 🌱",
    description: "Green technology and sustainable business models leading the change in India #Sustainability #GreenTech #ClimateChange",
    userName: "Arjun Reddy",
    userImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    hashtags: ["#Sustainability", "#GreenTech", "#ClimateChange"],
    likes: 145000,
    comments: 743,
    shares: 289,
    earnings: 1650,
    isPaid: false,
    isFollowing: true,
    duration: 48
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
        const video = mockVideos.find(v => v.userName === userId);
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