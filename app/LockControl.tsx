import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert,} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import OTPTextInput from 'react-native-otp-textinput';
import { Colors } from "../constants/Colors";
import Modal from 'react-native-modal';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get("window");

const CORRECT_PIN = "1234"; 

// const EnterLock = () => {
//   const [pin, setPin] = useState("");

//   const handleSubmit = () => {
//     if (pin === CORRECT_PIN) {
//       router.replace("/LockControl"); 
//     } else {
//       Alert.alert("Error", "Incorrect PIN, try again!");
//       setPin("");
//     }
//   };


const LockControl = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(true);
  }, []);

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

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
      Alert.alert("Error", "Incorrect PIN, try again!");
      setPin("");
    }
  };

  return (
    <>
    {/* <View style={styles.overlay}> */}
      {/* Modal Card */}
      
    {/* </View> */}
    <View style={styles.container}>

      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <FontAwesome5 name="arrow-left" size={20} color="#000" />
      </TouchableOpacity>

      {/* Big Lock Button */}
      <TouchableOpacity
        style={[
          styles.lockButton,
          { backgroundColor: "#fff" }, // blue when locked, green when unlocked
        ]}
        onPress={toggleLock}
      >
        <FontAwesome5
          name={isLocked ? "lock" : "lock-open"}
          size={80}
          color="#181F70"
        />
        <Text style={styles.statusText}>{isLocked ? "Locked" : "Unlocked"}</Text>
        
      </TouchableOpacity>

      {/* Small Text Below Button */}
      <Text style={styles.tapText}>
        Tap to {isLocked ? "Unlock" : "Lock"}
      </Text>
    </View>
    <Modal isVisible={ModalVisible}
    style={styles.bottomModal}>
    <View style={styles.modalCard}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <FontAwesome5 name="arrow-left" size={24} color="#000" />
         </TouchableOpacity>
        <Text style={styles.title}>Enter Lock Pin</Text>

        {/* OTP Box Input */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  backBtn: {
    position: "absolute",
    top: width * 0.05,
    left: width * 0.05,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
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
//  overlay: {
//   justifyContent: 'center',
//   alignItems: 'center',
//   flex: 1,
//   paddingBottom: 2,
//   },
  modalCard: {
    backgroundColor: "#fffefeff",
    // bottom: width * 0.005,
    paddingVertical: width * 0.57,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
    // bottom: width * 0.058,


  },
  // backBtn: {
  //   alignSelf: "flex-start",
  //   marginBottom: 10,
  // },
  title: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 20,
    bottom: width * 0.5,
    fontFamily: 'Montserrat-ExtraBold', 
  },
  otpContainer: { 
    justifyContent: "center", 
    bottom: width * 0.4,  
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
    bottom: width *0.36,
  },
  bottomModal:{
    justifyContent: 'flex-end',
    margin: 0,
  },
  enterText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
