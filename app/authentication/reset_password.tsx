import { router } from 'expo-router';
import React, { FC, useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors } from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: height * 0.04,
    paddingTop: height * 0.02,
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 6,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  resetbutton: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 15,
  },
  forgettext: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  secondtext: {
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20
  },
  headerText: {
    marginBottom: width * 0.06,
    alignItems: 'center'
  },
  emailtext: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  toggleText: {
    color: Colors.light.primary,
    textAlign: 'right',
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
  },
  backbutton: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ padding: 16, flex: 1, justifyContent: 'center' }}>
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
            <Text style={styles.emailtext}>New Password</Text>
            <TextInput
              placeholder="Enter your new password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setpassword}
              autoCapitalize="none"
              style={styles.inputField}
              secureTextEntry={!showPassword}
            />
            {/* Error if length < 8 */}
            {showLengthError && (
              <Text style={styles.errorText}>
                Password must be at least 8 characters
              </Text>
            )}

            {/* Confirm Password */}
            <Text style={styles.emailtext}>Confirm Password</Text>
            <TextInput
              placeholder="Confirm your new password"
              placeholderTextColor="#888"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
              style={styles.inputField}
              secureTextEntry={!showPassword}
            />

            {/* Show/Hide Password */}
            <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
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
                    ? "#ccc"
                    : Colors.light.primary,
                padding: 12,
                borderRadius: 8,
                alignItems: 'center',
                marginTop: 16,
              }}
              onPress={handlePassword}
              disabled={password.length < 8 || !passwordsMatch || resetpassword}
            >
              <Text style={styles.resetbutton}>
                {resetpassword ? 'Processing...' : 'Reset Password'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;
