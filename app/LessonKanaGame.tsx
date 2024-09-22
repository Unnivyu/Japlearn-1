import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { Audio } from 'expo-av';
import CustomButton from '../components/CustomButton';
import styles from '../styles/stylesLessonKanaGame';

const kanaCards = [
    { id: 'a', kana: 'あ', roman: 'a' },
    { id: 'i', kana: 'い', roman: 'i' },
    // More cards can be added here
];

const duplicateAndShuffle = (arr) => {
    const duplicated = arr.reduce((acc, item) => acc.concat([item, {...item}]), []);
    for (let i = duplicated.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [duplicated[i], duplicated[j]] = [duplicated[j], duplicated[i]]; // Swap elements
    }
    return duplicated;
};

const LessonKanaGame = () => {
    const [cards, setCards] = useState(duplicateAndShuffle(kanaCards));
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [matchedIndices, setMatchedIndices] = useState([]);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [correctSound, setCorrectSound] = useState(null);
    const [incorrectSound, setIncorrectSound] = useState(null);

    useEffect(() => {
        loadSounds();
        return () => {
            correctSound?.unloadAsync();
            incorrectSound?.unloadAsync();
        };
    }, []);

    const loadSounds = async () => {
        const { sound: correct } = await Audio.Sound.createAsync(
            require('../assets/audio/sfx/correct_sfx.mp3')
        );
        const { sound: incorrect } = await Audio.Sound.createAsync(
            require('../assets/audio/sfx/incorrect_sfx.mp3')
        );
        setCorrectSound(correct);
        setIncorrectSound(incorrect);
    };

    const handlePressCard = async (index) => {
        const alreadySelected = selectedIndices.includes(index);
        const newSelectedIndices = alreadySelected ? selectedIndices : [...selectedIndices, index];
        setSelectedIndices(newSelectedIndices);

        if (newSelectedIndices.length === 2) {
            const match = cards[newSelectedIndices[0]].roman === cards[newSelectedIndices[1]].roman;
            setTimeout(() => {
                setSelectedIndices([]);
            }, 1000);

            if (match) {
                correctSound?.playAsync();
                const newMatchedIndices = [...matchedIndices, ...newSelectedIndices];
                setMatchedIndices(newMatchedIndices);
                if (newMatchedIndices.length === cards.length) {
                    setGameCompleted(true);
                }
            } else {
                incorrectSound?.playAsync();
            }
        }
    };

    return (
        <View style={styles.container}>
            {cards.map((card, index) => (
                <TouchableOpacity key={index} style={styles.card} onPress={() => handlePressCard(index)}
                    disabled={matchedIndices.includes(index)}>
                    {selectedIndices.includes(index) || matchedIndices.includes(index) ? (
                        <Text style={styles.cardText}>{card.kana}</Text>
                    ) : (
                        <Image source={require('../assets/img/card_back.png')} style={styles.cardImage} />
                    )}
                </TouchableOpacity>
            ))}

            <Modal
                animationType="fade"
                transparent={true}
                visible={gameCompleted}
                onRequestClose={() => setGameCompleted(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Congratulations! You've matched all the cards!</Text>
                        <CustomButton
                            title="Retry"
                            onPress={() => {
                                setMatchedIndices([]);
                                setCards(duplicateAndShuffle(kanaCards));
                                setGameCompleted(false);
                            }}
                            buttonStyle={styles.modalButton}
                            textStyle={styles.modalButtonText}
                        />
                        <CustomButton
                            title="Continue"
                            onPress={() => {}}
                            buttonStyle={styles.modalButton}
                            textStyle={styles.modalButtonText}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default LessonKanaGame;
