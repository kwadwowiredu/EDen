// /src/contexts/BuildingContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Alert } from "react-native";

/** Types */
export type Building = { id: string; name: string; address?: string } | null;
type State = {
  current: Building;
  loading: boolean;
  error?: string | null;
};
type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_BUILDING"; payload: Building }
  | { type: "SET_ERROR"; payload?: string | null };

const initialState: State = { current: null, loading: false, error: null };

/** Reducer */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload, error: null };
    case "SET_BUILDING":
      return { ...state, current: action.payload, loading: false, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

/** Fake API - replace with real call */
const api = {
  // Simulates server switching. Replace with fetch()/axios call.
  switchBuilding: async (buildingId: string) => {
    // simulate network latency & random failure
    await new Promise((r) => setTimeout(r, 800));
    if (Math.random() < 0.15) throw new Error("Server rejected change");
    return { ok: true };
  },
};

type ContextValue = {
  state: State;
  changeBuilding: (b: Exclude<Building, null>) => Promise<void>;
  reloadFromStorage: () => Promise<void>;
};

const BuildingContext = createContext<ContextValue | undefined>(undefined);
console.log("Loading BuildingContext module");

export const BuildingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log("Mounting BuildingProvider");
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load persisted current building on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem("currentBuilding");
        if (raw) {
          dispatch({ type: "SET_BUILDING", payload: JSON.parse(raw) });
        }
      } catch (e) {
        console.warn("Failed reading building from storage", e);
      }
    })();
  }, []);

  const reloadFromStorage = async () => {
    try {
      const raw = await AsyncStorage.getItem("currentBuilding");
      dispatch({ type: "SET_BUILDING", payload: raw ? JSON.parse(raw) : null });
    } catch (e) {
      console.warn(e);
    }
  };

  // Change building with optimistic update + rollback on error
  const changeBuilding = async (newBuilding: Exclude<Building, null>) => {
    const prev = state.current;
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      // Optimistically set instantly
      dispatch({ type: "SET_BUILDING", payload: newBuilding });
      // Persist immediately so app restarts reflect it
      await AsyncStorage.setItem("currentBuilding", JSON.stringify(newBuilding));

      // Call backend
      await api.switchBuilding(newBuilding.id);

      // On success: keep it, optionally trigger re-fetches from other providers/screens
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (err: any) {
      // rollback
      dispatch({ type: "SET_BUILDING", payload: prev ?? null });
      await AsyncStorage.setItem("currentBuilding", JSON.stringify(prev ?? null));
      dispatch({ type: "SET_ERROR", payload: err?.message ?? "Switch failed" });
      Alert.alert("Could not switch building", err?.message ?? "Please try again.");
    }
  };

  return (
    <BuildingContext.Provider value={{ state, changeBuilding, reloadFromStorage }}>
      {children}
    </BuildingContext.Provider>
  );
};

export const useBuilding = () => {
  const ctx = useContext(BuildingContext);
  if (!ctx) throw new Error("useBuilding must be used inside BuildingProvider");
  return ctx;
};
