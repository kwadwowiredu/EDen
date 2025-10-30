import { AntDesign, FontAwesome5, Ionicons, } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from 'react-native-modal';
import OTPTextInput from 'react-native-otp-textinput';
import TopNotification from '../components/TopNotification';
import { Colors } from "../constants/Colors";
import { useBuilding } from "../contexts/BuildingContext";
import { useLocks } from "../contexts/LocksContext";
import { useUser } from "../contexts/UserContext";



const { width, height } = Dimensions.get("window");

const CORRECT_PIN = "1234";

const LockControl = () => {
  const [isModalVisible1, setModalVisible1] = useState(false)
  const existingPassword = 'mypassword123';

  const { state: buildingState } = useBuilding();
  const buildingId = buildingState.current?.id ?? "buildingA"; // fallback if none
  const { user } = useUser();
  const { toggleLock, setLockStatus } = useLocks();

    const toggleLockLocal = () => {
  // update local UI first if you want
  setIsLocked(prev => !prev);

  // update shared state + history
  // note: params.id is the lock id passed via router params (keep using it)
  const lockId = (params?.id as string) || "lock_main";
  const username = user.username || "Unknown";

  toggleLock(buildingId, lockId, username);
};




    const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      showNotification('New PINs do not match.');
      return;
    }
    if (newPassword.length < 4) {
      showNotification('New PIN must be at least 4 characters.');
      
      return;
    }
    closeModal();
    showNotification('Your PIN has been changed successfully!');
    
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
  };

  const openModal = () => {
    setModalVisible(false);
    setModalVisible1(true); 

  };

  const closeModal = () => {
    setModalVisible1(false); 
  };

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


  

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

  const showNotification = (msg: string, autoHide = true) => {
    setNotifMessage(msg);
    setNotifVisible(true);
    if (!autoHide) {}
  };

  useEffect(() => {
    setModalVisible(true);
  }, []);

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
          onPress={toggleLockLocal}
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
          onPress={openModal}
        >
          <AntDesign name="edit" size={18} color={Colors.light.primary} />

          <Text style={styles.editBtnText}>Edit Lock</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={ModalVisible} style={styles.bottomModal}
      avoidKeyboard={true}
      useNativeDriver={true}
      >
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
      <Modal
        style={styles.bottomModal}
        isVisible={isModalVisible1}
        onBackdropPress={closeModal}
        swipeDirection={['down']}
        onSwipeComplete={closeModal}
        avoidKeyboard={true}
        useNativeDriver={true}
        onBackButtonPress={closeModal}
      >
          <View style={styles.modalContent}>
          {/* <View style={styles.handle}/> */}
          <View style={{top: width * 0.08,}}>
            <View style={{bottom: width * 0.01}}>
          <TouchableOpacity
          onPress={closeModal}>
           <Ionicons name='arrow-back' size={28}
            style={{ top: width * 0.023, left: width * 0.04, }}
            resizeMode="contain"
           />
           </TouchableOpacity>
           <Text style={styles.forgettext1}>Edit Lock</Text>
           </View>
            
                  <View style={styles.inputContainer}>
                      <TextInput 
                          value={oldPassword} 
                          onChangeText={setOldPassword}
                          placeholder="Main Door"
                          placeholderTextColor='#595C5E'
                          style={styles.input}
                      />
                      </View>
                      <View style={styles.inputContainer}>
                       {/* <Feather name="mail" size={20} color="#888" style={styles.icon1} /> */}
                      <TextInput 
                          value={newPassword} 
                          onChangeText={setNewPassword}
                          placeholder="Enter New PIN"
                          placeholderTextColor='#595C5E'
                          maxLength={4} 
                          secureTextEntry={!showNew}
                          keyboardType='number-pad'
                          style={styles.input}
                      />
                      <TouchableOpacity onPress={() => setShowNew(!showNew)} style={{position: "absolute", right: width * 0.08, top: width * 0.05,}}>
                        <Ionicons name={showNew ? 'eye' : 'eye-off'} size={20} color="#888" />
                      </TouchableOpacity>
                      </View>
                      <View style={styles.inputContainer}>
                       {/* <Feather name="phone" size={20} color="#888" style={styles.icon1} /> */}
                      <TextInput 
                          value={confirmPassword} 
                          onChangeText={setConfirmPassword}
                          placeholder="Confirm New PIN"
                          maxLength={4}
                          secureTextEntry={!showConfirm}
                          placeholderTextColor='#595C5E'
                          keyboardType='number-pad'
                          style={styles.input}
                      />
                      <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={{position: "absolute", right: width * 0.08, top: width * 0.05,}}>
                        <Ionicons name={showConfirm ? 'eye' : 'eye-off'} size={20} color="#888" />
                      </TouchableOpacity>
                      </View>
                                    <TouchableOpacity onPress={handleChangePassword}>
                                        <Text style={styles.button}>
                                            Save
                                            </Text>
                                    </TouchableOpacity> 
                    </View>                              
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
    top: width * 0.18,
    left: width * 0.05,
    right: width * 0.05,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  headerBackBtn: {
    alignItems: "center",
    justifyContent: "center",
    left: width * 0.02,
  },
  headerTitle: {
    flex: 1,
    textAlign: "left",
    fontSize: width * 0.055,
    fontFamily: "Montserrat-Bold",
    color: "black",
    paddingHorizontal: 8,
    left: width * 0.02,
  },
  statusPill: {
    minWidth: SIDE_BTN_SIZE,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    right: width * 0.05,
  },
  statusPillText: {
    color: "#fff",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 12,
  },

  // Main lock UI
  statusText: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
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
    fontFamily: 'Montserrat-SemiBold',
    color: "#555",
  },

  editBtn: {
    marginTop: 24,
    flexDirection: 'row',
    gap: width * 0.01,
    paddingVertical: 12,
    paddingHorizontal: width * 0.24,
    top: width * 0.35,
  },
  editBtnText: {
    color: Colors.light.primary,
    fontFamily: "Montserrat-Italic",
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: 'underline',
  },

  modalCard: {
    backgroundColor: "#fffefeff",
    paddingVertical: width * 0.17,
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

  modalBackBtn: {
    position: "absolute",
    top: width * 0.05,
    left: width * 0.02,
    padding: 6,
    borderRadius: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: width * 0.001,
    paddingHorizontal: 24,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    paddingBottom: width * 0.13,
  },
  forgettext1:{
    fontSize: width * 0.05,
    fontFamily: 'Montserrat-Bold',
    bottom: width * 0.05,

    marginBottom: 0,
    textAlign: 'center',
  },
  inputContainer: {

  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.primary,
    padding: width * 0.03,
    borderRadius: 15,
    fontSize: width * 0.045, 
    marginBottom: height * 0.032, 
    justifyContent: 'center',
    paddingHorizontal: width * 0.04, 
    marginHorizontal: width * 0.02, 
    marginVertical: height * 0.005, 
    fontFamily: 'Montserrat-Regular',
    paddingLeft: width * 0.05,
  },
  button:{
    backgroundColor: Colors.light.primary,
    top: width * 0.028,
    color: '#fff',
    textAlign: 'center',
    paddingVertical: height * 0.01,
    borderRadius: 15,
    fontSize: width * 0.055, 
    marginHorizontal: width * 0.001, 
    marginVertical: height * 0.01, 
    fontFamily: 'Montserrat-SemiBold',
  },
});
