import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AnimatedTabBar from './src/components/AnimatedTabBar';
import HomeScreen from './src/screens/HomeScreen';
import ExperienceScreen from './src/screens/ExperienceScreen';
import SkillsScreen from './src/screens/SkillsScreen';
import ProjectsScreen from './src/screens/ProjectsScreen';
import ContactScreen from './src/screens/ContactScreen';
import { Colors } from './src/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <NavigationContainer>
          <Tab.Navigator
            tabBar={props => <AnimatedTabBar {...props} />}
            screenOptions={{
              headerShown: false,
              lazy: false,
            }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Experience" component={ExperienceScreen} />
            <Tab.Screen name="Skills" component={SkillsScreen} />
            <Tab.Screen name="Projects" component={ProjectsScreen} />
            <Tab.Screen name="Contact" component={ContactScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
