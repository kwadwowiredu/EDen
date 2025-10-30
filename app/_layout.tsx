// app/_layout.tsx
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { BuildingProvider } from "../contexts/BuildingContext";
import { LocksProvider } from "../contexts/LocksContext";
import { NotificationProvider } from '../contexts/NotificationContext';
import { UserProvider } from '../contexts/UserContext';

export default function RootLayout() {
  return (
    <UserProvider>
    <LocksProvider>
    <BuildingProvider>
    <NotificationProvider>
      <Slot /> 
      <StatusBar style="auto" />
    </NotificationProvider>
    </BuildingProvider>
    </LocksProvider>
    </UserProvider>
  );
}
