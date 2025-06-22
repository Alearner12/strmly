import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import {
  AntDesign,
  Feather,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const BottomNav = ({ activeTab = 'Home', onTabPress }) => {
  
  const renderIcon = (iconType, iconName, size, color) => {
    switch (iconType) {
      case 'AntDesign':
        return <AntDesign name={iconName} size={size} color={color} />;
      case 'Feather':
        return <Feather name={iconName} size={size} color={color} />;
      case 'MaterialIcons':
        return <MaterialIcons name={iconName} size={size} color={color} />;
      case 'Ionicons':
        return <Ionicons name={iconName} size={size} color={color} />;
      case 'UserPhoto':
        return (
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' }}
            style={styles.userPhotoIcon}
          />
        );
      default:
        return null;
    }
  };

  const navItems = [
    {
      iconType: 'AntDesign',
      icon: 'play',
      label: 'Home',
      key: 'Home'
    },
    {
      iconType: 'Ionicons',
      icon: 'videocam',
      label: 'Video Call',
      key: 'VideoCall'
    },
    {
      iconType: 'AntDesign',
      icon: 'plus',
      label: '',
      key: 'Add',
      isSpecial: true
    },
    {
      iconType: 'Feather',
      icon: 'search',
      label: 'Inbox',
      key: 'Chat'
    },
    {
      iconType: 'UserPhoto',
      icon: 'user-photo',
      label: 'Profile',
      key: 'Profile',
      isUserPhoto: true
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navContainer}>
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          
          if (item.isSpecial) {
            return (
              <TouchableOpacity
                key={item.key}
                style={styles.specialButton}
                onPress={() => onTabPress?.(item.key)}
                activeOpacity={0.8}
              >
                                  <View style={styles.addButtonContainer}>
                    <View style={styles.addButtonInner}>
                      {renderIcon(item.iconType, item.icon, 18, '#000000')}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={item.key}
              style={styles.navButton}
              onPress={() => onTabPress?.(item.key)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.navIconContainer, 
                { opacity: isActive ? 1 : 0.6 },
                item.isUserPhoto && styles.userPhotoContainer
              ]}>
                {renderIcon(
                  item.iconType, 
                  item.icon, 
                  22, 
                  isActive ? '#FFFFFF' : '#9CA3AF'
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    height: 56,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  specialButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    position: 'relative',
  },
  addButtonContainer: {
    width: 44,
    height: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    position: 'relative',
  },
  addButtonInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIconContainer: {
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'System',
  },
  userPhotoContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  userPhotoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
});

export default BottomNav; 