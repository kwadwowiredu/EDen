import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import HistoryCard from "../../components/historyCard";

const { width, height } = Dimensions.get('window');

const history = [
  {
    id: 1,
    user: "Ama",
    action: "unlocked" as const,
    door: "main door",
    date: "09/12/23",
    time: "09:12am",
  },
  {
    id: 2,
    user: "Kofi",
    action: "locked" as const,
    door: "kitchen door",
    date: "19/11/23",
    time: "10:20pm",
  },
];


export default function Explore() {

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
                          History
                      </Text>
      {history.map((n) => (
        <HistoryCard
          key={n.id}
          user={n.user}
          action={n.action}
          door={n.door}
          date={n.date}
          time={n.time}
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
        left: width * 0.25,
        marginBottom: 0,
        marginLeft: width * 0.13,
    },
});
