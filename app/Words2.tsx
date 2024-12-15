import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import BackIcon from '../assets/svg/back-icon.svg';
import styles from '../styles/stylesWords';
import expoconfig from '../expoconfig';
import { AuthContext } from '../context/AuthContext';


const Words = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [processedWords, setProcessedWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Current word index
  const vocabulary = [
    { word: "きょうし", romaji: "kyoushi", translation: "teacher, instructor" },
    { word: "せんせい", romaji: "sensei", translation: "teacher, instructor (as an address)" },
    { word: "がくせい", romaji: "gakusei", translation: "student" },
    { word: "りゅうがくせい", romaji: "ryuugakusei", translation: "foreign student" },
    { word: "けんきゅうしゃ", romaji: "kenkyuusha", translation: "researcher, scholar" },
    { word: "ぎんこういん", romaji: "ginkouin", translation: "bank employee" },
    { word: "エンジニア", romaji: "enjinia", translation: "engineer" },
    { word: "いしゃ", romaji: "isha", translation: "medical doctor" },
    { word: "はいしゃ", romaji: "haisha", translation: "dentist" },
    { word: "べんごし", romaji: "bengoshi", translation: "lawyer" },
    { word: "とこや", romaji: "tokoya", translation: "barber" },
    { word: "かいしゃいん", romaji: "kaishain", translation: "company employee" },
    { word: "~しゃいん", romaji: "~shain", translation: "employee of ~" }
  ];

  const handleBackPress = () => {
    router.back(); // Navigate to the previous screen
  };

  const handleNextPress = () => {
    if (currentWordIndex < vocabulary.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1); // Move to the next word
    } else {
      console.log('End of word list!');
    }
  };

  const handlePreviousPress = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1); // Move to the previous word
    }
  };

  const handleFinishLesson = async () => {
    console.log('Finishing lesson');

    try {
      // Determine the field to update based on the lessonId (vocab1)
      let fieldToUpdate = 'vocab2';

      // Update the field using the API
      const response = await fetch(`${expoconfig.API_URL}/api/progress/${user.email}/updateField?field=${fieldToUpdate}&value=true`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log(`${fieldToUpdate} updated successfully!`);
      } else {
        console.error(`Failed to update ${fieldToUpdate}`);
      }

      // Redirect to WordsMenu after updating the progress
      
    router.push('/WordsMenu?fromWords=true');

    } catch (error) {
      console.error('Error marking lesson as complete:', error);
    }
  };

  const currentWord = vocabulary[currentWordIndex];

  return (
    <ImageBackground
      source={require('../assets/img/MenuBackground.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <View style={styles.backButtonContainer}>
              <BackIcon width={30} height={30} fill={'white'} />
            </View>
          </Pressable>
        </View>

        {/* Word Content */}
        {currentWord ? (
          <View style={styles.contentContainer}>
            {/* Word Image */}
            <Image source={require('../assets/hello.png')} style={styles.image} />
            <Text style={styles.japanese}>{currentWord.word}</Text>
            <Text style={styles.romaji}>{currentWord.romaji}</Text>
            <Text style={styles.english}>{currentWord.translation}</Text>

            {/* Navigation Buttons */}
            <View style={styles.navigationContainer}>
              <Pressable
                style={[styles.nextButton, currentWordIndex === 0 && styles.disabledButton]}
                onPress={handlePreviousPress}
                disabled={currentWordIndex === 0}
              >
                <Text style={styles.nextButtonText}>Previous</Text>
              </Pressable>

              <Pressable
                style={styles.nextButton}
                onPress={currentWordIndex < vocabulary.length - 1 ? handleNextPress : handleFinishLesson}
              >
                <Text style={styles.nextButtonText}>
                  {currentWordIndex < vocabulary.length - 1 ? 'Next' : 'Finish'}
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Text style={styles.noWordsText}>No words available!</Text>
        )}
      </View>
    </ImageBackground>
  );
};

export default Words;