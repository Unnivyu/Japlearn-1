import React, { useState, useContext } from 'react';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import BackIcon from '../assets/svg/back-icon.svg';
import styles from '../styles/stylesHiraganaSet1'; // Reusing styles from HiraganaSet1
import CompletionModal from '../components/CompletionModal';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext
import expoconfig from '../expoconfig'; // Configuration for your backend API

const HiraganaSet3 = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext); // Get the user object (which includes email)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const hiraganaSet = [
    { character: 'ま', romaji: 'ma' },
    { character: 'み', romaji: 'mi' },
    { character: 'む', romaji: 'mu' },
    { character: 'め', romaji: 'me' },
    { character: 'も', romaji: 'mo' },
    { character: 'や', romaji: 'ya' },
    { character: 'ゆ', romaji: 'yu' },
    { character: 'よ', romaji: 'yo' },
    { character: 'ら', romaji: 'ra' },
    { character: 'り', romaji: 'ri' },
    { character: 'る', romaji: 'ru' },
    { character: 'れ', romaji: 're' },
    { character: 'ろ', romaji: 'ro' },
    { character: 'わ', romaji: 'wa' },
    { character: 'を', romaji: 'wo' },
    { character: 'ん', romaji: 'n' },
  ];

  // Update backend to set 'hiragana3' to true
  // const updateHiraganaProgress = async () => {
  //   if (user && user.email) {
  //     try {
  //       const response = await fetch(
  //         `${expoconfig.API_URL}/api/progress/${user.email}/updateField?field=hiragana3&value=true`,
  //         {
  //           method: 'PUT',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );

  //       if (response.ok) {
  //         console.log("Hiragana3 progress updated successfully!"); // Success message
  //       } else {
  //         const error = await response.json();
  //         console.log(error.message || "An error occurred.");
  //       }
  //     } catch (error) {
  //       console.log(`Error: ${error.message}`);
  //     }
  //   } else {
  //     console.error('No user email found.');
  //   }
  // };

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

  const handleBackToMenuPress = () => {
    router.push('/HiraganaMenu');
  };
  const handleCompletePress = async () => {
    // Update the backend to mark Hiragana3 as completed
    // await updateHiraganaProgress();

    setModalVisible(false); // Close the modal
    router.push('/CharacterExercise3');
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

        {/* Completion Modal */}
        <CompletionModal
          isVisible={isModalVisible}
          onComplete={handleCompletePress}
          message="Fantastic work! You have mastered the third set of Hiragana characters!"
        />
      </View>
    </ImageBackground>
  );
};

export default HiraganaSet3;
