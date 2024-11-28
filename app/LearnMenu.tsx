import { View, Pressable, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from 'expo-router';
import styles from '../styles/stylesLearnMenu';
import BackIcon from '../assets/svg/back-icon.svg';
import ImageButton from '../components/ImageButton';
import { useLessonProgress } from '../context/LessonProgressContext';

const LearnMenu = () => {
  const { completedLessons } = useLessonProgress(); // Access lesson progress
  const router = useRouter();

  const handleBackPress = () => {
    router.push("/Menu");
  };

  const handleButtonPress = (buttonTitle) => {
    switch (buttonTitle) {
      case 'KANA':
        router.push('/KanaMenu'); // Example route for Kana content
        break;
      case 'WORDS':
        if (completedLessons.katakanaMenu) {
          router.push('/Words'); // Example route for Words content
        }
        break;
      case 'GRAMMAR':
        // Future logic for unlocking Grammar can go here
        break;
      default:
        console.log(`${buttonTitle} button pressed`);
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

          {/* GRAMMAR Button - Locked by default */}
          <ImageButton
            title="GRAMMAR"
            subtitle="Understand basic grammar"
            onPress={() => handleButtonPress('GRAMMAR')}
            imageSource={require('../assets/img/grammar_button.png')}
            infoContent="This lesson covers basic Japanese grammar."
            buttonStyle={styles.disabledButton}
            textStyle={styles.disabledText}
            disabled={true} // Always disabled for now
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default LearnMenu;
