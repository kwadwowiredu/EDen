// TopNotification.tsx
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

type Props = {
  message: string;
  visible: boolean;
  onHide?: () => void;
  duration?: number; // ms
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function TopNotification({
  message,
  visible,
  onHide,
  duration = 3000,
  style,
  textStyle,
}: Props) {
  const insets = useSafeAreaInsets();
  const anim = useRef(new Animated.Value(0)).current; // 0 = hidden, 1 = shown

  useEffect(() => {
    if (visible) {
      // slide down + fade in
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // auto hide
      const t = setTimeout(() => {
        Animated.timing(anim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start(() => onHide && onHide());
      }, duration);

      return () => clearTimeout(t);
    } else {
      // hide if visible becomes false
      Animated.timing(anim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, anim, duration, onHide]);

  // translateY from -80 (offscreen) to 0
  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-(80 + insets.top), 0],
  });

  const opacity = anim;

  if (!message) return null;

  return (
    <Animated.View
      pointerEvents={visible ? "auto" : "none"}
      style={[
        styles.container,
        { paddingTop: insets.top + 8 },
        { transform: [{ translateY }], opacity },
        style,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          // immediate hide on tap
          Animated.timing(anim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start(() => onHide && onHide());
        }}
        style={styles.content}
      >
        <Feather name="alert-circle" size={20} color="#fff" style={{ marginRight: 10, left: width * 0.13, }} />
        <Text numberOfLines={2} style={[styles.message, textStyle]}>
          {message}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: "absolute",
    left: 12,
    right: 12,
    zIndex: 9999,
  },
  content: {
    alignSelf: "center",
    alignContent: "center",
    backgroundColor: Colors.light.primary,
    borderRadius: 12,
    paddingHorizontal: 5,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
    width: '90%',
    maxWidth: 420,
  },
  message: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
});
