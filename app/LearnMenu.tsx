import {
  View,
  Pressable,
  ImageBackground,
  Modal,
  Animated,
  Text,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/stylesLearnMenu';
import BackIcon from '../assets/svg/back-icon.svg';
import ImageButton from '../components/ImageButton';
import { useLessonProgress } from '../context/LessonProgressContext';

const LearnMenu = () => {
  const { completedLessons } = useLessonProgress(); // Access lesson progress
  const router = useRouter();
  const { fromContent3 } = useLocalSearchParams(); // Query param to check if routed from Content3

  const [isBadgeVisible, setBadgeVisible] = useState(false);
  const badgeScale = useState(new Animated.Value(0))[0];
  const badgeSpin = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (fromContent3 === 'true') {
      setBadgeVisible(true);
      animateBadge();
    }
  }, [fromContent3]);

  const animateBadge = () => {
    Animated.parallel([
      Animated.timing(badgeScale, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(badgeSpin, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBadgeDismiss = () => {
    Animated.timing(badgeScale, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setBadgeVisible(false);
    });
  };

  const handleBackPress = () => {
    router.push('/Menu');
  };

  const handleButtonPress = (buttonTitle) => {
    switch (buttonTitle) {
      case 'KANA':
        router.push('/KanaMenu');
        break;
      case 'WORDS':
        router.push('/WordsMenu');
        break;
      case 'GRAMMAR':
        router.push('/Content3');
        break;
      default:
        console.log(`${buttonTitle} button pressed`);
    }
  };

  const resetBadgeState = async () => {
    await AsyncStorage.removeItem('fromContent3');
    setBadgeVisible(false);
    console.log('Badge state reset. You can now trigger the animation again.');
  };

  // Check if both vocab1 and vocab2 are completed to unlock Grammar
  const isGrammarUnlocked = completedLessons.vocab1 && completedLessons.vocab2;

  const coinSpin = badgeSpin.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '360deg'],
  });

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
          {/* KANA Button */}
          <ImageButton
            title="KANA"
            subtitle="Introduction to KANA"
            onPress={() => handleButtonPress('KANA')}
            imageSource={require('../assets/img/kana_button.png')}
            infoContent="This lesson introduces you to the KANA characters."
          />

          {/* WORDS Button - Locked unless Katakana Menu is completed */}
          <ImageButton
            title="WORDS"
            subtitle="Learn basic words"
            onPress={() => handleButtonPress('WORDS')}
            imageSource={require('../assets/img/words_button.png')}
            infoContent="This lesson helps you learn basic Japanese words."
            buttonStyle={!completedLessons.katakanaMenu ? styles.disabledButton : null}
            textStyle={!completedLessons.katakanaMenu ? styles.disabledText : null}
            disabled={!completedLessons.katakanaMenu}
          />

          {/* GRAMMAR Button - Locked unless vocab1 and vocab2 are completed */}
          <ImageButton
            title="GRAMMAR"
            subtitle="Understand basic grammar"
            onPress={() => handleButtonPress('GRAMMAR')}
            imageSource={require('../assets/img/grammar_button.png')}
            infoContent="This lesson covers basic Japanese grammar."
            buttonStyle={!isGrammarUnlocked ? styles.disabledButton : null}
            textStyle={!isGrammarUnlocked ? styles.disabledText : null}
            disabled={!isGrammarUnlocked} // Unlock when both vocab1 and vocab2 are true
          />
        </View>

        {/* Badge Modal */}
        {isBadgeVisible && (
          <Modal transparent={true} animationType="none" visible={isBadgeVisible}>
            <TouchableWithoutFeedback onPress={handleBadgeDismiss}>
              <View style={styles.awardModalContainer}>
                <Animated.View
                  style={[
                    styles.backdropLight,
                    { transform: [{ scale: badgeScale }] },
                  ]}
                />
                <Animated.Image
                  source={require('../assets/sentence_badge.png')}
                  style={[
                    styles.awardBadge,
                    {
                      transform: [{ scale: badgeScale }, { rotateY: coinSpin }],
                    },
                  ]}
                />
                <Text style={styles.congratsMessage}>
                  Congratulations on mastering the Sentence Lesson!
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}

        {/* Reset Button */}
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Button title="Reset Badge State" onPress={resetBadgeState} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default LearnMenu;
