import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import BackIcon from '../assets/svg/back-icon.svg';
import styles from '../styles/stylesWords';
import expoconfig from '../expoconfig';
import { useLessonProgress } from '../context/LessonProgressContext';

const Words = () => {
  const router = useRouter();
  const lessonId = useLocalSearchParams();
  const { setCompletedLessons, completedLessons, saveProgress } = useLessonProgress(); // Access progress context
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
      console.error('Error in fetching lesson content: ', error);
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
      console.log('End of word list!');
    }
  };

  const handlePreviousPress = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1); // Move to the previous word
    }
  };

  const handleFinishLesson = async () => {
    
    
    console.log('testing yawa kapoy na');

    try {
      console.log('Raw Lesson ID:', id); // Log raw ID
      const idMapping = {
        '674798f5843fb66cf08dcf7b': '1',
        'abc12345def67890ghi12345': '2',
      };
      const normalizedId = idMapping[id] || 'unknown';
      console.log('Normalized Lesson ID:', normalizedId); // Log normalized ID
  
      if (normalizedId === '1') {
        setCompletedLessons(prev => {
          const updated = { ...prev, vocab1: true };
          saveProgress(updated);
          console.log('Updating vocab1:', updated); // Log during update
          return updated;
        });
      } else if (normalizedId === '2') {
        setCompletedLessons(prev => {
          const updated = { ...prev, vocab2: true };
          console.log('Updating vocab2:', updated); // Log during update
          return updated;
        });
      } else {
        console.error('Unexpected Normalized ID:', normalizedId);
      }
  
      setTimeout(() => {
        console.log('State before routing:', completedLessons); // Log updated state
        router.push('/WordsMenu'); // Delay to ensure state reflects
      }, 300); // Delay allows for async updates
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
    }
  };
  
  
  

  // Log whenever the completedLessons changes
  useEffect(() => {
    console.log('State Updated in Completed Lessons:', completedLessons);
  }, [completedLessons]);
  

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
                onPress={
                  currentWordIndex < processedWords.length - 1
                    ? handleNextPress
                    : handleFinishLesson
                }
              >
                <Text style={styles.nextButtonText}>
                  {currentWordIndex < processedWords.length - 1 ? 'Next' : 'Finish'}
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
