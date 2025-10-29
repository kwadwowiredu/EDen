// contexts/LocksContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Lock = { id: string; name: string; status: "locked" | "unlocked" };
export type HistoryEntry = {
  id: string; // unique id for list rendering
  user: string;
  action: "locked" | "unlocked";
  door: string;
  date: string; // e.g. "2025-10-09"
  time: string; // e.g. "10:23am"
};

type BuildingData = {
  locks: Lock[];
  history: HistoryEntry[];
};

type LocksState = Record<string, BuildingData>; // keyed by buildingId

type LocksCtx = {
  locksState: LocksState;
  getLocksForBuilding: (buildingId?: string) => Lock[];
  getHistoryForBuilding: (buildingId?: string) => HistoryEntry[];
  setLockStatus: (buildingId: string, lockId: string, status: "locked" | "unlocked") => void;
  toggleLock: (buildingId: string, lockId: string, user: string) => void;
  addHistory: (buildingId: string, entry: Omit<HistoryEntry, "id">) => void;
  replaceBuildingData: (buildingId: string, data: BuildingData) => void;
};

const LocksContext = createContext<LocksCtx | undefined>(undefined);

// small helper to format date/time
const formatDateTime = (d = new Date()) => {
  const date = d.toLocaleDateString(); // you can adjust formatting
  const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return { date, time };
};

const STORAGE_KEY = "locks_state_v1";

const initialExampleState: LocksState = {
  // example initial data (optional)
  buildingA: {
    locks: [
      { id: "lock_main", name: "Main Door", status: "locked" },
      { id: "lock_kitchen", name: "Kitchen Door", status: "unlocked" },
    ],
    history: [],
  },
  buildingB: {
    locks: [{ id: "lock_garage", name: "Garage Door", status: "locked" }],
    history: [],
  },
};

export const LocksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locksState, setLocksState] = useState<LocksState>(initialExampleState);

  // load from AsyncStorage (optional)
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setLocksState(JSON.parse(raw));
        }
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  // persist
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(locksState));
      } catch (e) {}
    })();
  }, [locksState]);

  const replaceBuildingData = (buildingId: string, data: BuildingData) => {
    setLocksState((prev) => ({ ...prev, [buildingId]: data }));
  };

  const getLocksForBuilding = (buildingId?: string) => {
    if (!buildingId) return [];
    return locksState[buildingId]?.locks ?? [];
  };

  const getHistoryForBuilding = (buildingId?: string) => {
    if (!buildingId) return [];
    return locksState[buildingId]?.history ?? [];
  };

  const setLockStatus = (buildingId: string, lockId: string, status: "locked" | "unlocked") => {
    setLocksState((prev) => {
      const building = prev[buildingId] ?? { locks: [], history: [] };
      const locks = building.locks.map((l) => (l.id === lockId ? { ...l, status } : l));
      return { ...prev, [buildingId]: { ...building, locks } };
    });
  };

  const addHistory = (buildingId: string, entry: Omit<HistoryEntry, "id">) => {
    setLocksState((prev) => {
      const building = prev[buildingId] ?? { locks: [], history: [] };
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const history = [{ id, ...entry }, ...building.history];
      return { ...prev, [buildingId]: { ...building, history } };
    });
  };

  const toggleLock = (buildingId: string, lockId: string, user: string) => {
    setLocksState((prev) => {
      const building = prev[buildingId] ?? { locks: [], history: [] };
      const locks = building.locks.map((l) => {
        if (l.id !== lockId) return l;
        const newStatus: "locked" | "unlocked" = l.status === "locked" ? "unlocked" : "locked";
        return { ...l, status: newStatus };
      });

      // find the lock name
      const changedLock = building.locks.find((l) => l.id === lockId) ?? { name: lockId };

      const { date, time } = formatDateTime();
      const action = (building.locks.find((l) => l.id === lockId)?.status === "locked") ? "unlocked" : "locked";
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

      const historyItem: HistoryEntry = {
        id,
        user,
        action: action as "locked" | "unlocked",
        door: changedLock.name,
        date,
        time,
      };

      const history = [historyItem, ...building.history];

      return { ...prev, [buildingId]: { ...building, locks, history } };
    });
  };
  

  return (
    <LocksContext.Provider
      value={{
        locksState,
        getLocksForBuilding,
        getHistoryForBuilding,
        setLockStatus,
        toggleLock,
        addHistory,
        replaceBuildingData,
      }}
    >
      {children}
    </LocksContext.Provider>
  );
};

export const useLocks = (): LocksCtx => {
  const ctx = useContext(LocksContext);
  if (!ctx) throw new Error("useLocks must be used inside LocksProvider");
  return ctx;
};
