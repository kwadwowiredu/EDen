import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { HapticTab } from '../../components/haptic-tab';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // replace this with your real unread count (context / api / push store)
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // example: simulate fetching unread count once at mount
  useEffect(() => {
    // TODO: replace with real fetch / subscription
    const timer = setTimeout(() => setUnreadCount(3), 800);
    return () => clearTimeout(timer);
  }, []);

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
          // title: 'Home',
          tabBarIcon: ({ focused }) => <Feather size={28} name="home" color={focused ? Colors.light.primary : 'black'} />,
          tabBarAccessibilityLabel: 'Home tab',
        }}
      />

            <Tabs.Screen
        name="notification"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) => <Feather size={28} name="bell" color={focused ? Colors.light.primary : 'black'}/>,
          // show badge only when unreadCount > 0
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#e53935',
            color: '#fff',
          },
          tabBarAccessibilityLabel: `Notifications tab${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => <MaterialIcons size={28} name="checklist" color={focused ? Colors.light.primary : 'black'} />,
          tabBarAccessibilityLabel: 'Explore tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <Feather size={28} name="settings" color={focused ? Colors.light.primary : 'black'} />,
          tabBarAccessibilityLabel: 'Settings tab',
        }}
      />
    </Tabs>
  );
}
