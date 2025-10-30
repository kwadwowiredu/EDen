import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import HistoryCard from "../../components/historyCard";
import { useBuilding } from "../../contexts/BuildingContext";
import { useLocks } from "../../contexts/LocksContext";

const { width, height } = Dimensions.get('window');

// (keep your dummyBuildings and fetchDataForBuilding if you still want that fallback)
const dummyBuildings: Record<
  string,
  {
    home: { temperature: number; status: string };
    history: { id: number; user: string; action: "locked" | "unlocked"; door: string; date: string; time: string }[];
    notifications: { id: number; message: string; date: string }[];
  }
> = {
  buildingA: {
    home: { temperature: 24, status: "All systems normal" },
    history: [
      { id: 1, user: "Ama", action: "unlocked", door: "Main Door", date: "09/12/23", time: "09:12am" },
      { id: 2, user: "Kofi", action: "locked", door: "Kitchen Door", date: "19/11/23", time: "10:20pm" },
    ],
    notifications: [
      { id: 1, message: "Front door left open", date: "2025-09-12" },
      { id: 2, message: "System update available", date: "2025-09-11" },
    ],
  },
  buildingB: {
    home: { temperature: 28, status: "Security alert: window open" },
    history: [
      { id: 1, user: "Yaw", action: "locked", door: "Garage Door", date: "15/09/23", time: "08:45pm" },
      { id: 2, user: "Esi", action: "unlocked", door: "Back Door", date: "14/09/23", time: "07:10am" },
    ],
    notifications: [
      { id: 1, message: "Power restored", date: "2025-09-10" },
      { id: 2, message: "New user access granted", date: "2025-09-09" },
    ],
  },
};

async function fetchDataForBuilding(buildingId: string) {
  await new Promise((resolve) => setTimeout(resolve, 500)); // simulate delay
  return dummyBuildings[buildingId] ?? null;
}

export default function Explore() {
  const { state } = useBuilding();
  const { getHistoryForBuilding } = useLocks();

  const buildingId = state.current?.id;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // get history from context (returns [] if no buildingId or no history)
  const contextHistory = getHistoryForBuilding(buildingId);

  useEffect(() => {
    const id = state.current?.id;
    if (!id) {
      setData(null);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      const result = await fetchDataForBuilding(id);
      if (!cancelled) setData(result);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [state.current]);

  // finalHistory: prefer context history when present, otherwise fall back to fetched data
  const finalHistory = (contextHistory && contextHistory.length > 0)
    ? contextHistory
    : (data?.history ?? []);

  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => router.back()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityLabel="Go back"
        activeOpacity={0.7}
      >
        <Image
          source={require('../../assets/images/EDen/Arrow.png')}
          style={{ width: 22, height: 22, left: width * 0.03 }}
        />
      </TouchableOpacity>

      <Text style={styles.forgettext}>History</Text>

      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading...</Text>
      ) : (
        finalHistory.map((n: any) => (
          <HistoryCard
            key={n.id}
            user={n.user}
            action={n.action}
            door={n.door}
            date={n.date}
            time={n.time}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    right: width * 0.4,
    marginBottom: height * 0.04,
    paddingTop: height * 0.02,
    top: width * 0.1,
  },
  forgettext: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    bottom: width * 0.05,
    left: width * 0.25,
    marginBottom: 0,
    marginLeft: width * 0.13,
  },
});
