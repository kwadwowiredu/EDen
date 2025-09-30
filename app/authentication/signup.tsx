import { Link, router } from 'expo-router';
import React, { FC, useState } from "react";
import {
    Alert,
    Dimensions,
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

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: width * 0.05, // 5% of screen width
        paddingTop: height * 0.05, // 5% from top for safe area
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: height * 0.04, // 4% spacing after logo
        paddingTop: height * 0.02, // 2% padding from top
    },

    logo: {
        width: width * 0.25, // 25% of screen width
        height: width * 0.25, // Keep it square
    },

    contentContainer: {
        flex: 1,
        paddingBottom: height * 0.03, // 3% bottom padding
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: width * 0.03, // 3% of screen width
        borderRadius: 6,
        fontSize: width * 0.04, // 4% of screen width
        marginBottom: height * 0.01, // 1% of screen height
        justifyContent: 'center',
        paddingHorizontal: width * 0.05, // 5% of screen width
        marginHorizontal: width * 0.04, // 4% of screen width
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

    name:{
        borderWidth: 1,
        borderColor: '#ccc',
        padding: width * 0.03, // 3% of screen width
        borderRadius: 6,
        fontSize: width * 0.035, // 3.5% of screen width
        marginBottom: height * 0.01, // 1% of screen height
        justifyContent: 'center',
    },

    button:{
        backgroundColor: '#1C9174',
        color: '#fff',
        textAlign: 'center',
        paddingVertical: height * 0.015, // 1.5% of screen height
        borderRadius: 6,
        fontWeight: 'bold',
        fontSize: width * 0.04, // 4% of screen width
        marginHorizontal: width * 0.04, // 4% of screen width
        marginVertical: height * 0.02, // 2% of screen height
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
        marginBottom: height * 0.01, // 1% of screen height
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
    },

    checkboxRow:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkBox:{
        width: width * 0.05, // 5% of screen width
        height: width * 0.05, // Keep it square
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 4,
        marginRight: width * 0.02, // 2% of screen width
    },

    checkboxchecked:{
        backgroundColor: '#1C9174',
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
    },
})

const SignupScreen: FC = () => {
    const [studentID,setstudentID] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [studentemail, setstudentemail] = useState('');
    const [password,setpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('');
    const [rememberMe, setrememberMe] = useState(false);
    const [showPassword, setshowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Password validation logic
    const passwordsMatch = password === confirmPassword;
    const showPasswordError = password.length > 0 && confirmPassword.length > 0 && !passwordsMatch;
    const isFormValid = studentID && firstname && lastname && studentemail && password && confirmPassword && passwordsMatch;

    const handleSignup = async () => {
        if (!isFormValid) {
            if (!passwordsMatch) {
                Alert.alert('Password Error', 'Passwords do not match. Please ensure both password fields are identical.');
                return;
            }
            Alert.alert('Form Error', 'Please fill in all required fields.');
            return;
        }
        
        // If all validations pass, proceed with signup
        else{
            try{
                const response = await fetch('###', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify([studentID, firstname, 
                        lastname, studentemail,password,])
                })
                const data = await response.json();

                if (!data.success){
                    setErrorMessage('Incorrect Student ID or Email');
                    return
                }

                setErrorMessage('')
                router.push('/(tabs)/explore')
            }
            catch(error){
                console.error(error);
                setErrorMessage('Something went wrong. Please try again later');
            }
        }

        
    }

    return(
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style= {{flex: 1}}
    >
    <SafeAreaView style={styles.container}>
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            {/* Logo Section
            <View style={styles.logoContainer}>
                <Image source={require('../../../Tekmart-main/assets/tekmart_images/TekMart 2.png')} style={styles.logo}/>
            </View> */}

            {/* Content Section */}
            <View style={styles.contentContainer}>
                {/* Name Container */}
                <View style={styles.nameContainer}>
                    {/* First Name */}
                    <View style={styles.nameInputContainer}>
                        <Text style={styles.nameLabel}>First Name</Text>
                        <TextInput 
                            value={firstname} 
                            onChangeText={setfirstname} 
                            placeholder="Enter First Name"
                            placeholderTextColor='#999'
                            style={styles.name}
                        />
                    </View>

                    {/* Last Name */}
                    <View style={styles.nameInputContainer}>
                        <Text style={styles.nameLabel}>Last Name</Text>
                        <TextInput 
                            value={lastname} 
                            onChangeText={setlastname} 
                            placeholder="Enter Last Name"
                            placeholderTextColor='#999'
                            style={styles.name}
                        />
                    </View>
                </View>

                {/* Student ID */}
                <Text style={styles.header}>Student ID</Text>
                <TextInput 
                    value={studentID} 
                    onChangeText={setstudentID} 
                    placeholder="Enter your student reference number"
                    placeholderTextColor='#999'
                    style={styles.input}
                />

                {/* Student Email */}
                <Text style={styles.header}>Student Email</Text>
                <TextInput 
                    value={studentemail} 
                    onChangeText={setstudentemail} 
                    placeholder="Enter your student email"
                    placeholderTextColor='#999'
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {/* Password */}
                <View style={styles.passwordContainer}>
                    <Text style={styles.header}>Password</Text>
                    <View style={[styles.passwordWrapper, showPasswordError && styles.passwordWrapperError]}>
                        <TextInput 
                            value={password} 
                            onChangeText={setpassword} 
                            placeholder="Enter your password"
                            placeholderTextColor='#999'
                            style={styles.passwordInput}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                            <Text style={styles.toggleText}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {showPasswordError && (
                        <Text style={styles.errorText}>Passwords do not match</Text>
                    )}
                </View>

                {/* Confirm Password */}
                <View style={styles.passwordContainer}>
                    <Text style={styles.header}>Confirm Password</Text>
                    <View style={[styles.passwordWrapper, showPasswordError && styles.passwordWrapperError]}>
                        <TextInput 
                            value={confirmPassword} 
                            onChangeText={setConfirmPassword} 
                            placeholder="Confirm your password"
                            placeholderTextColor='#999'
                            style={styles.passwordInput}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Text style={styles.toggleText}>
                                {showConfirmPassword ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {showPasswordError && (
                        <Text style={styles.errorText}>Passwords do not match</Text>
                    )}
                </View>

                {/* Next Button */}
                <TouchableOpacity 
                    onPress={handleSignup}
                    disabled={!isFormValid}
                    style={[
                        styles.button,
                        { opacity: isFormValid ? 1 : 0.5 }
                    ]}
                >   
                    <Text style={[!isFormValid && styles.buttonDisabled]}>Next</Text>
                </TouchableOpacity>


                {ErrorMessage !== '' && (
                    <Text style={{color: 'red', marginTop: 8}}>{ErrorMessage}</Text>
                )}

                {/* Divider */}
                {/* <View style={styles.dividerContainer}>
                    <View style={styles.divider}/>
                    <Text style={styles.dividerOR}>OR</Text>
                    <View style={styles.divider}/>
                </View> */}

                {/* Sign up with Google */}
                {/* <TouchableOpacity style={styles.googleContainer}>
                    <Image source={require('../../assets/tekmart_images/googleimage.jpg')} style={styles.googlelogo}/>
                    <Text style={styles.googleText}>Sign Up with Google</Text>
                </TouchableOpacity> */}

                {/* Sign In Link */}
                <TouchableOpacity style={styles.signupContainer}>
                    <Text style={{marginRight: 5, fontSize: width * 0.035}}>Already have an account?</Text>
                    <Link href="/authentication/Login">
                        <Text style={{color: '#1C9174', fontSize: width * 0.035}}>Sign In</Text>
                    </Link>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
    );
};

export default SignupScreen;
