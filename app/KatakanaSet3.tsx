import React, { useContext, useState } from 'react';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import BackIcon from '../assets/svg/back-icon.svg';
import styles from '../styles/stylesHiraganaSet1'; // Reusing styles from HiraganaSet1
import CompletionModal from '../components/CompletionModal';
import { AuthContext } from '../context/AuthContext';
import expoconfig from '../expoconfig'; // Import the configuration for your backend API

const KatakanaSet3 = () => {
  const { user } = useContext(AuthContext); // Get the user object (which includes email)
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const katakanaSet = [
    { character: 'マ', romaji: 'ma' },
    { character: 'ミ', romaji: 'mi' },
    { character: 'ム', romaji: 'mu' },
    { character: 'メ', romaji: 'me' },
    { character: 'モ', romaji: 'mo' },
    { character: 'ヤ', romaji: 'ya' },
    { character: 'ユ', romaji: 'yu' },
    { character: 'ヨ', romaji: 'yo' },
    { character: 'ラ', romaji: 'ra' },
    { character: 'リ', romaji: 'ri' },
    { character: 'ル', romaji: 'ru' },
    { character: 'レ', romaji: 're' },
    { character: 'ロ', romaji: 'ro' },
    { character: 'ワ', romaji: 'wa' },
    { character: 'ヲ', romaji: 'wo' },
    { character: 'ン', romaji: 'n' },
  ];

  // Update backend to set 'katakana3' to true
  // const updateKatakanaProgress = async () => {
  //   if (user && user.email) {
  //     try {
  //       const response = await fetch(
  //         `${expoconfig.API_URL}/api/progress/${user.email}/updateField?field=katakana3&value=true`,
  //         {
  //           method: 'PUT',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );

  //       if (response.ok) {
  //         console.log("Katakana3 progress updated successfully!"); // Success message
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
    if (currentIndex < katakanaSet.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setModalVisible(true);
    }
  };

  const handleBackPress = () => {
    router.push("/KatakanaMenu");
  };
  const handlePreviousPress = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleCompletePress = async () => {
    // Update the backend to mark Katakana3 as completed
    // await updateKatakanaProgress();

    setModalVisible(false); // Close the modal
    router.push('/CharacterExercise6'); // Navigate to the next exercise
  };


  return (
    <ImageBackground
      source={require('../assets/img/MenuBackground.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={handleBackPress}>
            <View style={styles.backButtonContainer}>
              <BackIcon width={20} height={20} fill={'white'} />
            </View>
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.character}>{katakanaSet[currentIndex].character}</Text>
          <Text style={styles.romaji}>{katakanaSet[currentIndex].romaji}</Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.backButton} onPress={handlePreviousPress}>
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
          message="Fantastic work! You have mastered the third set of Katakana characters!"
        />
      </View>
    </ImageBackground>
  );
};

export default KatakanaSet3;
