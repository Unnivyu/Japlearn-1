import { SafeAreaView, StyleSheet, Text, View, Pressable, FlatList, Modal, Image, ImageBackground } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import styles from '../styles/stylesMenu';
import Profile from '../assets/svg/user_pf.svg';
import Complete from '../assets/img/level_available.png';
import Locked from '../assets/img/level_locked.png';
import Background from '../assets/img/MenuBackground.png';
import expoconfig from '../expoconfig';
import { AuthContext } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';

const levels = [
    { id: '1', title: 'Kana Intro', completed: true },
    { id: '2', title: 'Kana Basics I', completed: false },
    { id: '3', title: 'Kana Basics II', completed: false },
    { id: '4', title: 'Kana Basics III', completed: false },
    { id: '5', title: 'Kana Basics IV', completed: false },
    { id: '6', title: 'Kana Basics V', completed: false },
];

const LevelButton = ({ title, completed, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <Image
                source={completed ? Complete : Locked}
                style={styles.imageIcon}
            />
            <Text style={styles.menuText}>{title}</Text>
        </Pressable>
    );
};

// method to retrieve User's Lesson Tracker 
const userLessonTracker = async (userId) => {
    try {
        const response = await fetch (`${expoconfig.API_URL}/api/UserLessonTracker/getLessonTrackerByUser/${userId}`);

        if (!response.ok) {
            throw new Error('Network error');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching user lesson tracker: ', error);
        return [];
    }
}

// method to retrieve UserId data and assign it to user.UserId;
const retrieveUserId = async (email) => {
    try {
        const response = await fetch(`${expoconfig.API_URL}/api/users/findUser?email=${encodeURIComponent(email)}`);
        if (response.ok) {           
            const userData = await response.json();
            return userData.id;
        } else {
            console.error('Error fetching userId: ', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching userId: ', error);
    }
    return null;
}

const Menu = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [userLessonTrackerData, setUserLessonTrackerData] = useState([]);
    const [userId, setUserId] = useState(null);

    const handleLevelPress = (level) => {
        if (!level.completed) {
            setSelectedLevel(level);
            setModalVisible(true);
        }
    };

    // useEffect hook to fetch user lesson tracker.
    useEffect(() => {
        const fetchUserLessonTracker = async () => {
            if (user && user.email) {
                try {
                    // Retrieve userId based on email
                    const id = await retrieveUserId(user.email);
                    if (id) {
                        setUserId(id);
                        const trackerData = await userLessonTracker(id);
                        setUserLessonTrackerData(trackerData);
                    } else {
                        console.error('User ID is not available.');
                    }
                } catch (error) {
                    console.error('Error fetching user lesson tracker:', error);
                }
            }
        };

        fetchUserLessonTracker();
    },[]);

    console.log("Tracker data: ", userLessonTrackerData);

    const renderItem = ({ item }) => (
        <View style={styles.levelContainer}>
            <LevelButton title={item.title} completed={item.completed} onPress={() => handleLevelPress(item)} />
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={Background} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={[styles.header, { padding: 20 }]}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.hText}>Welcome Back</Text>
                            <Text style={styles.hText}>{user?.fname}</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Pressable onPress={() => router.push('/Profile')}>
                                <Profile width={65} height={65} />
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.menuContainer}>
                        <FlatList
                            data={levels}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            contentContainerStyle={styles.flatListContainer}
                            columnWrapperStyle={styles.columnWrapper}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Level Locked</Text>
                            <Text style={styles.modalText}>You must complete previous level to unlock "{selectedLevel?.title}".</Text>
                            <CustomButton title="Close" onPress={() => setModalVisible(false)} buttonStyle={styles.modalButton} textStyle={styles.modalButtonText} />
                        </View>
                    </View>
                </Modal>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Menu;
