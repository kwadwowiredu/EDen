import { useRouter } from 'expo-router';
import React, { FC, useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    StatusBar as RNStatusBar,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: FC<SplashScreenProps> = ({ onComplete }) => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [overlayVisible, setOverlayVisible] = useState(true);
  const fadeAnim2 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/OnboardingScreen"); //
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // cleanup
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setOverlayVisible(false);
      });
    }, 300);

      Animated.timing(fadeAnim2, {
        toValue: 3,
        duration: 9000,
        useNativeDriver: false,
    }).start();

    return () => clearTimeout(timer);
  }, []);


  return (
    <View style={styles.container}>
      <RNStatusBar backgroundColor={Colors.light.background} barStyle="light-content" />
        {overlayVisible && (
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: Colors.light.primary,
                opacity: fadeAnim,
                zIndex: 10,
              },
            ]}
          />
        )}

      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets/images/EDen/eden icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
        <TouchableOpacity
          style={styles.getStartedImage}
        >
          <Animated.Image source={require('../assets/images/EDen/Ellipse 3.png')} style={{ width: 18, height: 18, opacity: fadeAnim2 }} resizeMode='contain'/>
        </TouchableOpacity>
                <TouchableOpacity
          style={styles.getStartedImage}
        >
          <Animated.Image source={require('../assets/images/EDen/Ellipse 3.png')} style={{ width: 18, height: 18, opacity: fadeAnim2, left: width * 0.08}} resizeMode='contain'/>
        </TouchableOpacity>
                <TouchableOpacity
          style={styles.getStartedImage}
        >
          <Animated.Image source={require('../assets/images/EDen/Ellipse 3.png')} style={{ width: 18, height: 18, opacity: fadeAnim2, right: width * 0.08}} resizeMode='contain'/>
        </TouchableOpacity>

        {/* <Animated.Text style={[styles.getStartedText, { opacity: fadeAnim2 }]} onPress={() => router.push('/OnboardingScreen')}>Get Started</Animated.Text> */}

        <View style={styles.FooterText}>
        </View>
      </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoWrapper: {
    flex: 3,
    justifyContent: 'center',
    width,
  },
  logo: {
    position: 'absolute',
    top: 230,
    width: 400,
    height: 400,
    alignSelf: 'center',
  },
  getStartedImage: {
    position: 'absolute',
    top: 478,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  getStartedText: {
    position: 'absolute',
    top: 537,
    color: Colors.light.black,
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  FooterText: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  FooterTextContent: {
    color: Colors.light.lightGreen,
    fontSize: 26,
    fontFamily: 'Inter-Bold',
  },
});



