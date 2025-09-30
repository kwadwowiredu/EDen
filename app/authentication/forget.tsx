import { Link, router } from 'expo-router';
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
    logoContainer:{
        alignItems: 'center',
        marginBottom: height * 0.04, // 4% spacing after logo
        paddingTop: height * 0.02,
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
        fontWeight: 'bold',
        fontSize: 15,
    },
    forgettext:{
        fontSize: 40,
        fontWeight: 'bold',
    },

    secondtext:{
        color: 'gray',
        marginLeft: width * 0.02
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

});

const ForgetPassword: FC = () => {
    const [resetpassword, setresetpassword] = useState(false);
    const [email, setemail] = useState('');

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
                    <View style={{ padding: 16, flex: 1, justifyContent: 'center' }}>
                        {/* <View style= {styles.logoContainer}>
                            <Image
                                source={require('../../assets/tekmart_images/TekMart 2.png')}
                                style= {styles.logo}
                            />
                        </View> */}
                        <View style={styles.headerText}>
                            <Text style= {styles.forgettext}>
                            Forgot Password?
                        </Text>
                        <Text style={styles.secondtext}>Please enter your 
                            Email address to receive a password reset link
                            </Text>
                        </View>

                        <Text style={styles.emailtext}>Email Address</Text>
                        <TextInput
                            placeholder="Enter your Email"
                            placeholderTextColor= "#888"
                            value={email}
                            onChangeText={setemail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.inputField}
                        />

                        <TouchableOpacity
                            style={{
                                backgroundColor: !isValidEmail(email) || resetpassword ? "#ccc" : Colors.light.primary,
                                padding: 12,
                                borderRadius: 8,
                                alignItems: 'center'
                            }}
                            onPress={handleEmail}
                            disabled={!isValidEmail(email) || resetpassword}
                        >
                            <Text style={styles.resetbutton}>
                                {resetpassword ? 'Sending...' : 'Reset Password'}
                            </Text>
                        </TouchableOpacity>
                        <Link href={'/authentication/Login'}
                                style={{
                                backgroundColor: "#ccc",
                                padding: 12,
                                borderRadius: 8,
                                alignItems: 'center',
                                marginTop: width * 0.02,
                            }}
                        >
                        <TouchableOpacity>
                            <Link href={'/authentication/Login'} style={styles.backbutton}>
                                <Text>Back to Sign In</Text>
                            </Link>
                        </TouchableOpacity>
                        </Link>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ForgetPassword;
