import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, SafeAreaView, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import { stylesDashboard } from '../styles/stylesDashboard';
import expoconfig from '../expoconfig';
import { useRouter } from 'expo-router';
import teacherProfile from '../assets/img/teacherProfile.png';
import BackIcon from '../assets/svg/back-icon.svg';

const PendingApproval = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const router = useRouter();

    // Fetch pending approval users
    const fetchPendingUsers = async () => {
        try {
            const response = await fetch(`${expoconfig.API_URL}/api/users/pending-approval`);
            if (response.ok) {
                const data = await response.json();
                setPendingUsers(data);
            } else {
                throw new Error('Failed to fetch pending users');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    // Approve a user
    const approveUser = async (userId) => {
        try {
            const response = await fetch(`${expoconfig.API_URL}/api/users/approve/${userId}`, { method: 'POST' });
            if (response.ok) {
                Alert.alert('Success', 'User approved successfully');
                fetchPendingUsers();
            } else {
                throw new Error('Failed to approve user');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    // Handle profile press
    const handleProfilePress = () => {
        router.push('/ProfileTeacher');
    };

    // Handle back button press
    const handleBackPress = () => {
        router.back(); // This will navigate to the previous screen
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* Header Section with Back Button */}
                <View style={stylesDashboard.header}>
                    <View style={stylesDashboard.leftContainer}>
                        {/* Back Button */}
                        <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesDashboard.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
                    </View>
                    <View style={stylesDashboard.rightContainer}>
                        <Pressable onPress={handleProfilePress}>
                            <Image source={teacherProfile} style={stylesDashboard.pictureCircle} />
                        </Pressable>
                    </View>
                </View>

                {/* Title Section */}
                <View style={stylesDashboard.titleContainer}>
                    <Text style={stylesDashboard.titleText}>Users waiting for approval</Text>
                </View>

                {/* Pending Users Section */}
                <ScrollView contentContainerStyle={stylesDashboard.classContainer}>
                    {pendingUsers.length > 0 ? (
                        pendingUsers.map(user => (
                            <View key={user.id} style={stylesDashboard.pendingUserContent}>
                                <View style={stylesDashboard.userInfoContainer}>
                                    <Text style={stylesDashboard.pendingUserText}>{user.fname} {user.lname}</Text>
                                    <Text style={stylesDashboard.pendingUserEmail}>{user.email}</Text> 
                                </View>
                                <CustomButton 
                                    title="Approve" 
                                    onPress={() => approveUser(user.id)} 
                                    buttonStyle={stylesDashboard.buttonApprove} 
                                    textStyle={stylesDashboard.buttonText} 
                                />
                            </View>
                        ))
                    ) : (
                        <Text style={stylesDashboard.classContentText}>No users pending approval</Text>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default PendingApproval;
