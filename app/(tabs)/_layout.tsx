import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '../../components/haptic-tab';
import { Colors } from '../../constants/Colors';
import { useNotifications } from '../../contexts/NotificationContext';
import { useColorScheme } from '../../hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { notifications } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.read).length;
  const tint = Colors[colorScheme ?? 'light'].tint;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              size={28}
              name="home"
              color={focused ? Colors.light.primary : 'black'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) => (
            <Feather
              size={28}
              name="bell"
              color={focused ? Colors.light.primary : 'black'}
            />
          ),
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#e53935',
            color: '#fff',
          },
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              size={28}
              name="checklist"
              color={focused ? Colors.light.primary : 'black'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Feather
              size={28}
              name="settings"
              color={focused ? Colors.light.primary : 'black'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
