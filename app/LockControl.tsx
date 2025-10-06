import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from 'react-native-modal';
import OTPTextInput from 'react-native-otp-textinput';
import TopNotification from '../components/TopNotification';
import { Colors } from "../constants/Colors";


const { width, height } = Dimensions.get("window");

const CORRECT_PIN = "1234";

const LockControl = () => {
  // optional params from navigation (name/status)
  const params = useLocalSearchParams<{ id?: string; name?: string; status?: string }>();
  const initialName = (params?.name as string) || "Main Door";
  const initialLocked = useMemo(() => {
    if (!params?.status) return true;
    return String(params.status).toLowerCase() === "locked";
  }, [params?.status]);

  const [isLocked, setIsLocked] = useState<boolean>(initialLocked);
  const [ModalVisible, setModalVisible] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [notifMessage, setNotifMessage] = useState('');

  const showNotification = (msg: string, autoHide = true) => {
    setNotifMessage(msg);
    setNotifVisible(true);
    if (!autoHide) {}
  };

  useEffect(() => {
    setModalVisible(true);
  }, []);

  const toggleLock = () => setIsLocked(prev => !prev);

  const [fontsLoaded] = useFonts({
    'Montserrat-Black': require('../assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-ExtraBold' : require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    'InterSemi-Bold': require('../assets/fonts/Inter-SemiBold.otf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Italic': require('../assets/fonts/Montserrat-Italic.ttf'),
  });
  if (!fontsLoaded) return null;

  const [pin, setPin] = useState("");

  const handleSubmit = () => {
    if (pin === CORRECT_PIN) {
      setModalVisible(false);
    } else {
      showNotification("Incorrect PIN, Try Again!");
      setPin("");
    }
  };

  const statusLabel = isLocked ? "Locked" : "Unlocked";
  const statusBg = isLocked ? "#22c55e" : "#ef4444";

  return (
    <>
      <TopNotification
        message={notifMessage}
        visible={notifVisible}
        onHide={() => setNotifVisible(false)}
        duration={3000}
      />

      <View style={styles.container}>
        {/* Header Row: back | title | status */}
        <View style={styles.headerBar}>
          {/* Left: Back */}
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBackBtn}>
            <FontAwesome5 name="arrow-left" size={20} color="#000" />
          </TouchableOpacity>

          {/* Center: Title */}
          <Text numberOfLines={1} style={styles.headerTitle}>
            {initialName}
          </Text>

          {/* Right: Status pill */}
          <View style={[styles.statusPill, { backgroundColor: statusBg }]}>
            <Text style={styles.statusPillText}>{statusLabel}</Text>
          </View>
        </View>

        {/* Big Lock Button */}
        <TouchableOpacity
          style={[styles.lockButton, { backgroundColor: "#fff" }]}
          onPress={toggleLock}
        >
          <FontAwesome5
            name={isLocked ? "lock" : "lock-open"}
            size={80}
            color="#181F70"
          />
          <Text style={styles.statusText}>{statusLabel}</Text>
        </TouchableOpacity>

        {/* Small Text Below Button */}
        <Text style={styles.tapText}>
          Tap to {isLocked ? "Unlock" : "Lock"}
        </Text>

        {/* Edit Lock button */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => {
            // router.push({ pathname: "/EditLock", params: { id: params?.id, name: initialName } });
            showNotification("Edit Lock is under construction 🔧");
          }}
        >
          <Text style={styles.editBtnText}>Edit Lock</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={ModalVisible} style={styles.bottomModal}>
        <View style={styles.modalCard}>
          {/* Modal back control (image arrow) */}
          <TouchableOpacity onPress={() => router.back()} style={styles.modalBackBtn}>
            <Image
              source={require('../assets/images/EDen/Arrow.png')}
              style={{ width: width * 0.06, height: width * 0.06, left: width * 0.05 }}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Enter PIN for {initialName}</Text>

          <OTPTextInput
            inputCount={4}
            handleTextChange={(val) => setPin(val)}
            containerStyle={styles.otpContainer}
            textInputStyle={styles.otpBox}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.enterBtn} onPress={handleSubmit}>
            <Text style={styles.enterText}>Enter</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default LockControl;

const SIDE_BTN_SIZE = 44; // keeps back + pill symmetric around centered title

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  // Header row
  headerBar: {
    position: "absolute",
    top: width * 0.13,
    left: width * 0.05,
    right: width * 0.05,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  headerBackBtn: {
    width: SIDE_BTN_SIZE,
    height: SIDE_BTN_SIZE,
    borderRadius: SIDE_BTN_SIZE / 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "#181F70",
    paddingHorizontal: 8,
  },
  statusPill: {
    minWidth: SIDE_BTN_SIZE,            // balances with back button width
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  statusPillText: {
    color: "#fff",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 12,
  },

  // Main lock UI
  statusText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#181F70",
  },
  lockButton: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginBottom: 20,
  },
  tapText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },

  // Edit button
  editBtn: {
    marginTop: 24,
    borderWidth: 1.5,
    borderColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: width * 0.24,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  editBtnText: {
    color: Colors.light.primary,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    textAlign: "center",
  },

  // Modal
  modalCard: {
    backgroundColor: "#fffefeff",
    paddingVertical: width * 0.8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    bottom: width * 0.095,
    fontFamily: 'Montserrat-Bold',
  },
  otpContainer: {
    justifyContent: "center",
  },
  otpBox: {
    borderWidth: 1,
    borderRadius: 8,
    width: 50,
    height: 60,
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: width * 0.04,
    borderColor: Colors.light.primary,
  },
  enterBtn: {
    marginTop: 20,
    backgroundColor: "#181F70",
    paddingVertical: 12,
    paddingHorizontal: width * 0.35,
    borderRadius: 12,
  },
  bottomModal:{
    justifyContent: 'flex-end',
    margin: 0,
  },
  enterText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  // Modal-only back control
  modalBackBtn: {
    position: "absolute",
    top: width * 0.05,
    left: width * 0.02,
    padding: 6,
    borderRadius: 24,
  },
});
