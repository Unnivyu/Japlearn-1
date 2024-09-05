import React, { useState, useContext, useEffect } from 'react';
import { Pressable, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image, Alert } from 'react-native';
import EmptyClass from '../assets/svg/empty.svg';
import CustomButton from '../components/CustomButton';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import expoconfig from '../expoconfig';
import { styles }  from '../styles/stylesStartMenu';
import CustomModal from '../components/CustomModal';


const StartMenu = () => {
    const [classcode, setClasscode] = useState('');
    const { user} = useContext(AuthContext);
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const checkClassCode = async () => {
            const storedClassCode = await AsyncStorage.getItem('classCode');
            if (storedClassCode) {
                // Redirect to another component if classCode exists
                router.push('/Menu'); // Update with correct path if needed
            }
        };

        checkClassCode();
    }, [router]);

    const joinClass = async () => {
        if (!classcode.trim()) {
            setModalMessage('Please enter a class code.');
            setModalVisible(true);
            return;
        }

        if (!user || !user.email) {
            setModalMessage('Unable to identify the user or email is missing.');
            setModalVisible(true);
            return;
        }

        try {
            const params = new URLSearchParams({ email: user.email, classCode: classcode });
            const response = await fetch(`${expoconfig.API_URL}/api/students/joinClass`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params.toString()
            });

            if (response.ok) {
                const message = await response.text();
                Alert.alert('Success', message);
                await AsyncStorage.setItem('classCode', classcode);
                router.push('/Menu');
            } else {
                const errorMessage = await response.text();
                setModalMessage(`Error joining class: ${errorMessage}`);
                setModalVisible(true);
            }
        } catch (error) {
            console.error('Error joining class:', error.message);
            setModalMessage(`Error joining class. Please try again later.`);
            setModalVisible(true);
        }
    };

    return (    
        <KeyboardAvoidingView behavior='padding'>
            <View>
                
                <View style={[styles.header, {padding: 20}]}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.hText}>Welcome Back</Text>
                        <Text style={styles.hText}>{user?.fname}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Pressable onPress={undefined}>
                            <View style={styles.pictureCircle} />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.menuContainer}>
        
                    <View>
                        <Text style={styles.menuText}>Join a class!</Text>
                    </View>
                    <TextInput
                            style={styles.input}
                            value={classcode}
                            placeholder='Classcode'
                            autoCapitalize="none"
                            onChangeText={(text) => setClasscode(text)}
                    />
                    <CustomButton title='Join' onPress={joinClass} buttonStyle={styles.button} textStyle={styles.buttonText}/>
                    
                    <EmptyClass width={300} height={300} />

                </View>
                <CustomModal
                    visible={modalVisible}
                    message={modalMessage}
                    onClose={() => setModalVisible(false)}
                />
            </View>
        </KeyboardAvoidingView>
    );

}

export default StartMenu;
