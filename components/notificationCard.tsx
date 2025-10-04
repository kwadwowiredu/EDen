// components/NotificationCard.tsx
import { Octicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

type Props = {
  message: string;
  read: boolean;
  onPress?: () => void;
};

export default function NotificationCard({ message, read, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Octicons
        name={read ? "bell" : "bell-fill"} // 👈 unread = filled bell
        size={18}
        style={[styles.icon, { color: read ? "#999" : "#e53935" }]}
      />
      <View style={styles.content}>
        <Text
          style={[
            styles.message,
            { 
              fontFamily: read ? "Montserrat-Regular" : "Montserrat-Bold", // 👈 unread = bold
              color: read ? "#555" : "#000"
            }
          ]}
          numberOfLines={2}
        >
          {message}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    marginVertical: 3,
    paddingVertical: width * 0.075,
    marginHorizontal: width * -0.01,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  icon: {
    marginRight: 12,
    left: width * 0.08,
  },
  content: {
    flex: 1,
  },
  message: {
    fontSize: width * 0.036,
    left: width * 0.08,
  },
});
