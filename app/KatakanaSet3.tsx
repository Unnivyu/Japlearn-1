import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import BackIcon from '../assets/svg/back-icon.svg';
import styles from '../styles/stylesHiraganaSet1';
import CompletionModal from '../components/CompletionModal';
import { useLessonProgress } from '../context/LessonProgressContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KatakanaSet3 = () => {
  const router = useRouter();
  const { setCompletedLessons, completedLessons } = useLessonProgress();

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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  

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

  const handleCompletePress = async () => {
    console.log('Marking Katakana Basics 3 as complete...');
    setCompletedLessons({ ...completedLessons, katakana3: true });
    console.log('Current Progress State:', completedLessons);

    setModalVisible(false); // Close the modal
    router.push('/CharacterExercise6');
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
          <Pressable style={styles.nextButton} onPress={handleNextPress}>
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
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
