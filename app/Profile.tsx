import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import BackIcon from '../assets/svg/back-icon.svg';
import { AuthContext } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';
import expoconfig from '../expoconfig';
import studentProfile from '../assets/img/studentProfile.png';
import { styles } from "../styles/stylesProfile";
import { useRouter } from "expo-router";

const Profile = () => {
    const { user, role, logout } = useContext(AuthContext);
    const [scoresData, setScoresData] = useState([]); // Initialize as an empty array
    const [activeGame, setActiveGame] = useState(null);
    const [noScores, setNoScores] = useState(false);
    const router = useRouter ();

    const handleBackPress = () => {
        router.back();
    };

    const handleLogout = () => {
        logout();
        router.push('/Login');
    };

    const handleGamePress = async (gameType) => {
        setActiveGame(gameType);
        setNoScores(false);
        let endpoint;
        switch (gameType) {
            case 'Quackman':
                endpoint = `/api/quackmanScores/getquackmanScoreByFnameAndLname/${user.fname}/${user.lname}`;
                break;
            case 'Quackamole':
                endpoint = `/api/quackamoleScores/getquackamoleScoreByFnameAndLname/${user.fname}/${user.lname}`;
                break;
            case 'Quackslate':
                endpoint = `/api/quackslateScores/getScoreByFnameAndLname/${user.fname}/${user.lname}`;
                break;
            default:
                return;
        }

        try {
            const response = await fetch(`${expoconfig.API_URL}${endpoint}`);
            if (response.ok) {
                const data = await response.json();
                if (!Array.isArray(data)) {
                    setNoScores(true);
                    setScoresData([]);
                } else {
                    if (data.length === 0) {
                        setNoScores(true);
                    }
                    setScoresData(data);
                }
            } else {
                console.error(`Failed to fetch ${gameType} scores`);
                setNoScores(true);
                setScoresData([]);
            }
        } catch (error) {
            console.error(`Error fetching ${gameType} scores:`, error);
            setNoScores(true);
            setScoresData([]);
        }
    };

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <BackIcon width={30} height={30} />
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.cover} />
                <View style={styles.profileContainer}>
                    <Image source={studentProfile} style={styles.profilePicture} />
                </View>
                <View style={styles.whiteSpace}>
                    <TouchableOpacity onPress={handleLogout} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.description}>
                <View style={styles.descTextContainer}>
                    <Text style={styles.descText}>Username: {user ? `${user.fname} ${user.lname}` : ''}</Text>
                </View>
            </View>
            <View style={styles.categoryContainer}>
                <CustomButton title="QUACKMAN" onPress={() => handleGamePress('Quackman')} buttonStyle={styles.categoryButton} textStyle={styles.categoryButtonText} />
                <CustomButton title="QUACKAMOLE" onPress={() => handleGamePress('Quackamole')} buttonStyle={styles.categoryButton} textStyle={styles.categoryButtonText} />
                <CustomButton title="QUACKSLATE" onPress={() => handleGamePress('Quackslate')} buttonStyle={styles.categoryButton} textStyle={styles.categoryButtonText} />
            </View>
            <ScrollView contentContainerStyle={styles.contentScrollContainer}>
                <View style={styles.contentContainer}>
                    {activeGame && (
                        <View style={styles.scoresContainer}>
                            <Text style={styles.gameTitle}>{activeGame} Scores</Text>
                            {noScores ? (
                                <Text style={styles.noScoresText}>No scores found</Text>
                            ) : (
                                scoresData.map((score, index) => (
                                    <View key={index} style={styles.scoreCard}>
                                        <Text style={styles.scoreText}>Name: {score.fname} {score.lname}</Text>
                                        <Text style={styles.scoreText}>Score: {score.score}</Text>
                                        <Text style={styles.scoreText}>Level: {score.level}</Text>
                                    </View>
                                ))
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile;
