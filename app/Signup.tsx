import { ActivityIndicator, ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomModal from '../components/CustomModal';
import styles from '../styles/stylesSignup';
import { router } from 'expo-router';
import React, { useState } from 'react';
import Logo from '../assets/svg/jpLogo.svg';
import expoconfig from '../expoconfig';
import { Ionicons } from '@expo/vector-icons';

const Signup = () => {
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

    const [errors, setErrors] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        cpassword: ''
    });

    const signup = async () => {
        let validationErrors = {
            fname: '',
            lname: '',
            email: '',
            password: '',
            cpassword: ''
        };
    
        if (!fname.trim()) {
            validationErrors.fname = 'Please enter your first name';
        }
        if (!lname.trim()) {
            validationErrors.lname = 'Please enter your last name';
        }        
        if (!email.trim()) {
            validationErrors.email = 'Please enter your email';
        } else if (!email.endsWith('@gmail.com')) {
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
    
        if (Object.values(validationErrors).some(error => error !== '')) {
            // Display validation errors in the modal
            setModalMessage('Please correct the highlighted fields.');
            setModalVisible(true);
            return;
        }
    
        // Perform the signup operation
        try {
            setLoading(true);
            const response = await fetch(`${expoconfig.API_URL}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fname,
                    lname,
                    email,
                    password,
                    role: 'student'
                })
            });
    
            const data = await response.json();
            if (response.ok) {
                setModalMessage('Signup successful!');
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
                console.error('Error response:', errorMessage);
                throw new Error(errorMessage);
            }
        } catch (error) {
            setModalMessage(`Signup failed: ${error}`);
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={styles.imageContainer}>
                        <Logo width={150} height={150} />
                    </View>
                        
                    <TextInput
                        style={[styles.input, errors.fname ? styles.errorInput : null]}
                        value={fname}
                        placeholder='Firstname'
                        autoCapitalize="none"
                        onChangeText={(text) => setFname(text)}
                    />

                    {errors.fname && (
                        <Text style={styles.errorText}>{errors.fname}</Text>
                    )}

                    <TextInput
                        style={[styles.input, errors.lname ? styles.errorInput : null]}
                        value={lname}
                        placeholder='Lastname'
                        autoCapitalize="none"
                        onChangeText={(text) => setLname(text)}
                    />

                    {errors.lname && (
                        <Text style={styles.errorText}>{errors.lname}</Text>
                    )}
    
                    <TextInput
                        style={[styles.input, errors.email ? styles.errorInput : null]}
                        value={email}
                        placeholder='Email'
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                    />

                    {errors.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                    
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, styles.passwordInput, errors.password ? styles.errorInput : null]}
                            secureTextEntry={!showPassword}
                            value={password}
                            placeholder='Password'
                            autoCapitalize="none"
                            onChangeText={(text) => setPassword(text)}
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

                    {errors.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                    )}

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, styles.passwordInput, errors.cpassword ? styles.errorInput : null]}
                            secureTextEntry={!showCPassword}
                            value={cpassword}
                            placeholder='Confirm Password'
                            autoCapitalize="none"
                            onChangeText={(text) => setCPassword(text)}
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

                    {errors.cpassword && (
                        <Text style={styles.errorText}>{errors.cpassword}</Text>
                    )}

                    <View style={styles.buttonContainer}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <CustomButton title="Sign Up" onPress={signup} buttonStyle={styles.button} textStyle={styles.buttonText}/>
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
            </ScrollView>
        </View>
    );
};

export default Signup;
