// app/_layout.tsx
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { NotificationProvider } from './NotificationContext';

export default function RootLayout() {
  return (
    <NotificationProvider>
      <Slot /> 
      <StatusBar style="auto" />
    </NotificationProvider>
  );
}
