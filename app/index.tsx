import React, { useState } from 'react';
import SplashScreen from '../components/SplashScreen';

export default function IndexScreen() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // This should never be reached since splash navigates to tabs
  return null;
}