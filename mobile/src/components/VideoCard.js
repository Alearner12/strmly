import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  Animated,
} from 'react-native';
import { Video } from 'expo-av';
import {
  AntDesign,
  Feather,
  MaterialIcons,
  Ionicons,
  FontAwesome,
} from '@expo/vector-icons';

// Using built-in icons instead of external images

const { width, height } = Dimensions.get('window');

const VideoCard = ({ 
  video, 
  isActive, 
  isLiked, 
  isFollowing, 
  onLike, 
  onFollow, 
  onProfilePress 
}) => {
  const [isPlaying, setIsPlaying] = useState(isActive);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [localIsFollowing, setLocalIsFollowing] = useState(isFollowing);
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [showVolumeButton, setShowVolumeButton] = useState(false);
  const [showWalletPressed, setShowWalletPressed] = useState(false);
  const [showBellPressed, setShowBellPressed] = useState(false);
  
  const videoRef = useRef(null);
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const volumeButtonTimer = useRef(null);

  useEffect(() => {
    if (isActive) {
      setIsPlaying(true);
      videoRef.current?.playAsync();
    } else {
      setIsPlaying(false);
      videoRef.current?.pauseAsync();
    }
  }, [isActive]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (volumeButtonTimer.current) {
        clearTimeout(volumeButtonTimer.current);
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pauseAsync();
      setIsPlaying(false);
    } else {
      videoRef.current?.playAsync();
      setIsPlaying(true);
    }
    
    // Show volume button when play/pause is pressed
    showVolumeButtonTemporarily();
  };

  const showVolumeButtonTemporarily = () => {
    setShowVolumeButton(true);
    
    // Clear existing timer
    if (volumeButtonTimer.current) {
      clearTimeout(volumeButtonTimer.current);
    }
    
    // Hide after 3 seconds
    volumeButtonTimer.current = setTimeout(() => {
      setShowVolumeButton(false);
    }, 3000);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleWalletPress = () => {
    setShowWalletPressed(true);
    setTimeout(() => setShowWalletPressed(false), 1000);
    console.log('Wallet/Balance pressed');
  };

  const handleBellPress = () => {
    setShowBellPressed(true);
    setTimeout(() => setShowBellPressed(false), 1000);
    console.log('Notifications pressed');
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleVideoPress = () => {
    togglePlayPause();
  };

  const handleFollowPress = () => {
    setLocalIsFollowing(!localIsFollowing);
    onFollow && onFollow();
    animateButton();
  };

  const handleLikePress = () => {
    setLocalIsLiked(!localIsLiked);
    onLike && onLike();
    animateButton();
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      const progressValue = status.positionMillis / status.durationMillis;
      setProgress(progressValue || 0);
    }
    if (status.didJustFinish) {
      videoRef.current?.replayAsync();
      setProgress(0);
    }
    if (status.error) {
      console.log('Video error:', status.error);
    }
  };

  const onLoadStart = () => {
    console.log('Video loading started for:', video.title);
  };

  const onLoad = (status) => {
    console.log('Video loaded successfully:', video.title);
  };

  const onError = (error) => {
    console.log('Video error for', video.title, ':', error);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Video Player */}
      <Video
        ref={videoRef}
        source={{ uri: video.videoUrl }}
        style={styles.video}
        shouldPlay={isPlaying && isActive}
        isLooping
        isMuted={isMuted}
        resizeMode="cover"
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        onError={onError}
        useNativeControls={false}
        volume={isMuted ? 0 : 1}
      />

      {/* Dark gradient overlay */}
      <View style={styles.gradientOverlay} />

      {/* Top Icons Row - Exact positioning */}
      <View style={styles.topIconsRow}>
        <TouchableOpacity 
          style={[styles.topButton, showWalletPressed && styles.pressedButton]}
          onPress={handleWalletPress}
          activeOpacity={0.6}
        >
          <MaterialIcons 
            name="account-balance-wallet" 
            size={24} 
            color={showWalletPressed ? "#FCD34D" : "white"} 
            style={styles.topIconStyle} 
          />
        </TouchableOpacity>
        <View style={styles.rightTopIcons}>
          <TouchableOpacity 
            style={[styles.topButton, showBellPressed && styles.pressedButton]}
            onPress={handleBellPress}
            activeOpacity={0.6}
          >
            <Ionicons 
              name={showBellPressed ? "notifications" : "notifications-outline"} 
              size={24} 
              color={showBellPressed ? "#fe2c55" : "white"} 
              style={styles.topIconStyle} 
            />
          </TouchableOpacity>
          {/* Volume Control - Shows temporarily when play/pause is pressed */}
          {showVolumeButton && (
            <TouchableOpacity 
              style={styles.volumeButtonFixed}
              onPress={toggleMute}
              activeOpacity={0.8}
            >
              <Ionicons 
                name={isMuted ? "volume-mute" : "volume-high"} 
                size={24} 
                color="white" 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tap to Play/Pause Overlay */}
      <TouchableOpacity 
        style={styles.videoOverlay} 
        activeOpacity={1}
        onPress={handleVideoPress}
      >
        {/* Center Play Button */}
        {!isPlaying && (
          <Animated.View style={[styles.centerPlayButton, { opacity: 1 }]}>
            <View style={styles.playButtonCircle}>
              <AntDesign name="caretright" size={32} color="white" style={styles.playIcon} />
            </View>
          </Animated.View>
        )}

        {/* Right Side Action Buttons - Vertical layout like TikTok */}
        <View style={styles.rightActions}>
          {/* Like Button - Heart icon */}
          <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleLikePress}
              activeOpacity={0.7}
            >
              <View style={styles.actionIconContainer}>
                <AntDesign 
                  name={localIsLiked ? "heart" : "hearto"} 
                  size={30} 
                  color={localIsLiked ? "#fe2c55" : "white"} 
                />
              </View>
              <Text style={styles.actionCount}>200K</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Comment Button - Message icon */}
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="chatbubble-outline" size={30} color="white" />
            </View>
            <Text style={styles.actionCount}>13K</Text>
          </TouchableOpacity>

          {/* Share Button - Share icon */}
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <View style={styles.actionIconContainer}>
              <Feather name="send" size={30} color="white" />
            </View>
            <Text style={styles.actionCount}>456</Text>
          </TouchableOpacity>

          {/* Money/Tip Button - Rupee icon */}
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <View style={styles.actionIconContainer}>
              <FontAwesome name="rupee" size={30} color="white" />
            </View>
            <Text style={styles.actionCount}>2.1K</Text>
          </TouchableOpacity>

          {/* Three Dots Menu */}
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <View style={styles.actionIconContainer}>
              <Feather name="more-horizontal" size={30} color="white" />
            </View>
          </TouchableOpacity>

          {/* Paid Button - Below three dots */}
          <View style={styles.paidButtonRight}>
            <View style={styles.paidTag}>
              <Text style={styles.paidText}>Paid</Text>
            </View>
          </View>
        </View>

        {/* Bottom Content - Exact match to screenshot */}
        <View style={styles.bottomContent}>
          {/* Hashtag with plus - exact positioning */}
          <View style={styles.hashtagSection}>
            <Text style={styles.hashtagText}># Startup India</Text>
            <TouchableOpacity style={styles.hashtagPlus} activeOpacity={0.7}>
              <AntDesign name="plus" size={12} color="white" />
            </TouchableOpacity>
          </View>

          {/* User info and content */}
          <View style={styles.contentRow}>
            <View style={styles.leftContent}>
              {/* User Profile */}
              <View style={styles.userSection}>
                <TouchableOpacity onPress={onProfilePress} activeOpacity={0.8}>
                  <Image
                    source={{ uri: video.userImage }}
                    style={styles.userAvatar}
                  />
                </TouchableOpacity>
                <View style={styles.userInfo}>
                  <View style={styles.userNameRow}>
                    <TouchableOpacity onPress={onProfilePress} activeOpacity={0.8}>
                      <Text style={styles.userName}>Gabbar Singh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.followButton,
                        localIsFollowing && styles.followingButton
                      ]}
                      onPress={handleFollowPress}
                      activeOpacity={0.8}
                    >
                      {localIsFollowing ? (
                        <Text style={[styles.followText, styles.followingText]}>Following</Text>
                      ) : (
                        <Text style={styles.followText}>Follow</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Content Text - exact match */}
              <View style={styles.contentTextSection}>
                <Text style={styles.contentText}>
                  <Text style={styles.boldText}>DEATH </Text>
                  <View style={styles.episodeTagContainer}>
                    <Text style={styles.episodeTag}>Ep</Text>
                  </View>
                  <Text> terrifying search for a murderer whodunit/lyric honeymooners tragically cut...</Text>
                </Text>
              </View>
            </View>

            {/* Expand Icon - Absolutely positioned bottom right */}
            <TouchableOpacity style={styles.expandButton} activeOpacity={0.7}>
              <Feather name="maximize-2" size={18} color="white" style={styles.expandIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#000000',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  
  // Top Icons - Exact positioning
  topIconsRow: {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 20,
  },
  topButton: {
    padding: 8,
    borderRadius: 20,
  },
  pressedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: [{ scale: 0.95 }],
  },
  rightTopIcons: {
    alignItems: 'center',
  },
  topIconStyle: {
    opacity: 0.8,
  },
  volumeButtonFixed: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    padding: 8,
    marginTop: 8,
  },
  
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerPlayButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  playButtonCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    marginLeft: 4,
  },
  
  // Right Actions - Vertical layout like TikTok
  rightActions: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -120 }],
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },

  actionCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  paidButtonRight: {
    alignItems: 'center',
    marginBottom: 8,
    marginRight: -4, // Move slightly more to the right
  },
  
  // Bottom Content - Adjusted to avoid bottom navigation overlap
  bottomContent: {
    position: 'absolute',
    bottom: 58, // Adjusted for smaller navigation height
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  
  // Hashtag Section - Exact positioning
  hashtagSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  hashtagText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  hashtagPlus: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Content row
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'relative',
  },
  leftContent: {
    flex: 1,
    paddingRight: 16,
  },
  
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
  },
  followButton: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 4,
  },
  followingButton: {
    backgroundColor: '#374151',
    borderColor: '#374151',
  },
  followText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  followingText: {
    color: '#FFFFFF',
  },
  
  // Content Text - Exact formatting
  contentTextSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contentText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
    marginRight: 8,
  },
  boldText: {
    fontWeight: 'bold',
  },
  episodeTagContainer: {
    backgroundColor: '#6B7280',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  episodeTag: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  paidTag: {
    backgroundColor: '#FCD34D',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  paidText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Expand Button - Bottom right positioning
  expandButton: {
    position: 'absolute',
    bottom: -8,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
  expandIcon: {
    opacity: 0.7,
  },
});

export default VideoCard; 