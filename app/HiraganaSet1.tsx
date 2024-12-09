import React, { useState, useContext } from 'react';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import BackIcon from '../assets/svg/back-icon.svg';
import styles from '../styles/stylesHiraganaSet1';
import CompletionModal from '../components/CompletionModal';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import expoconfig from '../expoconfig';

const HiraganaSet1 = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext); // Get the user object (which includes email)

  const hiraganaSet = [
    { character: 'あ', romaji: 'a' },
    { character: 'い', romaji: 'i' },
    { character: 'う', romaji: 'u' },
    { character: 'え', romaji: 'e' },
    { character: 'お', romaji: 'o' },
    { character: 'か', romaji: 'ka' },
    { character: 'き', romaji: 'ki' },
    { character: 'く', romaji: 'ku' },
    { character: 'け', romaji: 'ke' },
    { character: 'こ', romaji: 'ko' },
    { character: 'さ', romaji: 'sa' },
    { character: 'し', romaji: 'shi' },
    { character: 'す', romaji: 'su' },
    { character: 'せ', romaji: 'se' },
    { character: 'そ', romaji: 'so' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  // Function to update progress on the backend using fetch
  const saveProgressOnBackend = async () => {
    if (user && user.email) {
      try {
        const response = await fetch(
          `${expoconfig.API_URL}/api/progress/${user.email}`, // Save "hiragana1" field as true and others as false
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.ok) {
          console.log("Progress saved successfully!"); // Success message
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
  };

  const handleNextPress = () => {
    if (currentIndex < hiraganaSet.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setModalVisible(true);
    }
  };

  const handleBackPress = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCompletePress = () => {
    saveProgressOnBackend(); // Update progress on the backend when the user completes the set
    setModalVisible(false);
    router.push('/CharacterExercise1');
  };

  const handleBackToMenuPress = () => {
    router.push('/HiraganaMenu');
  };

  return (
    <ImageBackground
      source={require('../assets/img/MenuBackground.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={handleBackToMenuPress}>
            <View style={styles.backButtonContainer}>
              <BackIcon width={20} height={20} fill={'white'} />
            </View>
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.character}>{hiraganaSet[currentIndex].character}</Text>
          <Text style={styles.romaji}>{hiraganaSet[currentIndex].romaji}</Text>
          
          <View style={styles.buttonContainer}>
            <Pressable style={styles.backButton} onPress={handleBackPress}>
              <Text style={styles.buttonText}>Back</Text>
            </Pressable>

            <Pressable style={styles.nextButton} onPress={handleNextPress}>
              <Text style={styles.nextButtonText}>Next</Text>
            </Pressable>
          </View>
        </View>

        <CompletionModal
          isVisible={isModalVisible}
          onComplete={handleCompletePress}
          message="Congratulations on completing the first set of Hiragana characters!"
        />
      </View>
    </ImageBackground>
  );
};

export default HiraganaSet1;
