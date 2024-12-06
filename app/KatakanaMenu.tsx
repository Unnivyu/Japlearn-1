import {
  View,
  Pressable,
  ImageBackground,
  Modal,
  Animated,
  Text,
  Image,
  Easing,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter, useLocalSearchParams, usePathname } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/stylesLearnMenu';
import BackIcon from '../assets/svg/back-icon.svg';
import ImageButton from '../components/ImageButton';
import { useLessonProgress } from '../context/LessonProgressContext';

const KatakanaMenu = () => {
  const { completedLessons, setCompletedLessons } = useLessonProgress();
  const router = useRouter();
  const { fromExercise } = useLocalSearchParams(); // Get the query parameter
  const currentPath = usePathname();

  const [isBadgeVisible, setBadgeVisible] = useState(false);
  const badgeCheckCompleted = useRef(false);

  // Badge animation values
  const badgeScale = useRef(new Animated.Value(0)).current;
  const badgeSpin = useRef(new Animated.Value(0)).current;
  const messageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkBadgeShown = async () => {
      // Avoid duplicate execution
      if (badgeCheckCompleted.current) {
        console.log('Badge logic already processed.');
        return;
      }

      // Only execute badge logic if on the KatakanaMenu screen
      if (currentPath !== '/KatakanaMenu') {
        console.log('Not on KatakanaMenu. Skipping badge logic.');
        return;
      }

      badgeCheckCompleted.current = true;

      // Only show the badge if redirected from CharacterExercise6
      if (fromExercise !== 'true') {
        console.log('Not redirected from CharacterExercise6. Skipping badge logic.');
        return;
      }

      const hasShownBadge = await AsyncStorage.getItem('badgeShown');
      console.log('Badge Shown State (from AsyncStorage):', hasShownBadge);

      if (!hasShownBadge && completedLessons.katakana3) {
        console.log('Badge has not been shown yet. Showing now...');
        setBadgeVisible(true);
        await AsyncStorage.setItem('badgeShown', 'true'); // Set badge as shown
        animateBadge();
      } else {
        console.log('Badge has already been shown or no badge trigger.');
      }
    };

    checkBadgeShown();
  }, [completedLessons, fromExercise, currentPath]); // Add currentPath to dependencies

  const animateBadge = () => {
    Animated.parallel([
      Animated.timing(badgeScale, {
        toValue: 1,
        duration: 2000, // Slow enlargement
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(badgeSpin, {
        toValue: 1, // Coin spin effect
        duration: 2000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(messageOpacity, {
        toValue: 1,
        duration: 1000, // Smooth fade-in
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBadgeDismiss = () => {
    Animated.parallel([
      Animated.timing(badgeScale, {
        toValue: 0, // Shrink to zero
        duration: 2000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(badgeSpin, {
        toValue: 0, // Reverse spin
        duration: 2000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(messageOpacity, {
        toValue: 0, // Fade-out
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => setBadgeVisible(false));
  };


  // Interpolating rotateY for 3D coin spin effect
  const coinSpin = badgeSpin.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '360deg'],
  });


  const handleBackPress = () => {
    router.push('/KanaMenu');
  };

  const handleButtonPress = (buttonTitle) => {
    console.log(`Button pressed: ${buttonTitle}`);
    switch (buttonTitle) {
      case 'Katakana Basics 1':
        router.push('/KatakanaSet1');
        break;
      case 'Katakana Basics 2':
        if (completedLessons.katakana1) {
          router.push('/KatakanaSet2');
        }
        break;
      case 'Katakana Basics 3':
        if (completedLessons.katakana2) {
          router.push('/KatakanaSet3');
        }
        break;
      default:
        console.log(`Unhandled button: ${buttonTitle}`);
    }
  };

  const resetBadgeState = async () => {
    await AsyncStorage.removeItem('badgeShown');
    console.log('Badge state has been reset. You can now test the animation again.');
    setBadgeVisible(false); // Ensure badge is not visible after reset
    badgeCheckCompleted.current = false; // Allow badge check again
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
          <ImageButton
            title="Katakana Basics 1"
            subtitle="Learn the first set of Katakana characters"
            onPress={() => handleButtonPress('Katakana Basics 1')}
            imageSource={require('../assets/img/kana_button.png')}
            infoContent="This lesson introduces the first set of Katakana characters."
          />
          <ImageButton
            title="Katakana Basics 2"
            subtitle="Continue learning Katakana characters"
            onPress={() => handleButtonPress('Katakana Basics 2')}
            imageSource={require('../assets/img/kana_button.png')}
            infoContent="This lesson covers the next set of Katakana characters."
            buttonStyle={!completedLessons.katakana1 ? [styles.disabledButton] : null}
            textStyle={!completedLessons.katakana1 ? [styles.disabledText] : null}
            disabled={!completedLessons.katakana1}
          />
          <ImageButton
            title="Katakana Basics 3"
            subtitle="Master the remaining Katakana characters"
            onPress={() => handleButtonPress('Katakana Basics 3')}
            imageSource={require('../assets/img/kana_button.png')}
            infoContent="This lesson completes your Katakana learning journey."
            buttonStyle={!completedLessons.katakana2 ? [styles.disabledButton] : null}
            textStyle={!completedLessons.katakana2 ? [styles.disabledText] : null}
            disabled={!completedLessons.katakana2}
          />
        </View>

        {/* Badge Awarding Animation */}
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
                  source={require('../assets/kana_badge.png')}
                  style={[
                    styles.awardBadge,
                    {
                      transform: [{ scale: badgeScale }, { rotateY: coinSpin }],
                    },
                  ]}
                />
                <Animated.Text
                  style={[
                    styles.congratsMessage,
                    { opacity: messageOpacity },
                  ]}
                >
                  Congratulations on mastering the Japanese characters!
                </Animated.Text>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}

        {/* Reset Badge Button for Testing */}
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Button title="Reset Badge State" onPress={resetBadgeState} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default KatakanaMenu;
