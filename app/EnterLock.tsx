// import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Alert } from 'react-native'
// import React, { useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { FontAwesome5 } from '@expo/vector-icons';
// import OTPTextInput from 'react-native-otp-textinput';
// import { router } from 'expo-router';


// const { width, height } = Dimensions.get("window");

// const CORRECT_PIN = "1234"; 

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

//   return (
//     <View style={styles.overlay}>
//       {/* Modal Card */}
//       <View style={styles.modalCard}>
//         <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
//           <FontAwesome5 name="arrow-left" size={20} color="#000" />
//         </TouchableOpacity>

//         <Text style={styles.title}>Enter Lock Pin</Text>

//         {/* OTP Box Input */}
//         <OTPTextInput
//           inputCount={4}
//           handleTextChange={(val) => setPin(val)}
//           containerStyle={styles.otpContainer}
//           textInputStyle={styles.otpBox}
//           keyboardType="numeric"
//         />

//         <TouchableOpacity style={styles.enterBtn} onPress={handleSubmit}>
//           <Text style={styles.enterText}>Enter</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default EnterLock;

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "gray", // dimmed background
//     justifyContent: "flex-end", // push modal to bottom
//   },
//   modalCard: {
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     height: height * 0.7,
//     alignItems: "center",
//   },
//   backBtn: {
//     alignSelf: "flex-start",
//     marginBottom: 10,
//   },
//   title: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
//   otpContainer: { justifyContent: "center" },
//   otpBox: {
//     borderWidth: 1,
//     borderRadius: 8,
//     width: 50,
//     height: 50,
//     textAlign: "center",
//     fontSize: 20,
//   },
//   enterBtn: {
//     marginTop: 20,
//     backgroundColor: "#181F70",
//     paddingVertical: 12,
//     paddingHorizontal: width * 0.25,
//     borderRadius: 8,
//   },
//   enterText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
// });