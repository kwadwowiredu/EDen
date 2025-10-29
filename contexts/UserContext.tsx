// contexts/UserContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  username: string;
  email?: string;
  phone?: string;
};

type UserCtx = {
  user: User;
  setUser: (patch: Partial<User>) => void;
  replaceUser: (u: User) => void;
};

const initialUser: User = { username: "Ama", email: "ama@example.com", phone: "" };

const UserContext = createContext<UserCtx | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User>(initialUser);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem("user_profile");
        if (raw) setUserState(JSON.parse(raw));
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem("user_profile", JSON.stringify(user));
      } catch (e) {}
    })();
  }, [user]);

  const setUser = (patch: Partial<User>) => setUserState(prev => ({ ...prev, ...patch }));
  const replaceUser = (u: User) => setUserState(u);

  return (
    <UserContext.Provider value={{ user, setUser, replaceUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserCtx => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside a UserProvider");
  return ctx;
};
