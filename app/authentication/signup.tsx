import { Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { FC, useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNotification from '../../components/TopNotification';
import { Colors } from "../../constants/Colors";


const { width, height } = Dimensions.get('window');


const API_BASE = 'https://eden-backend-cref.onrender.com/api/schema/swagger-ui/#/';

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: Colors.light.background,
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        width: '100%',
        alignSelf: 'center',
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        width: '100%',
        alignSelf: 'center',
        top: width * -0.13,
    },
    logoContainer: {
        alignItems: 'center',
        right: width * 0.4,
        marginBottom: height * 0.04, // 4% spacing after logo
        paddingTop: height * 0.02,
        top: width * 0.1,
    },

    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: width * 0.05, // 5% of screen width
        paddingTop: height * 0.05, // 5% from top for safe area
    },

    contentContainer: {
        flex: 1,
        paddingBottom: height * 0.03, // 3% bottom padding
    },

    input: {
        borderWidth: 1,
        borderColor: Colors.light.primary,
        padding: width * 0.03,
        borderRadius: 8,
        fontSize: width * 0.045, 
        marginBottom: height * 0.01, 
        justifyContent: 'center',
        paddingHorizontal: width * 0.1, 
        marginHorizontal: width * -0.04, 
        marginVertical: height * 0.005, 
        fontFamily: 'Montserrat-Regular',
        paddingLeft: width * 0.1,
    },

    inputError: {
        borderColor: '#ff4444',
        borderWidth: 2,
    },

    nameContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: height * 0.02, // 2% of screen height
        paddingHorizontal: width * 0.04, // 4% of screen width
    },

    nameInputContainer: {
        flex: 1,
        marginHorizontal: width * 0.01, // 1% of screen width
    },

    nameLabel: {
        fontSize: width * 0.035, // 3.5% of screen width
        fontWeight: 'bold',
        marginBottom: height * 0.005, // 0.5% of screen height
        marginLeft: width * 0.02, // 2% of screen width
        color: '#333',
    },

    buttonDisabled: {
        backgroundColor: '#cccccc',
        color: '#666666',
    },

    header: {
        marginLeft: width * 0.06, // 6% of screen width
        fontWeight: 'bold',
        fontSize: width * 0.035, // 3.5% of screen width
        marginBottom: height * 0.005, // 0.5% of screen height
        color: '#333',
    },

    errorText: {
        color: '#ff4444',
        fontSize: width * 0.03, // 3% of screen width
        marginLeft: width * 0.06, // 6% of screen width
        marginTop: height * 0.005, // 0.5% of screen height
        fontFamily: 'Montserrat-Regular',
        left: width * 0.27,
        bottom: width *0.052,
    },

    passwordContainer: {
        marginBottom: height * 0.01, // 1% of screen height
    },

    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
    },

    rememberMeContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: width * 0.04, // 4% of screen width
        marginVertical: height * 0.01, // 1% of screen height
    },

    rememberText:{
        fontSize: width * 0.035, // 3.5% of screen width
    },

    forgotContainer:{
        marginHorizontal: width * 0.04, // 4% of screen width
        marginVertical: height * 0.01, // 1% of screen height
    },

    forgotText:{
        fontSize: width * 0.035, // 3.5% of screen width
        color: '#1C9174',
    },

    dividerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.02, // 2% of screen height
        marginHorizontal: width * 0.04, // 4% of screen width
        marginTop: height * 0.01, // 1% top margin
    },

    divider:{
        flex: 1,
        height: 2,
        backgroundColor: '#ccc',
        marginHorizontal: width * 0.02, // 2% of screen width
    },

    dividerOR:{
        fontSize: width * 0.035, // 3.5% of screen width
        paddingHorizontal: width * 0.02, // 2% of screen width
    },

    googleContainer:{
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#ccc',
        marginHorizontal: width * 0.04, // 4% of screen width
        marginVertical: height * 0.01, // 1% of screen height
        padding: height * 0.01, // 1% of screen height
        alignItems: 'center',
        justifyContent: 'center',
    },

    googlelogo:{
        width: width * 0.12, // 12% of screen width
        height: width * 0.12, // Keep it square
        marginRight: width * 0.03, // 3% of screen width
    },

    googleText:{
        fontSize: width * 0.035, // 3.5% of screen width
        fontWeight: 'bold',
    },

    signupContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.02, // 2% of screen height
        marginBottom: height * 0.03, // 3% bottom margin for safe area
        bottom: width * 0.1,
    },

    checkboxRow:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    passwordWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: width * 0.03, // 3% of screen width
        marginHorizontal: width * 0.04, // 4% of screen width
        marginVertical: height * 0.005, // 0.5% of screen height
        borderColor: '#ccc',
    },

    passwordWrapperError: {
        borderColor: '#ff4444',
        borderWidth: 2,
    },

    passwordInput:{
        flex: 1,
        paddingVertical: height * 0.015, // 1.5% of screen height
        fontSize: width * 0.04, // 4% of screen width
    },

    toggleText:{
        color: '#1C9174',
        fontWeight: 'bold',
        marginLeft: width * 0.02, // 2% of screen width
        fontSize: width * 0.035, // 3.5% of screen width
        fontFamily: 'Montserrat-Regular',
        
    },
    inputContainer: {
        width: '100%',
        bottom: width * 0.13,
    },
    inputContainer1: {
        width: '100%',
        bottom: width * 0.13,
        paddingHorizontal: width *0.19,
        marginRight: width * -0.28,
    },
    input1: {
        borderWidth: 1,
        borderColor: Colors.light.primary,
        padding: width * 0.03,
        borderRadius: 8,
        fontSize: width * 0.045, 
        marginBottom: height * 0.01, 
        justifyContent: 'center',
        paddingHorizontal: width * 0.04, 
        marginHorizontal: width * -0.04, 
        marginVertical: height * 0.005, 
        fontFamily: 'Montserrat-Regular',
        paddingLeft: width * 0.1,
    },
    resetbutton: {
        color: "#fff",
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 26,
        paddingVertical: width * 0.016,

    },
    forgettext:{
        fontSize: 30,
        fontFamily: 'Montserrat-SemiBold',
        bottom: width * 0.065,
        left: width * 0.16,
        marginBottom: 0,
    },
    icon: {
        top: width * 0.043,
        right: width * 0.01,
        marginBottom: width * -0.06,
    },
    icon2: {
        top: width * -0.09,
        right: width * 0.01,
        marginBottom: width * -0.06,
    },
    FooterText: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        bottom: width * 0.18,
    },
    FooterTextContent: {
        color: Colors.light.lightGreen,
        fontSize: width * 0.04,
        fontFamily: 'Montserrat-Italic',
    },
})

const SignupScreen: FC = () => {
    const [phonennumber, setphonennumber] = useState('');
    const [signup, setSignup] = useState(false);
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState(''); // <-- added
    const [email, setEmail] = useState('');
    const [password,setpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('');
    const [showPassword, setshowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [notifVisible, setNotifVisible] = useState(false);
    const [notifMessage, setNotifMessage] = useState('');
    const [notifColor, setNotifColor] = useState<string | undefined>();

    useEffect(() => {
    if (ErrorMessage && ErrorMessage.length > 0) {
        setNotifMessage(ErrorMessage);
        setNotifColor('#e53935'); // red for errors
        setNotifVisible(true);
    }
    }, [ErrorMessage]);


    const isValidEmail = (email: string) => {
        const regex = /^\S+@\S+\.\S+$/;
        return regex.test(email);
    };

    const showNotification = (msg: string, duration = 3000) => {
        setNotifMessage(msg);
        setNotifVisible(true);

    };
    // Password validation logic
    const passwordsMatch = password === confirmPassword;
    const showPasswordError = password.length > 0 && confirmPassword.length > 0 && !passwordsMatch;
    const isFormValid = phonennumber && firstname && lastname && email && password && confirmPassword && passwordsMatch;

  const handleSignup = async () => {
  // validation (keep as is)
  if (!isFormValid) {
    if (!passwordsMatch) {
      showNotification('Passwords do not match.');
      return;
    }
    showNotification('Fill all fields correctly');
    return;
  }

  setSignup(true);
  setErrorMessage(''); // clear old error

  try {
    const url = `https://eden-backend-cref.onrender.com/user/register/`;
    console.log('[signup] POST', url);

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        first_name: firstname,
        last_name: lastname,
        phone_number: phonennumber,
        password,
        confirm_password: confirmPassword,
      }),
    });

    // log status and headers for debugging
    console.log('[signup] status', resp.status, resp.statusText);
    console.log('[signup] headers:', JSON.stringify(Object.fromEntries(resp.headers.entries())));

   // try to parse JSON; fall back to text when response is not JSON
    let data: any = null;
    const text = await resp.text();
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      // response is not JSON (HTML or plain text). Keep `data` null and show friendly message
      data = null;
    }
    console.log('[signup] body:', data ?? text);

    if (resp.status === 201) {
      showNotification('Account created successfully');
      router.push('/(tabs)/explore');
      return;
    }

    // Non-201 responses: prefer server JSON messages, otherwise show a safe fallback
    if (data && typeof data === 'object') {
      if (data.detail || data.message) {
        showNotification(data.detail || data.message);
        setErrorMessage(data.detail || data.message);
      } else {
        // field errors like { email: ["..."] }
        const firstKey = Object.keys(data)[0];
        const val = data[firstKey];
        const msg = Array.isArray(val) ? val.join(' ') : String(val);
        showNotification(msg || 'Failed to create account');
        setErrorMessage(msg || 'Failed to create account');
      }
    } else {
      // non-JSON body (e.g. HTML error page or empty) => show safe generic message
      const friendly = resp.status >= 500 ? 'Server error. Try again later.' : 'Failed to create account. Check input.';
      showNotification(friendly);
      setErrorMessage(friendly);
    }
  } catch (err: any) {
    console.log('[signup] network/error', err && err.message ? err.message : err);
    showNotification('Network error. Check server URL or network.');
    setErrorMessage('Network error. Check server URL or network.');
  } finally {
    setSignup(false);
  }
};

    return(
        <>
      <TopNotification
        message={notifMessage}
        visible={notifVisible}
        onHide={() => setNotifVisible(false)}
        duration={3000}
      />
            <View style={styles.backgroundContainer}>
                <View style={styles.container}>
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
                    Create an Account
                </Text>
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style= {{flex: 1}}
    >
    <SafeAreaView style={styles.container2}>
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            {/* Logo Section
            <View style={styles.logoContainer}>
                <Image source={require('../../../Tekmart-main/assets/tekmart_images/TekMart 2.png')} style={styles.logo}/>
            </View> */}

            <View style={{ padding: 16, flex: 1, justifyContent: 'center', bottom: width * 0.1, }}>
                    {/* First Name */}
                    <View style={{flexDirection: 'row', alignSelf: 'center', right: width * 0.14,}}>
                    <View style={styles.inputContainer1}>
                        <Feather name="user" size={20} color="#888" style={styles.icon} />
                        <TextInput 
                            value={firstname} 
                            onChangeText={setfirstname} 
                            placeholder="First Name"
                            placeholderTextColor='#999'
                            style={styles.input1}
                        />
                    </View>
                    <View style={styles.inputContainer1}>
                        <Feather name="user" size={20} color="#888" style={styles.icon} />
                        <TextInput 
                            value={lastname} 
                            onChangeText={setlastname} 
                            placeholder="Last Name"
                            placeholderTextColor='#999'
                            style={styles.input1}
                        />
                    </View>
                    </View>

                {/* Email */}
                <View style={styles.inputContainer}>
                    <Feather name="mail" size={20} color="#888" style={styles.icon} />
                <TextInput 
                    value={email} 
                    onChangeText={setEmail} 
                    placeholder="Email"
                    placeholderTextColor='#999'
                    keyboardType='email-address'
                    style={styles.input}
                />
                </View>

                {/* Phone Number */}
                <View style={styles.inputContainer}>
                    <Feather name="phone" size={20} color="#888" style={styles.icon} />
                <TextInput 
                    value={phonennumber} 
                    onChangeText={setphonennumber} 
                    placeholder="Phone Number"
                    placeholderTextColor='#999'
                    style={styles.input}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                />
                </View>

                {/* Password */}
                <View style={styles.passwordContainer}>
                    <Feather name="lock" size={20} color="#888" style={styles.icon2} />
                    <View style={styles.inputContainer}>
                        <TextInput 
                            value={password} 
                            onChangeText={setpassword} 
                            placeholder="Password"
                            placeholderTextColor='#999'
                            style={styles.input}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setshowPassword(!showPassword)} style={{ bottom: width * 0.11, left: width * 0.55, }}>
                            <Text style={styles.toggleText}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Confirm Password */}
                <View style={styles.inputContainer}>
                    <Feather name="lock" size={20} color="#888" style={styles.icon} />
                        <TextInput 
                            value={confirmPassword} 
                            onChangeText={setConfirmPassword} 
                            placeholder="Confirm Password"
                            placeholderTextColor='#999'
                            style={styles.input}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{ bottom: width * 0.11, left: width * 0.55, }}>
                            <Text style={styles.toggleText}>
                                {showConfirmPassword ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    {showPasswordError && (
                        <Text style={styles.errorText}>Passwords do not match</Text>
                    )}
                </View>

                {/* Next Button */}
                        <TouchableOpacity
                            style={{
                                backgroundColor: !isValidEmail(email) || signup ? Colors.light.lightGreen : Colors.light.primary,
                                padding: 12,
                                borderRadius: 8,
                                alignItems: 'center',
                                paddingVertical: width * -0.02,
                                marginHorizontal: width * -0.04,
                                bottom: width * 0.08,
                            }}
                            onPress={handleSignup}
                            disabled={!isValidEmail(email) || signup}
                        >
                            <Text style={styles.resetbutton}>
                                {signup ? 'Loading...' : 'Sign Up'}
                            </Text>
                        </TouchableOpacity>


                {/* {ErrorMessage !== '' && (
                    <Text style={{color: 'red', marginTop: 8}}>{ErrorMessage}</Text>
                )} */}

                
                {/* Sign In Link */}
                <TouchableOpacity style={styles.signupContainer}>
                    <Text style={{marginRight: 5, fontSize: width * 0.04, fontFamily: 'Montserrat-Regular', }}>Already have an account?</Text>
                    <Link href="/authentication/Login">
                        <Text style={{color: Colors.light.lightGreen, fontSize: width * 0.04, textDecorationLine: 'underline', fontFamily: 'Montserrat-Regular',}}>Log In!</Text>
                    </Link>
                </TouchableOpacity>
            </View>

        </ScrollView>
        
    </SafeAreaView>
    </KeyboardAvoidingView>
    </View>
                <View style={styles.FooterText}>
                                          <Text style={styles.FooterTextContent}>protecting your paradise...</Text>
                                        </View>
    </View>
    </>
    );
};

export default SignupScreen;
