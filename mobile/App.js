import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VideoFeedScreen from './src/screens/VideoFeedScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="VideoFeed"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#000000' },
        }}
      >
        <Stack.Screen 
          name="VideoFeed" 
          component={VideoFeedScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            presentation: 'modal',
            gestureDirection: 'vertical',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 