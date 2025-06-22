import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import VideoCard from '../components/VideoCard';
import BottomNav from '../components/BottomNav';
import { mockVideos } from '../services/mockData';

const { width, height } = Dimensions.get('window');

const VideoFeedScreen = ({ navigation }) => {
  const [videos, setVideos] = useState(mockVideos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedVideos, setLikedVideos] = useState(new Set([3, 5, 7]));
  const [followedUsers, setFollowedUsers] = useState(new Set(['@ai_expert', '@app_creator', '@security_ninja', '@crypto_expert']));
  const [activeTab, setActiveTab] = useState('Home');
  const flatListRef = useRef(null);

  const toggleLike = (videoId) => {
    const newLikedVideos = new Set(likedVideos);
    if (newLikedVideos.has(videoId)) {
      newLikedVideos.delete(videoId);
    } else {
      newLikedVideos.add(videoId);
    }
    setLikedVideos(newLikedVideos);
  };

  const toggleFollow = (username) => {
    const newFollowedUsers = new Set(followedUsers);
    if (newFollowedUsers.has(username)) {
      newFollowedUsers.delete(username);
    } else {
      newFollowedUsers.add(username);
    }
    setFollowedUsers(newFollowedUsers);
  };

  const openProfile = (user) => {
    navigation.navigate('Profile', { user });
  };

  const handleTabPress = (tabKey) => {
    setActiveTab(tabKey);
    // Handle navigation based on tab
    switch (tabKey) {
      case 'Profile':
        navigation.navigate('Profile', { user: { username: '@current_user' } });
        break;
      case 'Add':
        // Handle create action
        console.log('Create pressed');
        break;
      // Add other tab handlers as needed
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80, // Video must be 80% visible to be considered active
  });

  const renderVideo = ({ item, index }) => (
    <VideoCard
      video={item}
      isActive={index === currentIndex}
      isLiked={likedVideos.has(item.id)}
      isFollowing={followedUsers.has(item.username)}
      onLike={() => toggleLike(item.id)}
      onFollow={() => toggleFollow(item.username)}
      onProfilePress={() => openProfile(item)}
    />
  );

  const getItemLayout = (data, index) => ({
    length: height,
    offset: height * index,
    index,
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      


      {/* Video Feed */}
      <FlatList
        ref={flatListRef}
        data={videos}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        getItemLayout={getItemLayout}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews={true}
        bounces={false}
        overScrollMode="never"
      />



      {/* Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab} 
        onTabPress={handleTabPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  tab: {
    paddingHorizontal: 14,
  },
  activeTab: {
    paddingHorizontal: 14,
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'System',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  tabSeparator: {
    marginHorizontal: 12,
  },
  separatorText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 18,
    fontWeight: '300',
  },

});

export default VideoFeedScreen; 