import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { stylesEdit } from '../styles/stylesEdit';
import { styles } from '../styles/stylesModal';
import BackIcon from '../assets/svg/back-icon.svg';
import CustomButton from '../components/CustomButton';
import { useRouter } from 'expo-router';

const QuackmanContent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [content, setContent] = useState([]);
    const [word, setWord] = useState('');
    const [description, setDescription] = useState('');
    const [editWord, setEditWord] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);

    const router = useRouter();

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/quackmancontent');
            const data = await response.json();
            if (response.ok) {
                setContent(data);
            } else {
                console.error('Failed to fetch content:', data);
                Alert.alert('Error', 'Failed to fetch content.');
            }
        } catch (error) {
            console.error('Error fetching content:', error);
            Alert.alert('Error', 'Failed to fetch content.');
        }
    };

    const handleAddContent = async () => {
        try {
            const newContent = { romajiWord: word, description };
            const response = await fetch('http://localhost:8080/api/quackmancontent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContent),
            });

            if (response.ok) {
                Alert.alert('Success', 'Content added successfully!');
                setModalVisible(false);
                setWord('');
                setDescription('');
                fetchContent();
            } else {
                const errorData = await response.text();
                console.error('Failed to add content:', errorData);
                Alert.alert('Error', 'Failed to add content.');
            }
        } catch (error) {
            console.error('Error adding content:', error);
            Alert.alert('Error', 'Failed to add content.');
        }
    };

    const handleEditContent = async () => {
        try {
            const updatedContent = { romajiWord: editWord, description: editDescription };
            const response = await fetch(`http://localhost:8080/api/quackmancontent/${content[selectedIndex].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedContent),
            });

            if (response.ok) {
                Alert.alert('Success', 'Content updated successfully!');
                setEditModalVisible(false);
                setEditWord('');
                setEditDescription('');
                fetchContent();
            } else {
                const errorData = await response.text();
                console.error('Failed to update content:', errorData);
                Alert.alert('Error', 'Failed to update content.');
            }
        } catch (error) {
            console.error('Error updating content:', error);
            Alert.alert('Error', 'Failed to update content.');
        }
    };

    const handleRemoveContent = async () => {
        try {
            const idToRemove = content[selectedIndex].id;
            const response = await fetch(`http://localhost:8080/api/quackmancontent/${idToRemove}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Alert.alert('Success', 'Content removed successfully!');
                setConfirmModalVisible(false);
                setSelectedIndex(null);
                fetchContent();
            } else {
                const errorData = await response.text();
                console.error('Failed to remove content:', errorData);
                Alert.alert('Error', 'Failed to remove content.');
            }
        } catch (error) {
            console.error('Error removing content:', error);
            Alert.alert('Error', 'Failed to remove content.');
        }
    };

    const handleOpenEditModal = (index) => {
        setSelectedIndex(index);
        setEditWord(content[index].romajiWord);
        setEditDescription(content[index].description);
        setEditModalVisible(true);
    };

    const handleLongPressForRemoval = (index) => {
        setSelectedIndex(index);
        setConfirmModalVisible(true);
    };

    const handleBackPress = () => {
        router.back();
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={stylesEdit.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesEdit.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={stylesEdit.titleTextContainer}>
                <Text style={stylesEdit.titleText}>Quackman Content</Text>
            </View>
            <View style={stylesEdit.buttonContainer}>
                <CustomButton
                    title="Add"
                    onPress={() => setModalVisible(true)}
                    buttonStyle={stylesEdit.button}
                    textStyle={stylesEdit.buttonText}
                />
            </View>

            <ScrollView style={{ flex: 1 }}>
                {content.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => handleOpenEditModal(index)}
                        onLongPress={() => handleLongPressForRemoval(index)}
                    >
                        <View
                            style={[
                                stylesEdit.quackmaneditContent,
                                selectedIndex === index && stylesEdit.selected,
                            ]}
                        >
                            <Text style={stylesEdit.contentText}>{`Word: ${item.romajiWord}`}</Text>
                            <Text style={stylesEdit.contentText}>{`Description: ${item.description}`}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Add Modal */}
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Enter new content:</Text>
                            <TextInput
                                style={styles.input}
                                value={word}
                                onChangeText={setWord}
                                placeholder="Enter Romaji Word"
                            />
                            <TextInput
                                style={styles.input}
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Enter Description"
                            />
                            <CustomButton
                                title="Add"
                                onPress={handleAddContent}
                                buttonStyle={styles.button}
                                textStyle={styles.buttonText}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Edit Modal */}
            <Modal animationType="slide" transparent={true} visible={editModalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Edit content:</Text>
                            <TextInput
                                style={styles.input}
                                value={editWord}
                                onChangeText={setEditWord}
                                placeholder="Edit Romaji Word"
                            />
                            <TextInput
                                style={styles.input}
                                value={editDescription}
                                onChangeText={setEditDescription}
                                placeholder="Edit Description"
                            />
                            <CustomButton
                                title="Save"
                                onPress={handleEditContent}
                                buttonStyle={styles.button}
                                textStyle={styles.buttonText}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Confirm Delete Modal */}
            <Modal animationType="slide" transparent={true} visible={confirmModalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>Are you sure you want to delete this content?</Text>
                        <View style={styles.buttonRow}>
                            <CustomButton
                                title="Yes"
                                onPress={handleRemoveContent}
                                buttonStyle={styles.button}
                                textStyle={styles.buttonText}
                            />
                            <CustomButton
                                title="No"
                                onPress={() => setConfirmModalVisible(false)}
                                buttonStyle={styles.button}
                                textStyle={styles.buttonText}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default QuackmanContent;
