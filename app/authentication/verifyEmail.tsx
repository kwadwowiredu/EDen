import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';

const VerifyEmailScreen = () => {
  const { email } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/EDen/imageLogo.png')} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Verify your Email</Text>
        <Text style={styles.message}>  
          A Verification link has been sent to your gmail {" "}
          <Text 
          style={styles.email}
          onPress={() => Linking.openURL(`mailto:${email}`)}
          >
            {` ${email} `}
          </Text> 
        </Text>
        <Text style={styles.subText}>Tap on it to verify account.</Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>protecting your paradise...</Text>
    </View>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },

  email: {
    color: '#1A237E',
    textDecorationLine: 'underline',
    fontStyle: 'italic',
  },

  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 15,
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },

  subText: {
    fontSize: 15,
    color: '#333',
  },
  footer: {
    color: '#1A237E',
    fontStyle: 'italic',
    fontSize: 13,
  },
});
