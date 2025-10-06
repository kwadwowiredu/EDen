// app/(whatever)/settings.tsx
import { AntDesign, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    BackHandler,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Modal from 'react-native-modal';
import TopNotification from '../../components/TopNotification';
import { Colors } from "../../constants/Colors";
import { useBuilding } from "../../contexts/BuildingContext";



const { width, height } = Dimensions.get('window');

export default function Settings() {

const [linkedAccounts, setLinkedAccounts] = useState([
  { id: 1, username: "Ama", email: "ama@example.com", isActive: true },
]);


  const [notifVisible, setNotifVisible] = useState(false);
  const [notifMessage, setNotifMessage] = useState('');

  const showNotification = (msg: string, autoHide = true) => {
    setNotifMessage(msg);
    setNotifVisible(true);
    if (!autoHide) {

    }
  };

  const { state, changeBuilding } = useBuilding();


  // TODO: replace these with real user data (from context / props / API)
  const [username, setUsername] = useState('Ama');
  const [email, setEmail] = useState('ama@example.com');
  const [phonennumber, setphonennumber] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const existingPassword = 'mypassword123';


  // first letter (uppercased) for avatar
  const initial = username?.trim()?.charAt(0)?.toUpperCase() ?? '?';
  
  const [isModalVisible, setModalVisible] = useState(false)
  const [isModalVisible1, setModalVisible1] = useState(false)
  const [isModalVisible2, setModalVisible2] = useState(false)
  const [isModalVisible3, setModalVisible3] = useState(false)

  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newphonennumber, setNewphonennumber] = useState('');

  const handleChangePassword = () => {
    if (oldPassword !== existingPassword) {
      showNotification('Old password is incorrect.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showNotification('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      showNotification('New password must be at least 6 characters.');
      return;
    }
    showNotification('Your password has been changed successfully!');
    
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

    const handleSave = () => {
  if (!newEmail.trim() || !newUsername.trim() || !newphonennumber.trim()) {
    showNotification("All fields must be filled before saving.");
    return; // stop the function here
  }

  // Proceed only if all fields are filled
  setEmail(newEmail);
  setUsername(newUsername);
  setphonennumber(newphonennumber);
  closeModal();

    // Later
    // 1. send verification to newEmail
    // 2. only update email after verification success
    // router.push("/verify-email") // <--- for later
  };

  const [modalContent, setModalContent] = useState<string | null>(null);

  const openModal = (contentType: string) => {
    setModalVisible(true); 
    setModalContent(contentType);
  };
  const openModal1 = () => {
    setModalVisible1(true); 
  };
  const closeModal1 = () => {
    setModalVisible1(false)
  };
  const openModal2 = () => {
    setModalVisible2(true); 
  };
  const closeModal2 = () => {
    setModalVisible2(false)
  };
  const openModal3 = () => {
    setModalVisible3(true); 
  };
  const closeModal3 = () => {
    setModalVisible3(false)
  };

  const closeModal = () => {
    setModalVisible(false)
    setModalContent(null);
  };

   const renderModalContent = () => {
    switch (modalContent) {
      case "profile":
        return (
          <>
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
           <Text style={[styles.forgettext1, {left: width * 0.25}]}>Edit Profile</Text>
           </View>

                  <View style={styles.inputContainer}>
                       {/* <AntDesign name="user" size={20} color="#888" style={styles.icon1} /> */}
                      <TextInput 
                          value={newUsername} 
                          onChangeText={setNewUsername}
                          placeholder="Username"
                          placeholderTextColor='#595C5E'
                          keyboardType='default'
                          style={styles.input}
                      />
                      </View>
                      <View style={styles.inputContainer}>
                       {/* <Feather name="mail" size={20} color="#888" style={styles.icon1} /> */}
                      <TextInput 
                          value={newEmail} 
                          onChangeText={setNewEmail}
                          placeholder="Email"
                          placeholderTextColor='#595C5E'
                          keyboardType='email-address'
                          style={styles.input}
                      />
                      </View>
                      <View style={styles.inputContainer}>
                       {/* <Feather name="phone" size={20} color="#888" style={styles.icon1} /> */}
                      <TextInput 
                          value={newphonennumber} 
                          onChangeText={setNewphonennumber}
                          placeholder="Phone Number "
                          placeholderTextColor='#595C5E'
                          keyboardType='number-pad'
                          style={styles.input}
                      />
                      </View>
                                    <TouchableOpacity onPress={handleSave}>
                                        <Text style={styles.button}>
                                            <View style={{ right: width * 1 }}>
                                            <Image source={require('../../assets/images/EDen/Vector(1).png')} style={{ right: width * 0.035, top: width *0.006 }}/>
                                            </View>
                                            Save
                                            </Text>
                                    </TouchableOpacity> 
                    </View>                              
        </View>
          </>
        );
      case "change password":
        return (
          <>
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
           <Text style={styles.forgettext1}>Change Password</Text>
           </View>

                  <View style={styles.inputContainer}>
                       {/* <AntDesign name="user" size={20} color="#888" style={styles.icon1} /> */}
                      <TextInput 
                          value={oldPassword} 
                          onChangeText={setOldPassword}
                          placeholder="Enter Old Password"
                          placeholderTextColor='#595C5E'
                          secureTextEntry={!showOld}
                          style={styles.input}
                      />
                      <TouchableOpacity onPress={() => setShowOld(!showOld)} style={{position: "absolute", right: width * 0.08, top: width * 0.05,}}>
                        <Ionicons name={showOld ? 'eye' : 'eye-off'} size={20} color="#888" />
                      </TouchableOpacity>
                      </View>
                      <View style={styles.inputContainer}>
                       {/* <Feather name="mail" size={20} color="#888" style={styles.icon1} /> */}
                      <TextInput 
                          value={newPassword} 
                          onChangeText={setNewPassword}
                          placeholder="Enter New Password"
                          placeholderTextColor='#595C5E'
                          secureTextEntry={!showNew}
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
                          placeholder="Confirm New Password"
                          secureTextEntry={!showConfirm}
                          placeholderTextColor='#595C5E'
                          style={styles.input}
                      />
                      <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={{position: "absolute", right: width * 0.08, top: width * 0.05,}}>
                        <Ionicons name={showConfirm ? 'eye' : 'eye-off'} size={20} color="#888" />
                      </TouchableOpacity>
                      </View>
                                    <TouchableOpacity onPress={handleChangePassword}>
                                        <Text style={styles.button}>
                                            <View style={{ right: width * 1 }}>
                                            <Image source={require('../../assets/images/EDen/Vector(1).png')} style={{ right: width * 0.035, top: width *0.006 }}/>
                                            </View>
                                            Save
                                            </Text>
                                    </TouchableOpacity> 
                    </View>                              
        </View>
          </>
        );
      case "switch account":
        return (
          <View style={[styles.modalContent1, { height: height * 0.35 }]}>
      {linkedAccounts.length === 1 ? (
        <>
        <View style={{ flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={closeModal}>
           <Ionicons name='arrow-back' size={28}
            style={{ right: width * 0.14, bottom: width * 0.006 }}
            resizeMode="contain"
           />
           </TouchableOpacity>
          <Text style={[styles.headingModal, {fontFamily: 'Montserrat-Bold'}]}>Switch Account</Text>
          </View>
          <Text
            style={{
              fontFamily: "Montserrat-Regular",
              textAlign: "center",
              color: "#444",
              marginBottom: 20,
            }}
          >
            If you continue, you’ll be logged out of your current account.
          </Text>

          <TouchableOpacity
            style={styles.buildingButton}
            onPress={() => {
              closeModal();
              showNotification("Logging out...");
              // simulate logout, then redirect to login
              router.push("../authentication/Login");
            }}
          >
            <Text style={styles.buildingText}>Switch to Existing Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.addBuildingButton, { marginTop: 10 }]}
            onPress={() => {
              closeModal();
              showNotification("Logging out...");
              router.replace("../authentication/signup");
            }}
          >
            <Text style={styles.addBuildingText}>Create New Account</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.headingModal}>Select an Account</Text>
          {linkedAccounts.map((acc) => (
            <TouchableOpacity
              key={acc.id}
              style={[
                styles.buildingButton,
                acc.isActive && { backgroundColor: Colors.light.primary + "33" },
              ]}
              onPress={() => {
                showNotification(`Switched to ${acc.username}`);
                setLinkedAccounts((prev) =>
                  prev.map((a) => ({
                    ...a,
                    isActive: a.id === acc.id,
                  }))
                );
                closeModal();
              }}
            >
              <Text
                style={[
                  styles.buildingText,
                  acc.isActive && { color: Colors.light.primary },
                ]}
              >
                {acc.username} {acc.isActive && "(Current)"}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
        );
      default:
        return null;
    }
  };

    useEffect(() => {
    const backAction = () => {
      if (isModalVisible) {
        setModalVisible(false); // close modal
        return true;       // prevent default back action
      }
      return false;        // allow default behavior when modal is closed
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isModalVisible]);

  
  

  return (
    <>
    <TopNotification
            message={notifMessage}
            visible={notifVisible}
            onHide={() => setNotifVisible(false)}
            duration={3000}
          />
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {/* Back button */}
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

      {/* Screen title */}
      <Text style={styles.forgettext}>Settings</Text>

      {/* Avatar + user info */}
      <View style={styles.profileContainer}>
        <View style={styles.circle}>
          <Text style={styles.initial}>{initial}</Text>
        </View>

        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.settings}>
        <TouchableOpacity style={styles.set1} onPress={() => openModal("profile")}>
            <AntDesign name='user' size={20} style={styles.icon}/>
            <Text style={styles.title}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.set1} onPress={() => openModal("change password")}>
            <Ionicons name='key-outline' size={20} style={styles.icon}/>
            <Text style={styles.title}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.set1, {left: width * 0.01}]} onPress={openModal1}>
            <FontAwesome name='building-o' size={20} style={styles.icon}/>
            <Text style={styles.title}>My Buildings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.set1} onPress={() => openModal("switch account")}>
            <AntDesign name='user-switch' size={20} style={styles.icon}/>
            <Text style={styles.title}>Switch Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.set1}>
            <AntDesign name='question' size={20} style={styles.icon}/>
            <Text style={styles.title}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.set1, {left: width * 0.01}]} onPress={openModal2}>
            <FontAwesome name='trash-o' size={20} style={[styles.icon, ]}/>
            <Text style={styles.title}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.set1} onPress={openModal3}>
            <Feather name='log-out' size={20} style={[styles.icon, {left: width * 0.01}]}/>
            <Text style={styles.title}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }}  >
        <ScrollView   contentContainerStyle={{ flexGrow: 1 }}>
      <Modal
  style={styles.bottomModal}
  isVisible={isModalVisible}
  onBackdropPress={closeModal}
  swipeDirection={['down']}
  onSwipeComplete={closeModal}
  // avoidKeyboard={false}
  // useNativeDriver={true}
  onBackButtonPress={closeModal}
>
  <View style={styles.modalContent}>
    {renderModalContent()}
  </View>
</Modal>

      <Modal
  isVisible={isModalVisible1}
  onBackdropPress={closeModal1}
  swipeDirection={['down']}
  onSwipeComplete={closeModal1}
  avoidKeyboard={false}
  useNativeDriver={true}
  onBackButtonPress={closeModal1}
  style={styles.centerModal}
>
  <View style={[styles.modalContent1, { height: height * 0.35 }]}>
      <Text style={[styles.headingModal, { marginBottom: 10 }]}>Select Building</Text>

      <TouchableOpacity
        style={styles.buildingButton}
        onPress={async () => {
          await changeBuilding({ id: "buildingA", name: "Building A" });
          closeModal1();
        }}
      >
        <Text style={styles.buildingText}>🏢 Building A</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buildingButton}
        onPress={async () => {
          await changeBuilding({ id: "buildingB", name: "Building B" });
          closeModal1();
        }}
      >
        <Text style={styles.buildingText}>🏢 Building B</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.addBuildingButton, { marginTop: 15 }]}
        onPress={() => {
          closeModal1();
          showNotification("Still under construction, boss");
        }}
      >
        <Text style={styles.addBuildingText}>+ Add Building</Text>
      </TouchableOpacity>
    </View>
</Modal>

<Modal
  isVisible={isModalVisible2}
  onBackdropPress={closeModal2}
  swipeDirection={['down']}
  onSwipeComplete={closeModal2}
  avoidKeyboard={false}
  useNativeDriver={true}
  onBackButtonPress={closeModal2}
  style={styles.centerModal}
>
  <View style={[styles.modalContent2, { height: height * 0.25 }]}>
      <Text style={[styles.headingModal, { marginBottom: 10, fontFamily: 'Montserrat-Bold', fontSize: width * 0.06, }]}>Are you sure you want to delete this acccount?</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: width * 0.08,}}>
      <TouchableOpacity
        style={[styles.buildingButton1, {backgroundColor: 'red'}]} >
        <Text style={[styles.buildingText, {color: Colors.light.background}]}>Yes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buildingButton1, {backgroundColor: Colors.light.primary}]}
      >
        <Text style={[styles.buildingText, {color: Colors.light.background}]}>No</Text>
      </TouchableOpacity>
      </View>

    </View>
</Modal>

<Modal
  isVisible={isModalVisible3}
  onBackdropPress={closeModal3}
  swipeDirection={['down']}
  onSwipeComplete={closeModal3}
  avoidKeyboard={false}
  useNativeDriver={true}
  onBackButtonPress={closeModal3}
  style={styles.centerModal}
>
  <View style={[styles.modalContent2, { height: height * 0.25 }]}>
      <Text style={[styles.headingModal, { marginBottom: 10, fontFamily: 'Montserrat-Bold', fontSize: width * 0.06, }]}>Are you sure you want to logout?</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: width * 0.08,}}>
      <TouchableOpacity
        style={[styles.buildingButton1, {backgroundColor: 'red'}]} >
        <Text style={[styles.buildingText, {color: Colors.light.background}]}>Yes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buildingButton1, {backgroundColor: Colors.light.primary}]}
      >
        <Text style={[styles.buildingText, {color: Colors.light.background}]}>No</Text>
      </TouchableOpacity>
      </View>

    </View>
</Modal>

      </ScrollView>
      </KeyboardAvoidingView>
    </ScrollView>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    top: width * 0.05,
  },
  logoContainer: {
    alignItems: 'center',
    right: width * 0.4,
    marginBottom: height * 0.02,
    paddingTop: height * 0.02,
    top: width * 0.06,
  },
  forgettext:{
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    bottom: width * 0.05,
    left: width * 0.16,
    marginBottom: 0,
    marginLeft: width * 0.23,
    },
  profileContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },

  circle: {
    backgroundColor: '#979EF6',
    width: width * 0.65,
    height: width * 0.65,
    borderRadius: (width * 0.65) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  initial: {
    color: '#fff',
    fontSize: width * 0.25, // large letter
    fontFamily: 'Montserrat-Bold',
  },

  username: {
    marginTop: 14,
    fontSize: width * 0.08,
    fontFamily: 'Montserrat-Bold',
    color: '#111',
  },

  email: {
    marginTop: 6,
    fontSize: width * 0.039,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
    bottom: width * 0.045,
  },
  settings: {
    bottom: width * 0.03,
  },
  icon: {
    marginLeft: width * 0.1,
  },
  set1: {
    flexDirection: 'row',
    marginBottom: width * 0.042,
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    fontSize: width * 0.043,
    marginLeft: width * 0.025,

  },
  centeredModal1: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 1,
    paddingHorizontal: 24,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    paddingBottom: width * 0.08,
  },
  handle: {
    width: 300,
    height: 0.8,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
    top: width * 0.07,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  forgettext1:{
    fontSize: width * 0.05,
    fontFamily: 'Montserrat-Bold',
    bottom: width * 0.05,
    left: width * 0.16,
    marginBottom: 0,
    textAlign: 'left',
  },
  inputContainer: {

  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.primary,
    padding: width * 0.03,
    borderRadius: 8,
    fontSize: width * 0.045, 
    marginBottom: height * 0.032, 
    justifyContent: 'center',
    paddingHorizontal: width * 0.04, 
    marginHorizontal: width * 0.02, 
    marginVertical: height * 0.005, 
    fontFamily: 'Montserrat-Regular',
    paddingLeft: width * 0.05,
  },
  icon1: {
    top: width * 0.1,
    left: width * 0.07,
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
  modalContent1: {
    width: width * 0.8,
    height: height * 0.2,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headingModal: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18, 
    fontWeight: '600',
    textAlign: 'center', 
    marginBottom: 24,
  },
  headingModal1: {
    fontSize: 18, 
    fontWeight: '600',
    textAlign: 'center', 
    marginBottom: 24,
    top: width * -0.05,
    alignItems: 'center',
  },
  backHomeBtn: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 10,
    paddingHorizontal: 58,
    borderRadius: 14,
    top: width * -0.05,
  },
  backHomeText: {
    fontFamily: 'Inter-Medium',
    color: '#fff', 
    fontSize: 14, 
    fontWeight: '600' 
  },
  centerModal: {
  justifyContent: 'center',
  alignItems: 'center',
  margin: 0,
},
buildingButton: {
  backgroundColor: "#f3f3f3",
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 10,
  width: "100%",
  alignItems: "center",
  marginVertical: 6,
},

buildingText: {
  fontSize: 16,
  fontFamily: "Montserrat-SemiBold",
  color: "#333",
  bottom: width * 0.002,
},

addBuildingButton: {
  borderColor: Colors.light.primary,
  borderWidth: 1.5,
  paddingVertical: 10,
  borderRadius: 10,
  width: "100%",
  alignItems: "center",
},

addBuildingText: {
  fontSize: 16,
  fontFamily: "Montserrat-SemiBold",
  color: Colors.light.primary,
},
modalContent2: {
    width: width * 0.8,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buildingButton1: {
  backgroundColor: "#f3f3f3",
  paddingVertical: 7,
  paddingHorizontal: 15,
  borderRadius: 10,
  width: width * 0.2,
  height: width * 0.09,
  alignItems: "center",
  marginVertical: 6,
},

});