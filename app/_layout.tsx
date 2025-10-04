// app/_layout.tsx
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { BuildingProvider } from "../contexts/BuildingContext";
import { NotificationProvider } from '../contexts/NotificationContext';

export default function RootLayout() {
  return (
    <BuildingProvider>
    <NotificationProvider>
      <Slot /> 
      <StatusBar style="auto" />
    </NotificationProvider>
    </BuildingProvider>
  );
}
