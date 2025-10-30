import { Feather, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Building2, DoorClosed } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import LockCards from '../../components/LockCards';
import TopNotification from '../../components/TopNotification';
import { Colors } from "../../constants/Colors";
import { useBuilding } from "../../contexts/BuildingContext";
import { useUser } from "../../contexts/UserContext";



const { width, height } = Dimensions.get('window');

type LockItem = {
  id: string;
  name: string;
  status: string;
};



const index = () => {

  const { user } = useUser();
  const username = user.username;

  // const [username, setUsername] = useState('Ama');
  const initial = user.username?.trim()?.charAt(0)?.toUpperCase() ?? '?';
  const { state, changeBuilding } = useBuilding();
  const [isModalVisible1, setModalVisible1] = useState(false)


   const [notifVisible, setNotifVisible] = useState(false);
    const [notifMessage, setNotifMessage] = useState('');
  
    const showNotification = (msg: string, autoHide = true) => {
      setNotifMessage(msg);
      setNotifVisible(true);
      if (!autoHide) {
  
      }
    };

  const openModal1 = () => {
    setModalVisible1(true); 
  };
  const closeModal1 = () => {
    setModalVisible1(false)
  };

  const gotoSettings = () => {
    router.push('/settings');
  };

  return (
    <>
    <TopNotification
                message={notifMessage}
                visible={notifVisible}
                onHide={() => setNotifVisible(false)}
                duration={3000}
              />
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{marginRight: width * 0.06}} onPress={gotoSettings}>
          <View style={styles.circle}>
                    <Text style={styles.initial}>{initial}</Text>
                  </View>
        </TouchableOpacity>

        <View style={{right: width * 0.03,}}>
          <Text style={styles.welcomeText}>Welcome Home,</Text>
          <Text style={styles.username}>{username}</Text>
        </View>

        <TouchableOpacity style={styles.right} onPress={openModal1}>
          <Building2 size={30} color='#000000ff' style={{marginRight: 5}} />
          <FontAwesome name='angle-down' size={20} color='#000000ff'/>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>My Devices</Text>

      <View style={styles.locksHeader}>
        <DoorClosed size={20} color='#000000ff' />
        <Text style={styles.locksText}>Locks</Text>
      </View>

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
        <LockCards/>
        <View>
            <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.card}
                    onPress={() => router.push('/LockScan')} 
                  >
                    <Feather name='plus' size={30} />
                  </TouchableOpacity>
          </View>
    </SafeAreaView>
    </>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    flexDirection: 'row',
    width: 75,
    height: 75,
    bottom: width * 0.2,
    left: width * 0.33,
  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 19,
    width: '90%',
    height: width * 0.2,
    marginBottom: 30,
    alignItems: 'center',
  },

  profileCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#d4d4d4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.06,
  },

  initials: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },

  welcomeText: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'Montserrat-Bold',
    top: width * 0.035,
  },

  username: {
    fontSize: 28,
    fontFamily: 'Montserrat-Bold',
    color: '#979EF6',
  },

  right: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    textAlign: "center",
    marginBottom: 15,
  },

  locksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    bottom: width * 0.025,
    left: width * 0.005,
    marginBottom: 0,
  },

  locksText: {
    fontSize: 23,
    fontFamily: 'Montserrat-Bold',
    marginLeft: width * 0.02,
  },

  circle: {
    backgroundColor: '#979EF6',
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.65) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  initial: {
    color: '#fffbfbff',
    fontSize: width * 0.07, // large letter
    fontFamily: 'Montserrat-Bold',
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
  modalContent1: {
    width: width * 0.8,
    height: height * 0.2,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingModal1: {
    fontSize: 18, 
    fontWeight: '600',
    textAlign: 'center', 
    marginBottom: 24,
    top: width * -0.05,
    alignItems: 'center',
  },
  headingModal: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18, 
    fontWeight: '600',
    textAlign: 'center', 
    marginBottom: 24,
  },
});