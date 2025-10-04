import React, { createContext, useContext, useEffect, useState } from "react";
import { useBuilding } from "./BuildingContext";

type Notification = {
  id: number;
  message: string;
  read: boolean;
};

type NotificationContextType = {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  markAllAsRead: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Dummy notifications per building
const dummyNotifications: Record<string, Notification[]> = {
  buildingA: [
    { id: 1, message: "Front gate unlocked by Ama", read: false },
    { id: 2, message: "System maintenance scheduled for 6PM", read: false },
    { id: 3, message: "Visitor request pending approval", read: true },
  ],
  buildingB: [
    { id: 1, message: "Fire alarm tested successfully", read: true },
    { id: 2, message: "Main door locked by Kofi", read: false },
    { id: 3, message: "Power outage alert in Block B", read: false },
  ],
};

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { state } = useBuilding();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!state.current) {
      console.log("⏳ Waiting for building to load...");
      return;
    }

    const buildingId = state.current.id;
    console.log("📦 Loading notifications for:", buildingId);

    if (dummyNotifications[buildingId]) {
      console.log("✅ Notifications found for", buildingId);
      setNotifications(dummyNotifications[buildingId]);
    } else {
      console.log("⚠️ No notifications found for", buildingId);
      setNotifications([]);
    }
  }, [state.current?.id]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
}
