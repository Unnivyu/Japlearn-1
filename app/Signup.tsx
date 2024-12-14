import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomModal from '../components/CustomModal';
import PrivacyModal from '../components/PrivacyModal';
import styles from '../styles/stylesSignup';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import expoconfig from '../expoconfig';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';

const Signup = () => {
    const params = useLocalSearchParams();
    const [hasCheckedModal, setHasCheckedModal] = useState(false);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
    const [hasAgreedToPrivacy, setHasAgreedToPrivacy] = useState(false);

    const [errors, setErrors] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        cpassword: ''
    });

    const validateForm = () => {
        let validationErrors = {
            fname: '',
            lname: '',
            email: '',
            password: '',
            cpassword: ''
        };

        // Form Validation
        if (!fname.trim()) {
            validationErrors.fname = 'Please enter your first name';
        }
        if (!lname.trim()) {
            validationErrors.lname = 'Please enter your last name';
        }
        if (!email.trim()) {
            validationErrors.email = 'Please enter your email';
        } else if (!email.endsWith('@cit.edu')) {
            validationErrors.email = 'Invalid email format';
        }
        if (!password) {
            validationErrors.password = 'Please enter your password';
        } else {
            if (password.length < 8) {
                validationErrors.password = 'Password must be at least 8 characters long';
            }
            if (!/[A-Z]/.test(password)) {
                validationErrors.password = validationErrors.password + ' Include at least one uppercase letter';
            }
            if (!/[0-9]/.test(password)) {
                validationErrors.password = validationErrors.password + ' Include at least one number';
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                validationErrors.password = validationErrors.password + ' Include at least one special character';
            }
        }
        if (!cpassword) {
            validationErrors.cpassword = 'Please confirm your password';
        } else if (password !== cpassword) {
            validationErrors.cpassword = 'Passwords do not match';
        }

        setErrors(validationErrors);

        return Object.values(validationErrors).every(error => error === '');
    };

    const signup2 = () => {
        // Validate the form first
        if (!validateForm()) {
            setModalMessage('Please correct the highlighted fields.');
            setModalVisible(true); // Show error modal if validation fails
            return; // Exit if validation fails
        }
    
        // Show the privacy policy modal
        setPrivacyModalVisible(true);
    };
    

    const signup = async (agreed = false) => {
        // Validate the form first
        if (!validateForm()) {
            setModalMessage('Please correct the highlighted fields.');
            setModalVisible(true); // Show error modal if validation fails
            return; // Exit if validation fails
        }
    
        // Show the privacy modal if the user hasn't agreed yet
        if (!agreed && !hasAgreedToPrivacy) {
            setPrivacyModalVisible(true); // Show the Privacy Policy modal
            return; // Exit until the user agrees
        }
    
        // The actual signup operation (only proceeds if agreed and form is valid)
        try {
            setLoading(true);
            const response = await fetch(`${expoconfig.API_URL}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fname,
                    lname,
                    email,
                    password,
                    role: 'student',
                }),
            });
    
            if (response.ok) {
                setModalMessage('Signup successful! Please check your email and confirm the link to complete registration.');
                setModalVisible(true);
                setFname('');
                setLname('');
                setEmail('');
                setPassword('');
                setCPassword('');
                setTimeout(() => {
                    setModalVisible(false);
                    router.push('/Login');
                }, 2000);
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            setModalMessage(`Signup failed: ${error.message}`);
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };
    
    
    

    return (
        <View style={styles.container}>
            <ScrollView 
            showsVerticalScrollIndicator={false}>
                <View>
                    <View style={styles.imageContainer}>
                        <Text style={styles.titleText}>Please fill out the necessary fields.</Text>
                    </View>
                        
                    <TextInput
    style={[styles.input, errors.fname ? styles.errorInput : null]}
    value={fname}
    placeholder="Firstname"
    autoCapitalize="none"
    maxLength={30}
    onChangeText={(text) => {
        const trimmedText = text.trimStart().charAt(0).toUpperCase() + text.trimStart().slice(1);
        setFname(trimmedText);

        // Clear error when valid input is entered
        if (trimmedText) {
            setErrors((prevErrors) => ({ ...prevErrors, fname: '' }));
        }
    }}
/>

<TextInput
    style={[styles.input, errors.lname ? styles.errorInput : null]}
    value={lname}
    placeholder="Lastname"
    autoCapitalize="none"
    maxLength={30}
    onChangeText={(text) => {
        const trimmedText = text.trimStart().charAt(0).toUpperCase() + text.trimStart().slice(1);
        setLname(trimmedText);

        // Clear error when valid input is entered
        if (trimmedText) {
            setErrors((prevErrors) => ({ ...prevErrors, lname: '' }));
        }
    }}
/>

<TextInput
    style={[styles.input, errors.email ? styles.errorInput : null]}
    value={email}
    placeholder="Email"
    autoCapitalize="none"
    maxLength={50}
    onChangeText={(text) => {
        const trimmedText = text.trimStart();
        setEmail(trimmedText);

        // Clear error when valid email is entered
        if (trimmedText.endsWith('@cit.edu')) {
            setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        }
    }}
/>

<View style={styles.passwordContainer}>
    <TextInput
        style={[styles.input, styles.passwordInput, errors.password ? styles.errorInput : null]}
        secureTextEntry={!showPassword}
        value={password}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(text) => {
            setPassword(text);

            // Clear error when valid password is entered
            if (text.length >= 8 && /[A-Z]/.test(text) && /[0-9]/.test(text) && /[!@#$%^&*(),.?":{}|<>]/.test(text)) {
                setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
            }
        }}
    />
    {password.length > 0 && (
        <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.insideInputButton}
        >
            <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#4F4F4F"
            />
        </Pressable>
    )}
</View>

<View style={styles.passwordContainer}>
    <TextInput
        style={[styles.input, styles.passwordInput, errors.cpassword ? styles.errorInput : null]}
        secureTextEntry={!showCPassword}
        value={cpassword}
        placeholder="Confirm Password"
        autoCapitalize="none"
        onChangeText={(text) => {
            setCPassword(text);

            // Clear error when passwords match
            if (text === password) {
                setErrors((prevErrors) => ({ ...prevErrors, cpassword: '' }));
            }
        }}
    />
    {cpassword.length > 0 && (
        <Pressable
            onPress={() => setShowCPassword(!showCPassword)}
            style={styles.insideInputButton}
        >
            <Ionicons
                name={showCPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#4F4F4F"
            />
        </Pressable>
    )}
</View>


                    

                    <View style={styles.buttonContainer}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <CustomButton title="Sign Up" onPress={signup2} buttonStyle={styles.button} textStyle={styles.buttonText}/>
                        )}
                    </View>

                    <View style={styles.linkContainer}>
                        <Pressable onPress={() => router.push('/Login')}>
                            <Text style={styles.linkText}>Already have an account? Sign In</Text>
                        </Pressable>
                    </View>
                </View>

                <CustomModal
                    visible={modalVisible}
                    message={modalMessage}
                    onClose={() => setModalVisible(false)}
                />

                <PrivacyPolicyModal
                    visible={privacyModalVisible}
                    onAgree={() => {
                        setHasAgreedToPrivacy(true);
                        setPrivacyModalVisible(false);
                        signup(true); // Trigger the signup function
                    }}
                    onClose={() => setPrivacyModalVisible(false)}
/>
            </ScrollView>
        </View>
    );
};

export default Signup;

