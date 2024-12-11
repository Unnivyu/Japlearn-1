import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Pressable, ImageBackground, Modal, Animated, Text, TouchableWithoutFeedback } from 'react-native';
import { useRouter, useLocalSearchParams, usePathname } from 'expo-router';
import styles from '../styles/stylesLearnMenu';
import BackIcon from '../assets/svg/back-icon.svg';
import ImageButton from '../components/ImageButton';
import { AuthContext } from '../context/AuthContext'; // Assuming AuthContext holds user data
import expoconfig from '../expoconfig'; // Configuration for your backend API
import { Easing } from 'react-native-reanimated'; // Ensure you import Easing for animations

const KatakanaMenu = () => {
  const { user } = useContext(AuthContext); // Get the user object (which includes email)
  const [completedLessons, setCompletedLessons] = useState({});
  const [badge1, setBadge1] = useState(false); // To track if the badge has been earned
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
      // Only execute badge logic if on the KatakanaMenu screen
      if (currentPath !== '/KatakanaMenu') {
        console.log('Not on KatakanaMenu. Skipping badge logic.');
        return;
      }

      badgeCheckCompleted.current = true;

      // Only execute logic if redirected from CharacterExercise6
      if (fromExercise !== 'true') {
        console.log('Not redirected from CharacterExercise6. Skipping badge logic.');
        return;
      }

      // Check if all Hiragana and Katakana lessons are completed
      const allLessonsCompleted = (
        completedLessons.hiragana1 && completedLessons.hiragana2 && completedLessons.hiragana3 &&
        completedLessons.katakana1 && completedLessons.katakana2 && completedLessons.katakana3
      );

      // If all lessons are completed and badge1 is false, show the badge
      if (allLessonsCompleted && !badge1) {
        console.log('All lessons completed, showing badge now...');
        setBadgeVisible(true);
        animateBadge();
        await updateBadge1(); // Call the function to update badge1 to true in the backend
      } else {
        console.log('Conditions for badge not met or badge already earned.');
      }
    };

    checkBadgeShown();
  }, [completedLessons, fromExercise, currentPath, badge1]); // Add badge1 to the dependency array

  const animateBadge = () => {
    Animated.parallel([
      Animated.timing(badgeScale, {
        toValue: 1,
        duration: 3500, // Slow enlargement
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(badgeSpin, {
        toValue: 1, // Coin spin effect
        duration: 5000,
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
        duration: 400,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(badgeSpin, {
        toValue: 0, // Reverse spin
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(messageOpacity, {
        toValue: 0, // Fade-out
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => setBadgeVisible(false));
  };

  const fetchProgress = async () => {
    if (user && user.email) {
      try {
        const response = await fetch(`${expoconfig.API_URL}/api/progress/${user.email}`);
        const data = await response.json();

        if (response.ok) {
          setCompletedLessons({
            hiragana1: data.hiragana1,
            hiragana2: data.hiragana2,
            hiragana3: data.hiragana3,
            katakana1: data.katakana1,
            katakana2: data.katakana2,
            katakana3: data.katakana3,
          });

          setBadge1(data.badge1); // Update the badge1 state from the backend data
        } else {
          console.error('Failed to fetch student progress');
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    }
  };

  const updateBadge1 = async () => {
    if (user && user.email) {
      try {
        const response = await fetch(`${expoconfig.API_URL}/api/progress/${user.email}/updateField?field=badge1&value=true`, {
          method: 'PUT',
        });

        if (response.ok) {
          console.log('Badge1 updated successfully!');
          setBadge1(true); // Update the local state to reflect the change
        } else {
          console.error('Failed to update badge1');
        }
      } catch (error) {
        console.error('Error updating badge1:', error);
      }
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [user]);

  const handleBackPress = () => {
    router.push('/KanaMenu');
  };

  const handleButtonPress = (buttonTitle) => {
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
                  style={[styles.backdropLight, { transform: [{ scale: badgeScale }] }]} />
                <Animated.Image
                  source={require('../assets/kana_badge.png')}
                  style={[
                    styles.awardBadge,
                    { transform: [{ scale: badgeScale }, { rotateY: badgeSpin.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg']
                      }) }] }
                  ]}
                />
                <Animated.Text
                  style={[styles.congratsMessage, { opacity: messageOpacity }]}>
                  Congratulations on mastering the Japanese characters!
                </Animated.Text>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </View>
    </ImageBackground>
  );
};

export default KatakanaMenu;
