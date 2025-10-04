import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { router } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import NotificationCard from '../../components/notificationCard';
import { useNotifications } from '../../contexts/NotificationContext';

const { width, height } = Dimensions.get('window');



type Notification = {
  id: number;
  message: string;
  read: boolean;
};


export default function Notifications() {
  const { notifications, markAllAsRead } = useNotifications();

  useEffect(() => {
  const setTestBuilding = async () => {
    await AsyncStorage.setItem(
      "currentBuilding",
      JSON.stringify({ id: "buildingA", name: "Building A" })
    );
    console.log("✅ Test building set!");
  };
  setTestBuilding();
}, []);

  // Run cleanup when screen is unfocused
  useFocusEffect(
    useCallback(() => {
      return () => {
        markAllAsRead();
      };
    }, [markAllAsRead])
  );


  return (
    <ScrollView>
                              <TouchableOpacity style={styles.logoContainer} 
                          onPress={() => router.back()}
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                          accessibilityLabel="Go back"
                          activeOpacity={0.7}>
                              <Image source={require('../../assets/images/EDen/Arrow.png')}
                                  style={{ width: 22, height: 22,  left: width * 0.03,   }}
                                          />
                      </TouchableOpacity> 
                      <Text style= {styles.forgettext}>
                          Notifications
                      </Text>
      {notifications.map((n) => (
        <NotificationCard
          key={n.id}
          message={n.message}
          read={n.read}
        />
      ))}

    </ScrollView>
  )
}

const styles = StyleSheet.create({
        logoContainer: {
        alignItems: 'center',
        right: width * 0.4,
        marginBottom: height * 0.04, // 4% spacing after logo
        paddingTop: height * 0.02,
        top: width * 0.1,
    },
        forgettext:{
        fontSize: 22,
        fontFamily: 'Montserrat-Bold',
        bottom: width * 0.05,
        left: width * 0.16,
        marginBottom: 0,
        marginLeft: width * 0.13,
    },
});
