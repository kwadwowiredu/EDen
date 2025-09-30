import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { FC, useState } from "react";
import {
  Alert,
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: Colors.light.background,
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        width: '90%',
        alignSelf: 'center',
    },
    logoContainer:{
        alignItems: 'center',
        right: width * 0.4,
        marginBottom: height * 0.04, // 4% spacing after logo
        paddingTop: height * 0.02,
        top: width * 0.1,
    },
    logo:{
        width: width * 0.25, // 25% of screen width
        height: width * 0.25
    }, 

    inputField: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 18,
        borderRadius: 8,
    },

    resetbutton: {
        color: "#fff",
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 26,
        paddingVertical: width * 0.016,
    },
    forgettext:{
        fontSize: 42,
        fontFamily: 'Montserrat-SemiBold',
    },

    secondtext:{
        color: 'gray',
        marginLeft: width * 0.02,
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
    },
    headerText:{
        marginBottom: width * 0.12,
        alignItems: 'center'
    }, 
    emailtext:{
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: width * 0.01,
    },
    backbutton:{
        textAlign: 'center',
        marginLeft: width * 0.31,
        fontWeight: 'bold',
        fontSize: 15,
    },
    icon: {
        top: width * 0.103,
        left: width * 0.05,
    },
    inputContainer: {
        width: '100%',
        bottom: width * 0.13,

    },
    input: {
        borderWidth: 1,
        borderColor: Colors.light.primary,
        padding: width * 0.03,
        borderRadius: 8,
        fontSize: width * 0.045, 
        marginBottom: height * 0.008, 
        justifyContent: 'center',
        paddingHorizontal: width * 0.1, 
        marginHorizontal: width * 0.02, 
        marginVertical: height * 0.002, 
        fontFamily: 'Montserrat-Regular',
        paddingLeft: width * 0.1,
    },
    FooterText: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: height * 0.02,
    },
    FooterTextContent: {
    color: Colors.light.lightGreen,
    fontSize: width * 0.04,
    fontFamily: 'Montserrat-Italic',
  },
    toggleText: {
    color: Colors.light.primary,
    textAlign: 'right',
    marginBottom: width * 0.02,
    fontFamily: 'Montserrat-Regular',

  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
    left: width * 0.02,
    fontFamily: 'Montserrat-Regular',
  },
});

const ResetPassword: FC = () => {
  const [resetpassword, setresetpassword] = useState(false);
  const [password, setpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setshowPassword] = useState(false);

  const passwordsMatch = password === confirmPassword;
  const showPasswordError =
    password.length > 0 && confirmPassword.length > 0 && !passwordsMatch;
  const showLengthError = password.length > 0 && password.length < 8;

  const handlePassword = async () => {
    if (password.length < 8) {
      Alert.alert('Password must be at least 8 characters');
      return;
    }

    if (!passwordsMatch) {
      Alert.alert(
        'Password Error',
        'Passwords do not match. Please ensure both fields are identical.'
      );
      return;
    }

    setresetpassword(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/authentication/Login');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setresetpassword(false);
    }
  };

  return (
      <View style={styles.backgroundContainer}>
            <View style={styles.container}>
            <TouchableOpacity style={styles.logoContainer} 
                onPress={() => router.back()}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessibilityLabel="Go back"
                activeOpacity={0.7}>
                    <Image source={require('../../assets/images/EDen/Arrow.png')}
                        style={{ width: 22, height: 22,  left: width * 0.045,   }}
                                />
            </TouchableOpacity> 
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ padding: 16, flex: 1, justifyContent: 'center', bottom: width * 0.2, }}>
            {/* Logo */}
            {/* <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/tekmart_images/TekMart 2.png')}
                style={styles.logo}
              />
            </View> */}

            {/* Header */}
            <View style={styles.headerText}>
              <Text style={styles.forgettext}>Enter New Password</Text>
              <Text style={styles.secondtext}>
                Please enter your new password and confirm it below
              </Text>
            </View>

            {/* New Password */}
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color="#888" style={styles.icon} />
            <TextInput
              placeholder="New Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setpassword}
              autoCapitalize="none"
              style={styles.input}
              secureTextEntry={!showPassword}
              
            />
            {/* Error if length < 8 */}
            {showLengthError && (
              <Text style={styles.errorText}>
                Password must be at least 8 characters
              </Text>
            )}
            </View>
            <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#888" style={styles.icon} />
            {/* Confirm Password */}
            <TextInput
              placeholder="Confirm New Password"
              placeholderTextColor="#888"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
              style={styles.input}
              secureTextEntry={!showPassword}
            />
            </View>

            {/* Show/Hide Password */}
            <TouchableOpacity onPress={() => setshowPassword(!showPassword)} style={{ bottom: width * 0.12, right: width * 0.025,}}>
              <Text style={styles.toggleText}>
                {showPassword ? 'Hide Passwords' : 'Show Passwords'}
              </Text>
            </TouchableOpacity>

            {/* Password match error */}
            {showPasswordError && (
              <Text style={styles.errorText}>
                Passwords do not match
              </Text>
            )}

            {/* Reset button */}
            <TouchableOpacity
              style={{
                backgroundColor:
                  password.length < 8 || !passwordsMatch || resetpassword
                    ? Colors.light.lightGreen
                    : Colors.light.primary,
                padding: 12,
                borderRadius: 8,
                alignItems: 'center',
                marginTop: 16,
                paddingVertical: width * -0.02,
                marginHorizontal: width * 0.02,
                bottom: width * 0.14,
              }}
              onPress={handlePassword}
              disabled={password.length < 8 || !passwordsMatch || resetpassword}
            >
              <Text style={styles.resetbutton}>
                {resetpassword ? 'Processing...' : 'Reset Password'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.FooterText}>
                                        <Text style={styles.FooterTextContent}>protecting your paradise...</Text>
                                      </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </View>
    </View>
  );
};

export default ResetPassword;
