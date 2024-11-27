import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import BackIcon from '../assets/svg/back-icon.svg';
import styles from '../styles/stylesWords';
import expoconfig from '../expoconfig';

const Words = () => {
  const router = useRouter();
  const lessonId = useLocalSearchParams();
  const [lessonContent, setLessonContent] = useState([]);
  const [processedWords, setProcessedWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Current word index
  const id = lessonId?.lessonId;

  const handleFetchLessonContent = async () => {
    try {
      const response = await fetch(`${expoconfig.API_URL}/api/lessonPage/getAllLessonPage/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const lessonPageData = await response.json();

      const allLessonContent = [];

      for (const lessonPage of lessonPageData) {
        const content = await fetch(`${expoconfig.API_URL}/api/lessonContent/getAllLessonContentWithFiles/${lessonPage.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const lessonContentData = await content.json();
        allLessonContent.push(...lessonContentData);
      }

      setLessonContent(allLessonContent);
    } catch (error) {
      console.error("Error in fetching lesson content: ", error);
    }
  };

  useEffect(() => {
    if (id) {
      handleFetchLessonContent();
    }
  }, [id]);

  useEffect(() => {
    if (lessonContent.length > 0) {
      const contentWithText = lessonContent.find(item => item.text_content);
      if (contentWithText) {
        const parsedWords = contentWithText.text_content
          .match(/\(word: [^)]*\)/g) // Extract individual word groups
          .map(entry => {
            const [word, romaji, translation] = entry
              .replace(/[()]/g, '') // Remove parentheses
              .split(', ') // Split by commas
              .map(str => str.split(': ')[1]); // Extract value after `: `
            return { word, romaji, translation, image: require('../assets/hello.png') }; // Replace with actual image if available
          });

        setProcessedWords(parsedWords);
      }
    }
  }, [lessonContent]);

  const handleBackPress = () => {
    router.back(); // Navigate to the previous screen
  };

  const handleNextPress = () => {
    if (currentWordIndex < processedWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1); // Move to the next word
    } else {
      console.log("End of word list!");
    }
  };

  const handlePreviousPress = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1); // Move to the previous word
    }
  };

  const currentWord = processedWords[currentWordIndex];

  return (
    <ImageBackground
      source={require('../assets/img/MenuBackground.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={handleBackPress}>
            <View style={styles.backButtonContainer}>
              <BackIcon width={30} height={30} fill={'white'} />
            </View>
          </Pressable>
        </View>

        {/* Word Content */}
        {currentWord ? (
          <View style={styles.contentContainer}>
            <Image source={currentWord.image} style={styles.image} />
            <Text style={styles.japanese}>{currentWord.word}</Text>
            <Text style={styles.romaji}>{currentWord.romaji}</Text>
            <Text style={styles.english}>{currentWord.translation}</Text>

            {/* Navigation Buttons */}
            <View style={styles.navigationContainer}>
              <Pressable
                style={[
                  styles.nextButton,
                  currentWordIndex === 0 && styles.disabledButton, // Disable styling for first word
                ]}
                onPress={handlePreviousPress}
                disabled={currentWordIndex === 0} // Disable button if at the first word
              >
                <Text style={styles.nextButtonText}>Previous</Text>
              </Pressable>

              <Pressable
                style={styles.nextButton}
                onPress={handleNextPress}
              >
                <Text style={styles.nextButtonText}>
                  {currentWordIndex < processedWords.length - 1 ? "Next" : "Finish"}
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
