import {
  View,
  Pressable,
  ImageBackground,
  Modal,
  Animated,
  Text,
  Easing,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles from '../styles/stylesLearnMenu';
import BackIcon from '../assets/svg/back-icon.svg';
import ImageButton from '../components/ImageButton';
import { AuthContext } from '../context/AuthContext';
import expoconfig from '../expoconfig';
import { useLessonProgress } from '../context/LessonProgressContext'; // Importing progress context
import AsyncStorage from '@react-native-async-storage/async-storage';

const WordsMenu = () => {
  const { user } = useContext(AuthContext);
  const { completedLessons } = useLessonProgress(); // Access lesson progress
  const router = useRouter();
  const { fromWords } = useLocalSearchParams(); // Get the query parameter to handle badge logic
  const [wordLessons, setWordLessons] = useState([]);
  const [classCode, setClassCode] = useState('');
  const [isBadgeVisible, setBadgeVisible] = useState(false);
  const badgeCheckCompleted = useRef(false); // Prevent duplicate badge logic

  // Badge animation values
  const badgeScale = useRef(new Animated.Value(0)).current;
  const badgeSpin = useRef(new Animated.Value(0)).current;
  const messageOpacity = useRef(new Animated.Value(0)).current;

  const handleBackPress = () => {
    router.push("/LearnMenu");
  };

  const fetchUserClassCode = async () => {
    const userEmail = user?.email;

    try {
      const response = await fetch(`${expoconfig.API_URL}/api/students/getStudentByEmail?email=${encodeURIComponent(userEmail)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const responseData = await response.json();
      setClassCode(responseData.classCode);

    } catch (error) {
      console.log("Error in fetching user data: ", error);
    }
  };

  const fetchWordLesson = async () => {
    try {
      const response = await fetch(`${expoconfig.API_URL}/api/lesson/getLessonByClass/${classCode}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const responseData = await response.json();
      setWordLessons(responseData);

    } catch (error) {
      console.log("Error fetching word lessons: ", error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserClassCode();
    }
  }, [user]);

  useEffect(() => {
    if (classCode) {
      fetchWordLesson(); // Only call fetchWordLesson when classCode is available
    }
  }, [classCode]);

  // Badge logic
  useEffect(() => {
    const checkBadgeShown = async () => {
      if (badgeCheckCompleted.current) return; // Avoid duplicate execution
      badgeCheckCompleted.current = true;

      // Only show the badge if redirected from vocab2 (Finish button)
      if (fromWords !== 'true') return;

      const hasShownBadge = await AsyncStorage.getItem('wordBadgeShown');
      if (!hasShownBadge && completedLessons.vocab2) {
        setBadgeVisible(true);
        await AsyncStorage.setItem('wordBadgeShown', 'true'); // Mark badge as shown
        animateBadge();
      }
    };

    checkBadgeShown();
  }, [fromWords, completedLessons]);

  const animateBadge = () => {
    Animated.parallel([
      Animated.timing(badgeScale, {
        toValue: 1,
        duration: 2000, // Slower animation
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(badgeSpin, {
        toValue: 1, // From 0 to 1 for spin effect
        duration: 2000, // Slower spinning
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(messageOpacity, {
        toValue: 1,
        duration: 1000, // Smoother fade-in
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  const handleBadgeDismiss = () => {
    Animated.parallel([
      Animated.timing(badgeScale, {
        toValue: 0,
        duration: 2000, // Slower shrink
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(badgeSpin, {
        toValue: 0, // Reset to 0 for reverse spin
        duration: 2000, // Slower reverse spinning
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(messageOpacity, {
        toValue: 0,
        duration: 1000, // Smoother fade-out
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => setBadgeVisible(false));
  };

  const resetBadgeState = async () => {
    await AsyncStorage.removeItem('wordBadgeShown');
    setBadgeVisible(false); // Ensure badge is not visible after reset
    badgeCheckCompleted.current = false; // Allow badge check again
  };

  const handleButtonPress = (lessonId) => {
    router.push(`/Words?lessonId=${lessonId}`);
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
        <View style={styles.menuContainer}>
          {wordLessons.length > 0 && wordLessons.map((lesson, index) => (
            <ImageButton
              key={lesson.id}
              title={lesson.lesson_title}
              subtitle={lesson.lesson_type}
              onPress={() => handleButtonPress(lesson.id)}
              imageSource={require('../assets/img/kana_button.png')}
              infoContent={`This lesson is about ${lesson.lesson_type}.`}
              buttonStyle={index > 0 && !completedLessons[`vocab${index}`] ? [styles.disabledButton] : null}
              textStyle={index > 0 && !completedLessons[`vocab${index}`] ? [styles.disabledText] : null}
              disabled={index > 0 && !completedLessons[`vocab${index}`]}
            />
          ))}
        </View>

        {/* Badge Awarding Animation */}
        {isBadgeVisible && (
          <Modal transparent={true} animationType="none" visible={isBadgeVisible}>
            <TouchableWithoutFeedback onPress={handleBadgeDismiss}>
              <View style={[styles.awardModalContainer, { backgroundColor: 'rgba(0, 0, 0, 0.8)' }]}>
                <Animated.View
                  style={[
                    styles.backdropLight,
                    { transform: [{ scale: badgeScale }] },
                  ]}
                />
                <Animated.Image
                  source={require('../assets/word_badge.png')}
                  style={[
                    styles.awardBadge,
                    {
                      transform: [
                        { scale: badgeScale },
                        { rotateY: badgeSpin.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: ['0deg', '180deg', '360deg'],
                          })
                        },
                      ],
                    },
                  ]}
                />
                <Animated.Text
                  style={[
                    styles.congratsMessage,
                    { opacity: messageOpacity },
                  ]}
                >
                  Congratulations on completing the Japanese Vocabulary!
                </Animated.Text>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Button title="Reset Badge State" onPress={resetBadgeState} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default WordsMenu;
