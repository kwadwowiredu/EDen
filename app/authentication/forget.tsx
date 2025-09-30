import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
        marginBottom: height * 0.01, 
        justifyContent: 'center',
        paddingHorizontal: width * 0.1, 
        marginHorizontal: width * 0.02, 
        marginVertical: height * 0.005, 
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


});

const ForgetPassword: FC = () => {
    const [resetpassword, setresetpassword] = useState(false);
    const [email, setEmail] = useState('');
    const router = useRouter();

    const isValidEmail = (email: string) => {
        const regex = /^\S+@\S+\.\S+$/;
        return regex.test(email);
    };

    const handleEmail = async () => {
        if (!isValidEmail(email)) return;

        setresetpassword(true);

        try {
            
                            const response = await fetch('https://your-api-endpoint.com/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                router.push('/authentication/reset_password')
            } else {
                Alert.alert('Error', 'Failed to send email.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong.');
        } finally {
            setresetpassword(false);
        }
                
                 // Simulate server call


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
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ padding: 16, flex: 1, justifyContent: 'center', bottom: width * 0.3, }}>
                         
                        <View style={styles.headerText}>
                            <Text style= {styles.forgettext}>
                            Forgot Password?
                        </Text>
                        <Text style={styles.secondtext}>Enter your 
                            email address to receive password reset link
                            </Text>
                        </View>
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

                        <TouchableOpacity
                            style={{
                                backgroundColor: !isValidEmail(email) || resetpassword ? Colors.light.lightGreen : Colors.light.primary,
                                padding: 12,
                                borderRadius: 8,
                                alignItems: 'center',
                                paddingVertical: width * -0.02,
                                marginHorizontal: width * 0.02,


                            }}
                            onPress={handleEmail}
                            disabled={!isValidEmail(email) || resetpassword}
                        >
                            <Text style={styles.resetbutton}>
                                {resetpassword ? 'Sending...' : 'Reset Password'}
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

export default ForgetPassword;
