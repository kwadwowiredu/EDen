import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Link, router } from 'expo-router';
import React, { FC, useState } from "react";
import {
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNotification from '../../components/TopNotification';
import { Colors } from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: width * 0.05, // 5% of screen width
        paddingTop: height * 0.05, // 5% from top for safe area
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: height * 0.05, // 5% spacing after logo
        paddingTop: height * 0.02, // 2% padding from top
    },

    logo: {
        width: width * 0.25, // 25% of screen width
        height: width * 0.25, // Keep it square
    },

    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        minHeight: height * 0.6, // Minimum height to ensure content fits
        position: 'fixed',
        top: height * 0.05, // Adjust to overlap with logo
    },

    input: {
        borderWidth: 1,
        borderColor: Colors.light.primary,
        padding: width * 0.03,
        borderRadius: 8,
        fontSize: width * 0.045, 
        marginBottom: height * 0.01, 
        justifyContent: 'center',
        paddingHorizontal: width * 0.05, 
        marginHorizontal: width * 0.04, 
        marginVertical: height * 0.005, 
        fontFamily: 'Montserrat-Regular',
        paddingLeft: width * 0.1,
    },
    passwordWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: width * 0.02, 
        marginHorizontal: width * 0.04,
        marginVertical: height * 0.02, 
        borderColor: Colors.light.primary,
    },

    passwordInput:{
        flex: 1,
        padding: width * 0.035, 
        fontSize: width * 0.045, 
        fontFamily: 'Montserrat-Regular',
    },


    button:{
        backgroundColor: Colors.light.primary,
        top: width * 0.028,
        color: '#fff',
        textAlign: 'center',
        paddingVertical: height * 0.01,
        borderRadius: 10,
        fontSize: width * 0.07, // 4% of screen width
        marginHorizontal: width * 0.04, // 4% of screen width
        marginVertical: height * 0.01, // 1% of screen height
        fontFamily: 'Montserrat-SemiBold',
    },

    header: {
        marginLeft: width * 0.06, // 6% of screen width
        fontSize: width * 0.035, // 3.5% of screen width
        fontWeight: 'bold',
        marginBottom: height * 0.005, // 0.5% of screen height
        color: '#333',
    },

    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
        paddingHorizontal: width * 0.04, // 4% of screen width
    },

    rememberMeContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.01, // 1% of screen height
        top: width * -0.039,
        left: width * 0.03,
    },

    rememberText:{
        fontSize: width * 0.043,
        fontFamily: 'Montserrat-Regular',
        top: width * 0.002,
        color: Colors.light.lightGreen,

    },

    forgotContainer:{
        marginVertical: height * 0.01,
        top: width * 0.02,

    },

    forgotText:{        
        textDecorationLine: 'underline',
        fontSize: width * 0.043,
        color: Colors.light.lightGreen,
        fontFamily: 'Montserrat-Regular',
    },

    signupContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.02, 
        marginBottom: height * 0.03, 
    },

    checkboxRow:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkBox:{
        width: width * 0.039, // 5% of screen width
        height: width * 0.039, // Keep it square
        borderColor: Colors.light.lightGreen,
        borderWidth: 1.5,
        borderRadius: 2,
        marginRight: width * 0.01, // 2% of screen width
    },

    checkboxchecked:{
        backgroundColor: Colors.light.lightGreen,
    },

    toggleText:{
        color: '#1C9174',
        fontWeight: 'bold',
        marginLeft: width * 0.02, // 2% of screen width
        fontSize: width * 0.035, // 3.5% of screen width
    },
    titleContainer: {
        alignItems: 'flex-start',
        marginBottom: height * -0.11, // 2% of screen height
        paddingHorizontal: width * 0.04, // 4% of screen width
        top: width * -0.2,
    },
    title: {
        flex: 1,
        alignItems: 'center',
        marginRight: width * 0.04, // 4% of screen width
    },
    titleText: {
        fontSize: width * 0.08, // 5% of screen width
        color: '#000000ff',
        fontFamily: 'Montserrat-SemiBold',
        top: width * 0.02,
    },
    SubTitle: {
        alignItems: 'center',
        marginTop: height * 0.01, // 1% of screen height
    },
    subtitleText: {
        color: '#000000ff',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 38,
    },
    inputContainer: {

    },
    icon: {
        top: width * 0.103,
        left: width * 0.08,
    },
    icon2: {
        left: width * 0.02,

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
})

const LoginScreen: FC = () => {
    const [email,setEmail] = useState('');
    const [password,setpassword] = useState('');
    const [rememberMe, setrememberMe] = useState(false);
    const [showPassword, setshowPassword] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');
    const [notifVisible, setNotifVisible] = useState(false);
    const [notifMessage, setNotifMessage] = useState('');

    const [fontsLoaded] = useFonts({
        'Montserrat-Black': require('../../assets/fonts/Montserrat-Black.ttf'),
        'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-ExtraBold' : require('../../assets/fonts/Montserrat-ExtraBold.ttf'),
        'InterSemi-Bold': require('../../assets/fonts/Inter-SemiBold.otf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Italic': require('../../assets/fonts/Montserrat-Italic.ttf'),
      });
    if (!fontsLoaded) return null;

      const showNotification = (msg: string, autoHide = true) => {
    setNotifMessage(msg);
    setNotifVisible(true);
    if (!autoHide) {

    }
  };

    {/* login handler to send data to backend */}
    const handleLogin = async () => {
        if (!email || !password) {
        showNotification("Enter a valid email or password");
        return;
        }
        {
            /*  
        
        else{
            try {
                const response = await fetch('###', {
                    method: 'POST',
                    headers: {'Content-Type': "application/json"},
                    body: JSON.stringify({studentID, password})
                })
                const data = await response.json();

                if (!data.success){
                    setErrorMessage('Incorrect student ID or password');
                    return;
                }

                setErrorMessage('');
                router.push('/(tabs)/a_home')
                
            }
            catch(error){
                console.error(error);
                setErrorMessage("Something went wrong. Try again later");
            }
        }
            */}
        router.push('/(tabs)/explore')
        
    }

    return(
        <>
    <TopNotification
        message={notifMessage}
        visible={notifVisible}
        onHide={() => setNotifVisible(false)}
        duration={3000}
      />
<KeyboardAvoidingView
  style={{ flex: 1 }}
>
  <SafeAreaView style={styles.container}>
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
           

            {/* Content Section */}
            <View style={styles.contentContainer}>
                 <View style={styles.titleContainer}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        Hello!
                    </Text>

            </View>
            <View style={styles.SubTitle}>
                <Text style={styles.subtitleText}>
                    Log In to <Text style={{ color: Colors.light.lightGreen, }}>EDen</Text>
                </Text>
            </View>
            </View>
                {/* Email */}
            <View style={styles.inputContainer}>
                 <Feather name="mail" size={20} color="#888" style={styles.icon} />
                <TextInput 
                    value={email} 
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor='#595C5E'
                    keyboardType='email-address'
                    style={styles.input}
                />
                </View>

                {/* Password Input */}
                <View style={styles.passwordWrapper}>
                    <Feather name="lock" size={20} color="#888" style={styles.icon2} />
                    <TextInput 
                        value={password} 
                        onChangeText={setpassword} 
                        placeholder="Password"
                        placeholderTextColor='#595C5E'
                        style={styles.passwordInput}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                        <Text style={styles.toggleText}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Remember Me and Forgot Password Row */}
                <View style={styles.row}>
                    <View style={styles.rememberMeContainer}>
                        <TouchableOpacity onPress={() => setrememberMe(!rememberMe)} style={styles.checkboxRow}>
                            <View style={[styles.checkBox, rememberMe && styles.checkboxchecked]}/>
                            <Text style={styles.rememberText}>Remember me</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.forgotContainer}>
                        <Link href='/authentication/forget'>
                            <Text style={styles.forgotText}>Forgot Password?</Text>
                        </Link>
                    </TouchableOpacity>
                </View>

                {/* Sign In Button */}
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.button}>Log In</Text>
                </TouchableOpacity>
                
                 {/*{ ErrorMessage !== '' && (
                    <Text style={{color: 'red', marginTop:8}}>{ErrorMessage}</Text>
                 )} */}

                {/* Divider */}
                {/* <View style={styles.dividerContainer}>
                    <View style={styles.divider}/>
                    <Text style={styles.dividerOR}>OR</Text>
                    <View style={styles.divider}/>
                </View> */}

                {/* Sign In with Google */}
                {/* <TouchableOpacity style={styles.googleContainer}>
                    <Image source={require('../../assets/tekmart_images/googleimage.jpg')} style={styles.googlelogo}/>
                    <Text style={styles.googleText}>Sign In with Google</Text>
                </TouchableOpacity> */}

                {/* Sign Up Link */}
                <TouchableOpacity style={styles.signupContainer}>
                    <Text style={{marginRight: 5, fontSize: width * 0.04, fontFamily: 'Montserrat-Regular', }}>Don't have an account?</Text>
                    <Link href="/authentication/signup">
                        <Text style={{color: Colors.light.lightGreen, fontSize: width * 0.04, fontFamily: 'Montserrat-Regular', textDecorationLine: 'underline', }}>Sign Up!</Text>
                    </Link>
                </TouchableOpacity>

            </View>
            <View style={styles.FooterText}>
          <Text style={styles.FooterTextContent}>protecting your paradise...</Text>
        </View>
        </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
    </>
    );
};

export default LoginScreen;
