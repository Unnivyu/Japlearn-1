import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, Alert, Modal, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../styles/stylesMole';
import { stylesClass } from '../styles/stylesClass';
import BackIcon from '../assets/svg/back-icon.svg';
import Mole from '../assets/svg/mole.svg';
import Hammer from '../assets/hammer.png';
import WhackImage from '../assets/whack.png'; // Import the whack image
import CustomButton from '../components/CustomButton';
import expoconfig from '../expoconfig';

const Quackamole = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [secondCounter, setSecondCounter] = useState(0);
    const [holes, setHoles] = useState(new Array(9).fill(null));
    const [gameOver, setGameOver] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [kanaCharacters, setKanaCharacters] = useState([]);
    const [romajiCharacters, setRomajiCharacters] = useState([]);
    const [hammerPosition, setHammerPosition] = useState({ x: 0, y: 0 });
    const [isHammerVisible, setIsHammerVisible] = useState(false);
    const [whackPosition, setWhackPosition] = useState({ x: 0, y: 0 });
    const [isWhackVisible, setIsWhackVisible] = useState(false);
    const hammerAnimation = useRef(new Animated.Value(0)).current;
    const whackAnimation = useRef(new Animated.Value(0)).current;

    const moleRefs = useRef([]); // Array of refs for moles
    const positionAnimations = useRef(holes.map(() => new Animated.Value(100))).current;
    const opacityAnimations = useRef(holes.map(() => new Animated.Value(0))).current;

    const router = useRouter();

    // Fetch content on mount
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(`${expoconfig.API_URL}/api/quackamolecontent`);
                if (!response.ok) throw new Error('Failed to fetch content');
                const data = await response.json();

                const allKana = data.flatMap(content => content.kana);
                const allRomaji = data.flatMap(content => content.romaji);

                setKanaCharacters(allKana);
                setRomajiCharacters(allRomaji);
            } catch (error) {
                console.error('Error fetching content:', error);
                Alert.alert('Error', 'Failed to load game content.');
            }
        };
        fetchContent();
    }, []);

    // Game logic: moles and counters
    useEffect(() => {
        if (isGameStarted) {
            const gameInterval = setInterval(updateMoles, 2000);
            return () => clearInterval(gameInterval);
        }
    }, [isGameStarted, secondCounter, gameOver]);

    const resetGame = () => {
        setCurrentIndex(0);
        setSecondCounter(0);
        setHoles(new Array(9).fill(null));
        setGameOver(false);
        setAttempts(0);
        setIsGameStarted(true);
    };

    const updateMoles = () => {
        if (secondCounter >= 29 || gameOver) {
            setGameOver(true);
            return;
        }

        let newHoles = new Array(9).fill(null);
        const activeMolesCount = Math.floor(Math.random() * 4) + 1;
        const activeIndexes = [];

        while (activeIndexes.length < activeMolesCount) {
            const randomIndex = Math.floor(Math.random() * 9);
            if (!activeIndexes.includes(randomIndex) && !holes[randomIndex]) {
                activeIndexes.push(randomIndex);
                const randomRomaji = romajiCharacters[Math.floor(Math.random() * romajiCharacters.length)];
                newHoles[randomIndex] = randomRomaji;
                animateMole(randomIndex, true);
                setTimeout(() => {
                    animateMole(randomIndex, false);
                    setTimeout(() => {
                        setHoles((prev) => {
                            const updatedHoles = [...prev];
                            updatedHoles[randomIndex] = null;
                            return updatedHoles;
                        });
                    }, 500);
                }, 1500);
            }
        }

        setHoles((prev) => {
            const updatedHoles = [...prev];
            activeIndexes.forEach((index) => {
                updatedHoles[index] = newHoles[index];
            });
            return updatedHoles;
        });
        setSecondCounter((prev) => prev + 2);
    };

    const animateMole = (index, shouldPopUp) => {
        Animated.parallel([
            Animated.timing(positionAnimations[index], {
                toValue: shouldPopUp ? 0 : 100,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.bounce,
            }),
            Animated.timing(opacityAnimations[index], {
                toValue: shouldPopUp ? 1 : 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const animateHammer = (targetX, targetY) => {
        setHammerPosition({ x: targetX, y: targetY - 50 });
        setIsHammerVisible(true);

        Animated.sequence([
            Animated.timing(hammerAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(hammerAnimation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsHammerVisible(false);
        });
    };

    const animateWhack = (targetX, targetY) => {
        setWhackPosition({ x: targetX, y: targetY - 70 });
        setIsWhackVisible(true);

        Animated.sequence([
            Animated.timing(whackAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(whackAnimation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsWhackVisible(false);
        });
    };

    const handleWhack = (index) => {
        // Measure the mole's position
        moleRefs.current[index]?.measure((x, y, width, height, pageX, pageY) => {
            const hammerX = pageX + width / 2 - 40;
            const hammerY = pageY - 30;
            animateHammer(hammerX, hammerY);
            animateWhack(hammerX, hammerY); // Animate the whack
        });

        if (holes[index] === romajiCharacters[currentIndex]) {
            setTimeout(() => {
                animateMole(index, false);
                setCurrentIndex((prev) => prev + 1);
                setSecondCounter(0);
            }, 200);
        } else {
            setAttempts((prev) => prev + 1);
            if (attempts + 1 >= 3) {
                setCurrentIndex((prev) => prev + 1);
                setSecondCounter(0);
                setAttempts(0);
            }
        }
    };

    const handleBackPress = () => {
        router.push('/Menu');
    };

    const startGame = () => {
        setIsGameStarted(true);
    };

    if (gameOver) {
        return (
            <Modal visible={true} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.gameOverText}>Game Over!</Text>
                        <CustomButton title="OK" onPress={handleBackPress} buttonStyle={undefined} textStyle={undefined} />
                        <CustomButton title="Retry" onPress={resetGame} buttonStyle={undefined} textStyle={undefined} />
                    </View>
                </View>
            </Modal>
        );
    }

    return (
        <View style={styles.mainContainer}>
            {!isGameStarted && (
                <Modal visible={true} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Ready to start the game?</Text>
                            <CustomButton title="Start Game" onPress={startGame} buttonStyle={undefined} textStyle={undefined} />
                        </View>
                    </View>
                </Modal>
            )}
            <View style={stylesClass.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <BackIcon width={20} height={20} fill={'white'} />
                </TouchableOpacity>
            </View>
            <View style={styles.timerContainer}>
                <Text style={styles.timerText}>Time: {29 - secondCounter}s</Text>
            </View>
            <View style={styles.displayContainer}>
                <Text style={styles.charText}>{kanaCharacters[currentIndex]}</Text>
            </View>
            <View style={styles.moleContainer}>
                {holes.map((char, index) => (
                    <View key={index} style={styles.hole}>
                        <Animated.View
                            style={[
                                styles.mole,
                                {
                                    transform: [{ translateY: positionAnimations[index] }],
                                    opacity: opacityAnimations[index],
                                },
                            ]}
                            ref={(ref) => (moleRefs.current[index] = ref)}
                        >
                            {char && (
                                <TouchableOpacity onPress={() => handleWhack(index)} style={styles.moleTouchable}>
                                    <Text style={styles.romajiText}>{char}</Text>
                                    <Mole width={100} height={150} />
                                </TouchableOpacity>
                            )}
                        </Animated.View>
                    </View>
                ))}
            </View>
            {isHammerVisible && (
                <Animated.Image
                    source={Hammer}
                    style={[
                        styles.hammer,
                        {
                            top: hammerPosition.y,
                            left: hammerPosition.x,
                            transform: [
                                { translateY: hammerAnimation.interpolate({ inputRange: [0, 1], outputRange: [0, 50] }) },
                                { rotate: hammerAnimation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-30deg'] }) },
                            ],
                        },
                    ]}
                />
            )}
            {isWhackVisible && (
                <Animated.Image
                    source={WhackImage}
                    style={[
                        styles.whack,
                        {
                            top: whackPosition.y,
                            left: whackPosition.x,
                            opacity: whackAnimation,
                        },
                    ]}
                />
            )}
        </View>
    );
};

export default Quackamole;
