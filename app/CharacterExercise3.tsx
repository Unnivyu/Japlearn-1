import { View, TouchableOpacity, Text, Image, Pressable } from 'react-native';
import { styles } from "../styles/stylesCharacterExercise";
import BackIcon from '../assets/svg/back-icon.svg';
import cardBackImage from '../assets/img/card_back.png';
import { useRouter } from 'expo-router';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import expoconfig from '../expoconfig';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const CharacterExercise3 = () => {
    const { user } = useContext(AuthContext); // Get the user object (which includes email)

    const router = useRouter();
    const characters = [
        { romaji: 'ma', hiragana: 'ま' },
        { romaji: 'mi', hiragana: 'み' },
        { romaji: 'mu', hiragana: 'む' },
        { romaji: 'me', hiragana: 'め' },
        { romaji: 'mo', hiragana: 'も' },
        { romaji: 'ya', hiragana: 'や' },
        { romaji: 'yu', hiragana: 'ゆ' },
        { romaji: 'yo', hiragana: 'よ' },
        { romaji: 'ra', hiragana: 'ら' },
        { romaji: 'ri', hiragana: 'り' },
        { romaji: 'ru', hiragana: 'る' },
        { romaji: 're', hiragana: 'れ' },
        { romaji: 'ro', hiragana: 'ろ' },
        { romaji: 'wa', hiragana: 'わ' },
        { romaji: 'wo', hiragana: 'を' },
        { romaji: 'n', hiragana: 'ん' }
    ];

    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [flippedCard, setFlippedCard] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [message, setMessage] = useState('');
    const [cards, setCards] = useState([]);
    const [gameState, setGameState] = useState('preview'); // 'preview' or 'active'

    // Split characters into sets of 8
    const sets = [];
    for (let i = 0; i < characters.length; i += 8) {
        sets.push(characters.slice(i, i + 8));
    }

    // Shuffle cards and set the current cards for the match game
    const prepareMatchGame = (setIndex) => {
        const currentSet = sets[setIndex];
        const shuffledSet = shuffleArray([...currentSet.map(c => ({ ...c }))]);
        setCards(shuffledSet);
        setFlippedCard(null);
        setMatchedPairs([]);
        setGameState('preview'); // Start in preview state

        // Set a timeout to flip cards back after 5 seconds and start the game
        setTimeout(() => {
            setGameState('active');
        }, 5000);
    };

    const currentSet = sets[currentSetIndex];
    const currentRomaji = currentSet[matchedPairs.length]?.romaji;

    const handleCardFlip = (index) => {
        if (gameState !== 'active') return; // Ignore taps if game is not active

        const card = cards[index];
        if (matchedPairs.includes(index) || flippedCard === index) {
            return;
        }

        setFlippedCard(index);

        if (card.romaji === currentRomaji) {
            setMatchedPairs(prev => [...prev, index]);

            setTimeout(() => {
                setFlippedCard(null);

                if (matchedPairs.length + 1 === cards.length) {
                    setTimeout(() => {
                        const nextSetIndex = currentSetIndex + 1;
                        if (nextSetIndex < sets.length) {
                            setCurrentSetIndex(nextSetIndex);
                        } else {
                            setMessage('Exercise completed!');
                        }
                    }, 1000);
                }
            }, 500);
        } else {
            setTimeout(() => {
                setFlippedCard(null);
            }, 500);
        }
    };

    const handleBackPress = () => {
        router.back();
    };

    const handleCompleteExercise = async () => {
        if (user && user.email) {
            try {
              const response = await fetch(
                `${expoconfig.API_URL}/api/progress/${user.email}/updateField?field=hiragana3&value=true`,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
      
              if (response.ok) {
                console.log("Hiragana3 progress updated successfully!"); // Success message
              } else {
                const error = await response.json();
                console.log(error.message || "An error occurred.");
              }
            } catch (error) {
              console.log(`Error: ${error.message}`);
            }
          } else {
            console.error('No user email found.');
          }
    
        // Navigate to the Hiragana menu
        router.push("/HiraganaMenu");
    };

    const handleRestart = () => {
        setCurrentSetIndex(0);
        setFlippedCard(null);
        setMatchedPairs([]);
        setMessage('');
        prepareMatchGame(0);
    };

    useEffect(() => {
        prepareMatchGame(currentSetIndex);
    }, [currentSetIndex]);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={styles.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.matchGame}>
                <Text style={styles.matchGameText}>
                    {gameState === 'preview'
                        ? 'Memorize the placement!'
                        : currentRomaji
                        ? `Match the card for romaji: ${currentRomaji}`
                        : ''}
                </Text>
                <View style={styles.cardsContainer}>
                    {cards.map((card, index) => {
                        const isCardFlipped =
                            gameState === 'preview' ||
                            flippedCard === index ||
                            matchedPairs.includes(index);
                        const isCardMatched = matchedPairs.includes(index);

                        const cardStyle = {
                            ...styles.card,
                            opacity: isCardMatched ? 0 : 1,
                        };

                        return (
                            <TouchableOpacity
                                key={index}
                                style={cardStyle}
                                onPress={() => handleCardFlip(index)}
                                disabled={gameState !== 'active' || isCardMatched}
                            >
                                {isCardFlipped ? (
                                    <Text style={styles.cardText}>{card.hiragana}</Text>
                                ) : (
                                    <Image source={cardBackImage} style={styles.cardImage} />
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
                {message && (
                    <View style={styles.messageContainer}>
                                        <Text style={styles.message}>{message}</Text>
                                        <Pressable style={styles.nextButton} onPress={handleCompleteExercise}>
                                            <Text style={styles.nextButtonText}>Done</Text>
                                        </Pressable>
                                    </View>
                )}
            </View>
        </View>
    );
};

export default CharacterExercise3;
