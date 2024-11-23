import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { stylesDashboard } from '../styles/stylesDashboard';
import expoconfig from '../expoconfig';
import { useRouter } from 'expo-router';
import teacherProfile from '../assets/img/teacherProfile.png';

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* Header Section */}
                <View style={stylesDashboard.header}>
                    <View style={stylesDashboard.leftContainer}>
                        <Text style={stylesDashboard.hText}>Users Awaiting Approval</Text>
                    </View>
                    <View style={stylesDashboard.rightContainer}>
                        <Pressable onPress={handleProfilePress}>
                            <Image source={teacherProfile} style={stylesDashboard.pictureCircle} />
                        </Pressable>
                    </View>
                </View>

                {/* Pending Users Section */}
                <ScrollView contentContainerStyle={stylesDashboard.classContainer}>
                    {pendingUsers.length > 0 ? (
                        pendingUsers.map(user => (
                            <View key={user.id} style={stylesDashboard.pendingUserContent}>
                                <View style={stylesDashboard.userInfoContainer}>
                                    <Text style={stylesDashboard.pendingUserText}>{user.fname} {user.lname}</Text>
                                    <Text style={stylesDashboard.pendingUserEmail}>{user.email}</Text> {/* Email below name */}
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
