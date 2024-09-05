import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { stylesLevels } from '../styles/stylesLevels';
import BackIcon from '../assets/svg/back-icon.svg';
import CustomButton from '../components/CustomButton';
import ConfirmationModal from '../components/ConfirmationModal';
import { styles } from '../styles/stylesModal';
import expoconfig from '../expoconfig';
import { useRouter, useLocalSearchParams } from 'expo-router';

const QuackslateLevels = () => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [confirmationAction, setConfirmationAction] = useState(() => () => {});
    
    const [newLevelName, setNewLevelName] = useState('');
    const [updatedLevelName, setUpdatedLevelName] = useState('');
    const [levels, setLevels] = useState([]);
    const [selectedLevelID, setSelectedLevelID] = useState(null);
    const { classCode } = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        fetchLevels();
    }, []);

    const fetchLevels = async () => {
        try {
            const response = await fetch(`${expoconfig.API_URL}/api/quackslateLevels/allquackslatelevels?classCode=${classCode}`);
            if (response.ok) {
                const data = await response.json();
                setLevels(data);
            } else {
                throw new Error('Failed to fetch levels');
            }
        } catch (error) {
            console.error('Error fetching levels:', error);
            Alert.alert('Error', 'Failed to fetch levels');
        }
    };

    const handleBackPress = () => {
        router.push(`/ClassDashboard?classCode=${classCode}`);
    };

    const handleAddPress = () => {
        setAddModalVisible(true);
    };

    const handleRemovePress = () => {
        setRemoveModalVisible(true);
    };

    const handleEditPress = (level) => {
        setSelectedLevelID(level.levelID);
        setUpdatedLevelName(level.title);
        setEditModalVisible(true);
    };

    const confirmAction = (message, action) => {
        setConfirmationMessage(message);
        setConfirmationAction(() => action);
        setConfirmationVisible(true);
    };

    const handleAddLevel = async () => {
        try {
            const response = await fetch(`${expoconfig.API_URL}/api/quackslateLevels/addquackslatelevel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    levelID: Math.floor(Math.random() * 10000), // Generate a random ID or handle it differently
                    title: newLevelName,
                    classID: classCode, // Use classCode as classID
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Level added successfully!');
                setAddModalVisible(false);
                setNewLevelName('');
                fetchLevels(); // Refresh the list of levels
            } else {
                throw new Error('Failed to add level');
            }
        } catch (error) {
            console.error('Error adding level:', error);
            Alert.alert('Error', 'Failed to add level');
        }
    };

    const handleRemoveLevel = async () => {
        if (!selectedLevelID) {
            Alert.alert('Error', 'Please select a level to remove.');
            return;
        }

        try {
            const response = await fetch(`${expoconfig.API_URL}/api/quackslateLevels/deletequackslatelevel/${selectedLevelID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Alert.alert('Success', 'Level removed successfully!');
                setRemoveModalVisible(false);
                setSelectedLevelID(null);
                fetchLevels(); // Refresh the list of levels
            } else {
                throw new Error('Failed to remove level');
            }
        } catch (error) {
            console.error('Error removing level:', error);
            Alert.alert('Error', 'Failed to remove level');
        }
    };

    const handleSaveLevel = async () => {
        if (!selectedLevelID) return;

        try {
            const response = await fetch( `${expoconfig.API_URL}/api/quackslateLevels/updatequackslatelevel/${selectedLevelID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    levelID: selectedLevelID,
                    title: updatedLevelName,
                    classID: classCode,
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Level updated successfully!');
                setEditModalVisible(false);
                fetchLevels(); // Refresh the list of levels
            } else {
                throw new Error('Failed to update level');
            }
        } catch (error) {
            console.error('Error updating level:', error);
            Alert.alert('Error', 'Failed to update level');
        }
    };

    const handleLevelNavigate = (levelID, title) => {
        router.push(`/QuackslateEdit?classCode=${classCode}&levelID=${levelID}&title=${title}`);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={stylesLevels.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesLevels.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={stylesLevels.titleTextContainer}>
                <Text style={stylesLevels.titleText}>Quackslate: {classCode}</Text>
            </View>
            <View style={stylesLevels.buttonContainer}>
                <CustomButton title="Add" onPress={handleAddPress} buttonStyle={stylesLevels.button} textStyle={stylesLevels.buttonText} />
                <CustomButton title="Remove" onPress={handleRemovePress} buttonStyle={stylesLevels.button} textStyle={stylesLevels.buttonText} />
            </View>
            <ScrollView contentContainerStyle={stylesLevels.levelContainer} style={{ flex: 1 }}>
                {levels.map((level) => (
                    <TouchableOpacity
                        key={level.levelID}
                        onPress={() => handleLevelNavigate(level.levelID, level.title)}
                        onLongPress={() => handleEditPress(level)}
                    >
                        <View style={stylesLevels.level}>
                            <Text style={stylesLevels.levelText}>{level.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={addModalVisible}
                onRequestClose={() => setAddModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.closeButtonContainer}>
                            <TouchableOpacity onPress={() => setAddModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Enter new level name:</Text>
                            <TextInput
                                style={styles.input}
                                value={newLevelName}
                                onChangeText={setNewLevelName}
                                placeholder="Level Name"
                            />
                            <CustomButton title="Add" onPress={() => confirmAction('Would you like to add this level?', handleAddLevel)} buttonStyle={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={removeModalVisible}
                onRequestClose={() => setRemoveModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.closeButtonContainer}>
                            <TouchableOpacity onPress={() => setRemoveModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Select a level to remove:</Text>
                            <ScrollView style={styles.scrollContainer}>
                                {levels.map((level) => (
                                    <TouchableOpacity key={level.levelID} onPress={() => setSelectedLevelID(level.levelID)}>
                                        <View style={selectedLevelID === level.levelID ? styles.selected : styles.contentModalContainer}>
                                            <Text style={styles.contentText}>{level.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <CustomButton title="Remove" onPress={() => confirmAction('Would you like to remove this level?', handleRemoveLevel)} style={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.closeButtonContainer}>
                            <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Edit level name:</Text>
                            <TextInput
                                style={styles.input}
                                value={updatedLevelName}
                                onChangeText={setUpdatedLevelName}
                                placeholder="Level Name"
                            />
                            <CustomButton title="Save" onPress={() => confirmAction('Would you like to save changes to this level?', handleSaveLevel)} buttonStyle={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </View>
            </Modal>

            <ConfirmationModal
                visible={confirmationVisible}
                onClose={() => setConfirmationVisible(false)}
                onConfirm={() => {
                    setConfirmationVisible(false);
                    confirmationAction();
                }}
                message={confirmationMessage}
            />
        </View>
    );
};

export default QuackslateLevels;
