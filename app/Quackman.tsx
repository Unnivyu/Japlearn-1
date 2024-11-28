import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Alert, Animated } from 'react-native';
import { stylesQuackman } from '../styles/stylesQuackman';
import { stylesClass } from '../styles/stylesClass';
import BackIcon from '../assets/svg/back-icon.svg';
import CustomButton from '../components/CustomButton';
import expoconfig from '../expoconfig';
import { router } from 'expo-router';

const allRomaji = [
    'a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko', 'sa', 'shi', 'su', 'se', 'so', 'ta', 'chi', 'tsu', 'te', 'to', 
    'na', 'ni', 'nu', 'ne', 'no', 'ha', 'hi', 'fu', 'he', 'ho', 'ma', 'mi', 'mu', 'me', 'mo', 'ya', 'yu', 'yo', 'ra', 'ri', 
    'ru', 're', 'ro', 'wa', 'wo', 'n', 'ga', 'gi', 'gu', 'ge', 'go', 'za', 'ji', 'zu', 'ze', 'zo', 'da', 'ji', 'zu', 'de', 
    'do', 'ba', 'bi', 'bu', 'be', 'bo', 'pa', 'pi', 'pu', 'pe', 'po'
];

const Quackman = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [romajiGrid, setRomajiGrid] = useState([]);
    const [inputRomaji, setInputRomaji] = useState([]);
    const [currentHint, setCurrentHint] = useState('');
    const [wordLength, setWordLength] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [attempts, setAttempts] = useState([null, null, null]); 
    const [gameOver, setGameOver] = useState(false);

    // New states and animation for loading screen
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const fadeAnim = new Animated.Value(1);

    // Simulate realistic loading screen
    useEffect(() => {
        const simulateProgress = () => {
            if (progress >= 100) {
                // End loading animation
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => setIsLoading(false));
                return;
            }

            const randomDelay = Math.random() * 1000 + 500; // Delay between 500ms and 1500ms
            const randomIncrement = Math.min(100 - progress, Math.random() * 10 + 5); // Increment by 5% to 15%

            // Introduce delays at specific percentages to simulate realism
            const delayMultiplier = [45, 75].includes(progress) ? 2000 : randomDelay;

            setTimeout(() => {
                setProgress((prev) => Math.min(100, prev + randomIncrement));
                simulateProgress();
            }, delayMultiplier);
        };

        simulateProgress();
    }, [progress]);

    // Fetch data from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${expoconfig.API_URL}/api/quackmancontent`);
                const json = await response.json();
                if (json.length > 0) {
                    const transformedData = json.map((item) => ({
                        hint: item.description,
                        word: syllabifyWord(item.romajiWord),
                    }));
                    setData(transformedData);
                    loadWord(0); // Load the first word
                } else {
                    console.error("No content received from the backend.");
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);

    const syllabifyWord = (word) => {
        let syllables = [];
        let i = 0;
        while (i < word.length) {
            let found = false;
            for (let len = 2; len > 0; len--) {
                let sub = word.slice(i, i + len);
                if (allRomaji.includes(sub)) {
                    syllables.push(sub);
                    i += len;
                    found = true;
                    break;
                }
            }
            if (!found) {
                console.error(`Invalid syllable in word '${word}' at position ${i}`);
                return [];
            }
        }
        return syllables;
    };

    useEffect(() => {
        if (data.length > 0) {
            loadWord(currentWordIndex);
        }
    }, [currentWordIndex, data]);

    const loadWord = (index) => {
        if (index < data.length) {
            const selectedData = data[index];
            const { hint, word } = selectedData;

            setCurrentHint(hint);
            setWordLength(word.length);
            const grid = fillGrid(word, allRomaji, 12);
            setRomajiGrid(grid);
            setInputRomaji([]);
            setAttempts([null, null, null]);
        }
    };

    const fillGrid = (syllables, allSyllables, gridSize) => {
        const filledGrid = [...syllables];

        while (filledGrid.length < gridSize) {
            const randomIndex = Math.floor(Math.random() * allSyllables.length);
            const randomRomaji = allSyllables[randomIndex];
            if (!filledGrid.includes(randomRomaji)) {
                filledGrid.push(randomRomaji);
            }
        }

        for (let i = filledGrid.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filledGrid[i], filledGrid[j]] = [filledGrid[j], filledGrid[i]];
        }

        return filledGrid;
    };

    const toggleRomaji = (char) => {
        setInputRomaji((prevInput) => {
            let newInput;
            if (prevInput.includes(char)) {
                newInput = prevInput.filter((c) => c !== char);
            } else {
                newInput = prevInput.length < wordLength ? [...prevInput, char] : prevInput;
            }

            if (newInput.length === wordLength) {
                setModalVisible(true);
            }

            return newInput;
        });
    };

    const handleConfirm = () => {
        const selectedData = data[currentWordIndex];
        const { word } = selectedData;

        if (inputRomaji.join('') === word.join('')) {
            moveToNextWord();
        } else {
            setAttempts((prevAttempts) => {
                const updatedAttempts = [...prevAttempts];
                updatedAttempts[prevAttempts.findIndex((attempt) => attempt === null)] = false;
                if (updatedAttempts.filter(attempt => attempt === false).length === 3) {
                    moveToNextWord();
                }
                return updatedAttempts;
            });
        }

        setModalVisible(false);
        setInputRomaji([]);
    };

    const moveToNextWord = () => {
        if (currentWordIndex + 1 === data.length) {
            setGameOver(true);
        } else {
            setCurrentWordIndex(currentWordIndex + 1);
        }
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleBackPress = () => {
        setGameOver(false);
        router.push('/Exercises');
    };

    const handleRetry = () => {
        setGameOver(false);
        setCurrentWordIndex(0);
        setAttempts([null, null, null]);
    };

    // Render loading screen
    if (isLoading) {
        return (
            <Animated.View style={[stylesQuackman.loadingContainer, { opacity: fadeAnim }]}>
                <Text style={stylesQuackman.loadingTitle}>Quackman</Text>
                <Image
                    source={require('../assets/quacklogo.png')}
                    style={stylesQuackman.loadingQuackLogo}
                />
                <Text style={stylesQuackman.loadingText}>Loading... {Math.round(progress)}%</Text>
            </Animated.View>
        );
    }

    if (gameOver) {
        return (
            <Modal
                visible={gameOver}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setGameOver(false)}
            >
                <View style={stylesQuackman.modalContainer}>
                    <View style={stylesQuackman.modalContent}>
                        <Text style={stylesQuackman.gameOverText}>Game Over!</Text>
                        <View style={stylesQuackman.buttonRow}>
                            <CustomButton title="OK" onPress={handleBackPress} style={stylesQuackman.endButton} textStyle={stylesQuackman.endButtonText} />
                            <CustomButton title="Retry" onPress={handleRetry} style={stylesQuackman.retryButton} textStyle={stylesQuackman.retryButtonText} />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={stylesClass.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesClass.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={stylesQuackman.progressContainer}>
                <View style={stylesQuackman.progress}>
                    <Text style={stylesQuackman.progressText}>{currentWordIndex + 1}/{data.length}</Text>
                </View>
            </View>
            
            <View style={stylesQuackman.menuContainer}>
                <Image source={require('../assets/quacklogo.png')} style={stylesQuackman.Quacklogo} />
                <Text style={stylesQuackman.textStyle}>Quackman</Text>
            </View>

            <View style={stylesQuackman.attemptsContainer}>
                {attempts.map((attempt, index) => (
                    <View key={index} style={[stylesQuackman.attempt, attempt === false && stylesQuackman.attemptWrong, attempt === true && stylesQuackman.attemptCorrect]}></View>
                ))}
            </View>

            <View style={stylesQuackman.charGridContainer}>
                <View style={stylesQuackman.charGrid}>
                    {romajiGrid.map((char, index) => (
                        <TouchableOpacity key={index} style={[stylesQuackman.charCell, inputRomaji.includes(char) && stylesQuackman.charCellSelected]} onPress={() => toggleRomaji(char)}>
                            <Text style={stylesQuackman.charText}>{char}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={stylesQuackman.hintInputContainer}>
                <View style={stylesQuackman.hintContainer}>
                    <Text style={stylesQuackman.hintText}>
                        {currentHint}
                    </Text>
                </View>
                <View style={stylesQuackman.inputContainer}>
                    {Array.from({ length: wordLength }, (_, index) => (
                        <View key={index} style={[stylesQuackman.inputCell]}>
                            <Text style={stylesQuackman.inputText}>{inputRomaji[index]}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={stylesQuackman.modalContainer}>
                    <View style={stylesQuackman.modalContent}>
                        <Text style={stylesQuackman.modalText}>Are you sure you want to submit?</Text>
                        <View style={stylesQuackman.modalButtons}>
                            <CustomButton style={stylesQuackman.modButton} title="Cancel" onPress={handleCancel} />
                            <CustomButton style={stylesQuackman.modButton} title="Confirm" onPress={handleConfirm} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Quackman;
