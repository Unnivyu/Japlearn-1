import { View, Pressable, ImageBackground } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import styles from '../styles/stylesLearnMenu';
import BackIcon from '../assets/svg/back-icon.svg';
import ImageButton from '../components/ImageButton';
import { useLessonProgress } from '../context/LessonProgressContext'; // Import Lesson Progress Context

const KanaMenu = () => {
  const { completedLessons } = useLessonProgress(); // Access global lesson progress
  const router = useRouter();

  const handleBackPress = () => {
    router.push("/LearnMenu");
  };

  const handleButtonPress = (buttonTitle) => {
    switch (buttonTitle) {
      case 'Hiragana':
        router.push('/HiraganaMenu');
        break;
      case 'Katakana':
        if (completedLessons.basics1 && completedLessons.basics2 && completedLessons.basics3) {
          router.push('/KatakanaMenu'); // Only proceed if Hiragana Basics are complete
        }
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
          {/* Hiragana Button */}
          <ImageButton
            title="Hiragana"
            subtitle="Learn Hiragana characters"
            onPress={() => handleButtonPress('Hiragana')}
            imageSource={require('../assets/img/kana_button.png')}
            infoContent="This lesson introduces you to Hiragana characters."
          />

          {/* Katakana Button - Disabled if Hiragana Basics are not completed */}
          <ImageButton
            title="Katakana"
            subtitle="Learn Katakana characters"
            onPress={() => handleButtonPress('Katakana')}
            imageSource={require('../assets/img/kana_button.png')}
            infoContent="This lesson introduces you to Katakana characters."
            buttonStyle={
              !(completedLessons.basics1 && completedLessons.basics2 && completedLessons.basics3)
                ? styles.disabledButton
                : null
            }
            textStyle={
              !(completedLessons.basics1 && completedLessons.basics2 && completedLessons.basics3)
                ? styles.disabledText
                : null
            }
            disabled={!(completedLessons.basics1 && completedLessons.basics2 && completedLessons.basics3)}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default KanaMenu;
