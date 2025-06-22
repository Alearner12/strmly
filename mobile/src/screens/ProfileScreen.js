import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ route, navigation }) => {
  const { user } = route.params || { user: { username: '@default_user' } };

  const profileData = {
    username: user.username || '@default_user',
    displayName: user.displayName || 'Content Creator',
    bio: '🎬 Content Creator | 📱 Tech Enthusiast\n✨ Follow for amazing content!',
    followers: '1.2M',
    following: '234',
    likes: '5.6M',
    videos: [
      { id: 1, thumbnail: '#FF6B6B', views: '2.1M' },
      { id: 2, thumbnail: '#4ECDC4', views: '1.8M' },
      { id: 3, thumbnail: '#45B7D1', views: '3.2M' },
      { id: 4, thumbnail: '#96CEB4', views: '990K' },
      { id: 5, thumbnail: '#FFEAA7', views: '1.5M' },
      { id: 6, thumbnail: '#DDA0DD', views: '2.3M' },
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{profileData.username}</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>⋯</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
          </View>
          
          <Text style={styles.displayName}>{profileData.displayName}</Text>
          <Text style={styles.username}>{profileData.username}</Text>
          
          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profileData.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profileData.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profileData.likes}</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreButtonText}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Bio */}
          <Text style={styles.bio}>{profileData.bio}</Text>
        </View>

        {/* Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>📹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>❤️</Text>
          </TouchableOpacity>
        </View>

        {/* Video Grid */}
        <View style={styles.videoGrid}>
          {profileData.videos.map((video, index) => (
            <TouchableOpacity 
              key={video.id} 
              style={styles.videoItem}
              onPress={() => navigation.goBack()}
            >
              <View style={[styles.videoThumbnail, { backgroundColor: video.thumbnail }]}>
                <Text style={styles.playIcon}>▶️</Text>
                <View style={styles.viewsContainer}>
                  <Text style={styles.viewsText}>{video.views}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 8,
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarText: {
    fontSize: 40,
  },
  displayName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#999',
    fontSize: 14,
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  followButton: {
    backgroundColor: '#FE2C55',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  followButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageButton: {
    borderWidth: 1,
    borderColor: '#999',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  messageButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  moreButton: {
    borderWidth: 1,
    borderColor: '#999',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  moreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  bio: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 20,
  },
  activeTabText: {
    opacity: 1,
  },
  videoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 2,
  },
  videoItem: {
    width: width / 3 - 4,
    margin: 2,
  },
  videoThumbnail: {
    width: '100%',
    aspectRatio: 9/16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playIcon: {
    fontSize: 20,
    opacity: 0.8,
  },
  viewsContainer: {
    position: 'absolute',
    bottom: 4,
    left: 4,
  },
  viewsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 