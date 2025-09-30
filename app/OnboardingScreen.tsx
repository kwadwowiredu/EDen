import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import React, { FC, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

interface SlideData {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
}

const slides: SlideData[] = [
  {
    id: '1',
    image: require('../assets/images/EDen/Rectangle 1.png'),
    title: 'Protect Your Home, Anytime.',
    subtitle:
      '“Stay connected to your home with real-time alerts and smart monitoring.”',
  },
  {
    id: '2',
    image: require('../assets/images/EDen/Rectangle 2-Photoroom.png'),
    title: 'Smart Control at Your Fingertips.',
    subtitle:
      '“Arm, disarm, and check in on your home security from anywhere.”',
  },
];

interface SlideProps {
  item: SlideData;
  index: number;
  scrollX: Animated.Value;
}



const Slide: FC<SlideProps> = ({ item, index, scrollX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: 'clamp',
  });

  const [fontsLoaded] = useFonts({
    'Montserrat-Black': require('../assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-ExtraBold' : require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    'InterSemi-Bold': require('../assets/fonts/Inter-SemiBold.otf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.slide}>
      <Animated.Image
        source={item.image}
        style={[styles.image, { transform: [{ scale }] }]}
      />
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
    </View>
  );
};

interface OnboardingProps {
  navigation: NavigationProp<ParamListBase>;
}

const OnboardingScreen: FC<OnboardingProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const ref = useRef<FlatList<SlideData>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / width);
    setCurrentIndex(idx);
  };

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      ref.current?.scrollToOffset({ offset: (currentIndex + 1) * width });
    } else {
      router.push('/authentication/Login')
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      ref.current?.scrollToOffset({ offset: (currentIndex - 1) * width });
    }
  };

  // const skip = () => {
  //   // just scroll to the last slide instead of routing
  //   ref.current?.scrollToOffset({ offset: (slides.length - 1) * width });
  //   setCurrentIndex(slides.length - 1);
  // };
  // create an Animated.Value for each slide/dot
  const animVals = useRef(slides.map((_, i) => new Animated.Value(i === currentIndex ? 1 : 0))).current;

  useEffect(() => {
    // animate all dots: active -> 1, others -> 0
    const animations = slides.map((_, i) =>
      Animated.timing(animVals[i], {
        toValue: i === currentIndex ? 1 : 0,
        duration: 300,
        useNativeDriver: true, // for transform/scale
      })
    );
    Animated.parallel(animations).start();
  }, [currentIndex]);




  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.light.background}
        barStyle="dark-content"
      />

      {/* Logo + Progress Bar */}
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          {slides.map((_, idx) => {
  const isLast = idx === slides.length - 1;
  return (
    <View
      key={idx}
      style={[
        // wrap to allow absolute positioned animated overlay
        styles.progressSegmentWrap,
        !isLast && { marginRight: 6 },
      ]}
    >
      {/* base (unfilled) dot */}
      <View
        style={[
          styles.progressSegment, // your existing style (width/height/borderRadius)
          { backgroundColor: Colors.light.lightGreen, opacity: 0.3 },
        ]}
      />

      {/* animated overlay (primary color) */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.progressSegment, // same size & radius to overlay exactly
          {
            position: 'absolute',
            left: 0,
            top: 0,
            backgroundColor: Colors.light.primary,
            transform: [
              {
                // scale from 0.8 -> 1.15 for a pleasing pop (tweak as you like)
                scale: animVals[idx].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1.15],
                }),
              },
            ],
            opacity: animVals[idx].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      />
    </View>
  );
})}

        </View>
      </View>

      {/* Slides */}
      <Animated.FlatList
        ref={ref}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => (
          <Slide item={item} index={index} scrollX={scrollX} />
        )}
      />

      {/* Footer Buttons */}
      <View style={styles.footer}>
        {currentIndex > 0 ? (
          <TouchableOpacity onPress={goBack} style={styles.arrowButton}>
            <Image
              source={require('../assets/images/EDen/Arrow.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text style={{ color: Colors.light.primary, fontFamily: 'InterSemi-Bold', fontSize: width * 0.045, left: width * 0.02,}}>
              Prev
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.arrowButtonPlaceholder} />
        )}

        <TouchableOpacity
          onPress={goNext}
          style={[
            currentIndex === slides.length - 1
              ? styles.getStartedButton
              : styles.nextButton,
              { flexDirection: 'row',  },
          ]}
        >
          <Text style={styles.GetStartedText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
            <Image
              source={require('../assets/images/EDen/Arrow.png')}
              style={{ width: 20, height: 20, transform: [{ rotate: '-180deg' }], right: width * 0.05,   }}
            />
        </TouchableOpacity>
        {/* Skip button for first slide */}
        {/* {currentIndex === 0 ? (
          <TouchableOpacity
            onPress={skip}
            style={styles.skipButtonOne}
          >
            <Text style={styles.skipTextSmall}>Skip</Text>
          </TouchableOpacity>
        ) : null} */}

        {/* Skip button for other slides */}

        {/* <TouchableOpacity
          onPress={skip}
          style={styles.skipButton}
          >
          <Text style={styles.skipTextSmall}>Skip</Text>
          </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  header: {
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    paddingVertical: 10,
  },
  progressSegmentWrap: {
  position: 'relative', // required for absolute overlay
  width: 22,            // match your progressSegment width
  height: 22,
},
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    marginHorizontal: 20,
    height: 6,
    width: 6,
    top: width * 0.1,
    right: width * 0.03,
  },
  progressSegment: {
    width: 22,
    height: 22,
    borderRadius: 24,
    backgroundColor: Colors.light.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 61,
    marginBottom: 22,
    top: height * 0.02,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    top: height * -0.09,
  },
  image: {
    width: width * 0.6,
    aspectRatio: 1,
    marginBottom: 18,
    resizeMode: 'contain',
    top: width * 0.05,
  },
  slideTitle: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: width * 0.068,
    color: Colors.light.primary,
    textAlign: 'left',
    marginBottom: 1,
    top: width * 0.16,
    // left: width * -0.07,
  },
  slideSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: width * 0.04,
    color: Colors.light.black,
    textAlign: 'left',
    lineHeight: width * 0.055,
    top: width * 0.16 ,
    // left: width * 0.05,
  },
  footer: {
    position: 'absolute',
    bottom: width * 0.20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,

  },
  arrowButton: { 
    padding: 10,  
    flexDirection: 'row',
    left: width * 0.04,
  },
  arrowButtonPlaceholder: { 
    width: 44, 
  },
  nextButton: {
    top: width * 0.001,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    bottom: width * 0.021,
    left: width * 0.58,
  },
  getStartedButton: {
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    left: width * 0.35,
  },
  nextText: {
    color: Colors.light.primary,
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.045,
    alignItems: 'center',
    textAlign: 'center',

  },
  skipButtonOne: {
    width: width * 0.86,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: '#E4E4E4',
    alignItems: 'center',
    left: width * -0.94,
    bottom: width * -0.101,
  },
  skipButton: {
    width: width * 0.86,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: '#E4E4E4',
    alignItems: 'center',
    left: width * -0.80,
    bottom: width * -0.121,
  },
  skipTextSmall: {
    color: 'black',
    fontFamily: 'InterSemi-Bold',
    fontSize: width * 0.035,
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
  GetStartedText: {
    color: Colors.light.primary,
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.045,
    alignItems: 'center',
    textAlign: 'center',
    right: width * 0.06,
  },

});
