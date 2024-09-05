import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { stylesClass } from '../styles/stylesClass';
import { styles } from '../styles/stylesModal';
import BackIcon from '../assets/svg/back-icon.svg';
import expoconfig from '../expoconfig';
import Icon1 from '../assets/svg/gameIcon1.svg';
import Icon2 from '../assets/svg/gameIcon2.svg';
import Icon3 from '../assets/svg/gameIcon3.svg';
import { useRouter, useLocalSearchParams } from 'expo-router';

const ClassDashboard = () => {
    const [activeCategory, setActiveCategory] = useState('MEMBERS');
    const { classCode } = useLocalSearchParams();
    const [userData, setUserData] = useState([]);
    const [scoresData, setScoresData] = useState([]);
    const [filteredScoresData, setFilteredScoresData] = useState([]);
    const [selectedScores, setSelectedScores] = useState(new Set());
    const [selectedStudents, setSelectedStudents] = useState(new Set());
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showConfirmRemoveModal, setShowConfirmRemoveModal] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${expoconfig.API_URL}/api/students/getByClassCode?classCode=${classCode}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [classCode]);

    const fetchScoresData = async () => {
        try {
            const quackslateResponse = await fetch(`${expoconfig.API_URL}/api/quackslateScores/getScoresByClasscode/${classCode}`);
            const quackamoleResponse = await fetch(`${expoconfig.API_URL}/api/quackamoleScores/getquackamoleScoresByClasscode/${classCode}`);
            const quackmanResponse = await fetch(`${expoconfig.API_URL}/api/quackmanScores/getquackmanScoresByClasscode/${classCode}`);

            if (quackslateResponse.ok && quackamoleResponse.ok && quackmanResponse.ok) {
                const quackslateData = await quackslateResponse.json();
                const quackamoleData = await quackamoleResponse.json();
                const quackmanData = await quackmanResponse.json();

                const combinedScoresData = [...quackslateData, ...quackamoleData, ...quackmanData];
                setScoresData(combinedScoresData);
                setFilteredScoresData(combinedScoresData);
            } else {
                console.error('Failed to fetch scores data');
            }
        } catch (error) {
            console.error('Error fetching scores data:', error);
        }
    };

    useEffect(() => {
        if (activeCategory === 'SCORES' || activeCategory === 'GAMES') {
            fetchScoresData();
        }
    }, [activeCategory]);

    const handleDeleteModalConfirm = async () => {
        setShowDeleteModal(false);
        console.log('Removing students:', selectedStudents);
        try {
            for (let id of selectedStudents) {
                const student = userData.find(user => user.id === id);
                const response = await fetch(`${expoconfig.API_URL}/api/students/removeStudent`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ classCode, name: `${student.fname} ${student.lname}` })
                });
                if (response.ok) {
                    const updatedUserData = userData.filter(user => user.id !== id);
                    setUserData(updatedUserData);
                    console.log('Student removed successfully');
                } else {
                    const errorData = await response.json();
                    console.error('Failed to remove student:', errorData);
                }
            }
        } catch (error) {
            console.error('Error removing students:', error);
        }
    };
    
    

    const handleCategoryPress = (category) => {
        setActiveCategory(category);
    };

    const handleBackPress = () => {
        router.push('/TeacherDashboard');
    };

    const getGameName = (level) => {
        if (level.startsWith('Intro') || level.startsWith('Basics')) {
            return `Quackslate ${level}`;
        } else if (level.startsWith('Hiragana') || level.startsWith('Katakana')) {
            return `Quackamole ${level}`;
        } else {
            return `Quackman ${level}`;
        }
    };

    const handleFilterPress = (game) => {
        setSelectedGame(game);
        if (game) {
            const filteredData = scoresData.filter(score => getGameName(score.level).includes(game));
            setFilteredScoresData(filteredData);
        } else {
            setFilteredScoresData(scoresData);
        }
        setShowFilterModal(false);
    };

    const toggleSelectScore = (id) => {
        const newSelectedScores = new Set(selectedScores);
        if (newSelectedScores.has(id)) {
            newSelectedScores.delete(id);
        } else {
            newSelectedScores.add(id);
        }
        setSelectedScores(newSelectedScores);
    };

    const toggleSelectStudent = (id) => {
        const newSelectedStudents = new Set(selectedStudents);
        if (newSelectedStudents.has(id)) {
            newSelectedStudents.delete(id);
        } else {
            newSelectedStudents.add(id);
        }
        setSelectedStudents(newSelectedStudents);
    };
    

    const handleRemoveScores = () => {
        if (selectedScores.size === 0) {
            alert('Select a score first');
            return;
        }
        setShowConfirmRemoveModal(true);
    };

    const handleRemoveStudents = () => {
        if (selectedStudents.size === 0) {
            alert('Select a student first');
            return;
        }
        setShowDeleteModal(true);
    };

    const confirmRemoveScores = async () => {
        try {
            for (let id of selectedScores) {
                let gameType = getGameTypeFromId(id);
                await fetch(`${expoconfig.API_URL}/api/${gameType}/deleteScore/${id}`, {
                    method: 'DELETE'
                });
            }
            alert('Scores removed successfully');
            fetchScoresData();
            setSelectedScores(new Set());
            setShowConfirmRemoveModal(false);
        } catch (error) {
            console.error('Error removing scores:', error);
            alert('Error removing scores');
        }
    };

    const getGameTypeFromId = (id) => {
        const score = scoresData.find(score => score.id === id);
        if (!score) return 'unknown';
        if (score.level.startsWith('Intro') || score.level.startsWith('Basics')) return 'quackslateScores';
        if (score.level.startsWith('Hiragana') || score.level.startsWith('Katakana')) return 'quackamoleScores';
        return 'quackmanScores';
    };

    return (
        <View style={stylesClass.container}>
            <View style={stylesClass.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesClass.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={stylesClass.menuContainer}>
                <Text style={stylesClass.titleText}>Class: {classCode}</Text>
                <View style={stylesClass.categoryContainer}>
                    <CustomButton title="MEMBERS" onPress={() => handleCategoryPress('MEMBERS')} buttonStyle={stylesClass.categoryButton} textStyle={stylesClass.categoryButtonText} />
                    <CustomButton title="SCORES" onPress={() => handleCategoryPress('SCORES')} buttonStyle={stylesClass.categoryButton} textStyle={stylesClass.categoryButtonText} />
                    <CustomButton title="GAMES" onPress={() => handleCategoryPress('GAMES')} buttonStyle={stylesClass.categoryButton} textStyle={stylesClass.categoryButtonText} />
                </View>
            </View>

            <View>
                {activeCategory === 'MEMBERS' && (
                    <View style={stylesClass.buttonContainer}>
                        <CustomButton title="Remove" onPress={handleRemoveStudents} buttonStyle={stylesClass.button} textStyle={stylesClass.buttonText} />
                    </View>
                )}
                {activeCategory === 'SCORES' && (
                    <View style={stylesClass.buttonContainer}>
                        <CustomButton title="Remove" onPress={handleRemoveScores} buttonStyle={stylesClass.button} textStyle={stylesClass.buttonText} />
                        <CustomButton title="Filter" onPress={() => setShowFilterModal(true)} buttonStyle={stylesClass.button} textStyle={stylesClass.buttonText} />
                    </View>
                )}
            </View>
            <ScrollView contentContainerStyle={stylesClass.contentScrollContainer}>
                <View style={stylesClass.contentContainer}>
                    {activeCategory === 'MEMBERS' && (
                        <View style={stylesClass.membersContentContainer}>
                            {userData.map((user, index) => (
                                <TouchableOpacity key={index} onPress={() => toggleSelectStudent(user.id)}>
                                    <View style={[stylesClass.content, selectedStudents.has(user.id) && stylesClass.selectedScore]}>
                                        <Text style={stylesClass.classContentText}>
                                            {user.fname} {user.lname}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {activeCategory === 'SCORES' && (
                        <View style={stylesClass.membersContentContainer}>
                            {filteredScoresData.map((score, index) => (
                                <TouchableOpacity key={index} onPress={() => toggleSelectScore(score.id)}>
                                    <View style={[stylesClass.scoreContent, selectedScores.has(score.id) && stylesClass.selectedScore]}>
                                        <Text style={stylesClass.classContentText}>Name: {score.fname} {score.lname}</Text>
                                        <Text style={stylesClass.classContentText}>Score: {score.score}</Text>
                                        <Text style={stylesClass.classContentText}>Game: {getGameName(score.level)}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {activeCategory === 'GAMES' && (
                        <View style={stylesClass.membersContentContainer}>
                            <View style={stylesClass.gameContent}>
                                <CustomButton title="Edit" onPress={() => router.push(`/QuackamoleLevels?classCode=${classCode}`)} buttonStyle={stylesClass.gameButton} textStyle={stylesClass.buttonText} />
                                <View style={stylesClass.gameTextContainer}>
                                    <Text style={stylesClass.gameContentText}>Quackamole</Text>
                                </View>
                                <Icon1 style={stylesClass.floatingIcon} width={150} height={150} fill={'#fff'} />
                            </View>
                            <View style={stylesClass.gameContent}>
                                <CustomButton title="Edit" onPress={() => router.push(`/QuackslateLevels?classCode=${classCode}`)} buttonStyle={stylesClass.gameButton} textStyle={stylesClass.buttonText} />
                                <View style={stylesClass.gameTextContainer}>
                                    <Text style={stylesClass.gameContentText}>Quackslate</Text>
                                </View>
                                <Icon2 style={stylesClass.floatingIcon} width={130} height={130} fill={'#fff'} />
                            </View>
                            <View style={stylesClass.gameContent}>
                                <CustomButton title="Edit" onPress={() => router.push(`/QuackmanLevels?classCode=${classCode}`)} buttonStyle={stylesClass.gameButton} textStyle={stylesClass.buttonText} />
                                <View style={stylesClass.gameTextContainer}>
                                    <Text style={stylesClass.gameContentText}>Quackman</Text>
                                </View>
                                <Icon3 style={stylesClass.floatingIcon} width={175} height={175} fill={'#fff'} />

                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showFilterModal}
                onRequestClose={() => setShowFilterModal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Filter by Game</Text>
                        <CustomButton title="All" onPress={() => handleFilterPress(null)} buttonStyle={styles.button} textStyle={styles.buttonText} />
                        <CustomButton title="Quackslate" onPress={() => handleFilterPress('Quackslate')} buttonStyle={styles.button} textStyle={styles.buttonText} />
                        <CustomButton title="Quackamole" onPress={() => handleFilterPress('Quackamole')} buttonStyle={styles.button} textStyle={styles.buttonText} />
                        <CustomButton title="Quackman" onPress={() => handleFilterPress('Quackman')} buttonStyle={styles.button} textStyle={styles.buttonText} />
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showDeleteModal}
                onRequestClose={() => setShowDeleteModal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.closeButtonContainer}>
                            <TouchableOpacity onPress={() => setShowDeleteModal(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text}>Are you sure you want to remove these students?</Text>
                        <View style={styles.buttonRow}>
                            <CustomButton title="Yes" onPress={handleDeleteModalConfirm} buttonStyle={styles.button} textStyle={styles.buttonText} />
                            <CustomButton title="No" onPress={() => setShowDeleteModal(false)} buttonStyle={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showConfirmRemoveModal}
                onRequestClose={() => setShowConfirmRemoveModal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to remove these scores?</Text>
                        <View style={styles.buttonRow}>
                            <CustomButton title="Yes" onPress={confirmRemoveScores} buttonStyle={styles.button} textStyle={styles.buttonText} />
                            <CustomButton title="No" onPress={() => setShowConfirmRemoveModal(false)} buttonStyle={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ClassDashboard;
