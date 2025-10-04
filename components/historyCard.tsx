// components/historyCard.tsx
import { Octicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

type Props = {
  user: string;       // e.g., Ama
  action: "locked" | "unlocked";
  door: string;       // e.g., main door
  date: string;       // formatted date, e.g., "2025-10-01"
  time: string;       // formatted time, e.g., "13:45"
  onPress?: () => void;
};

export default function historyCard({ user, action, door, date, time, onPress }: Props) {
  const message = `${user} ${action} the ${door}`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Octicons
        name={action === "locked" ? "lock" : "unlock"}
        size={18}
        style={[styles.icon, { color: action === "locked" ? "#555" : "#e53935" }]}
      />
      <View style={styles.content}>
        <Text style={[styles.message]} numberOfLines={2}>
          {message}
        </Text>
        <View style={styles.dateTime}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
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
    marginRight: 14,
    left: width * 0.06,
    top: width * 0.01,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  message: {
    fontSize: width * 0.036,
    left: width * 0.05,
    flexShrink: 1,
    fontFamily: "Montserrat-Regular",
    color: "#000",
  },
  dateTime: {
    alignItems: "flex-end",
    marginRight: width * 0.05,
    bottom: width * 0.01,
  },
  date: {
    fontSize: width * 0.025,
    color: "#666",
    fontFamily: "Montserrat-SemiBold",
  },
  time: {
    fontSize: width * 0.025,
    color: "#666",
    fontFamily: "Montserrat-SemiBold",
  },
});
