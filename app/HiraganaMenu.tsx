import { View, Pressable, ImageBackground, Text } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import styles from '../styles/stylesLearnMenu';
import BackIcon from '../assets/svg/back-icon.svg';
import ImageButton from '../components/ImageButton';
import { useLessonProgress } from '../context/LessonProgressContext'; // Import Lesson Progress Context

const HiraganaMenu = () => {
  const { completedLessons } = useLessonProgress(); // Access lesson progress state
  const router = useRouter();
  console.log('Completed Lessons:', completedLessons);

  const handleBackPress = () => {
    router.push("/KanaMenu");
  };

  const handleButtonPress = (buttonTitle) => {
    if (buttonTitle === 'Hiragana Basics 1') {
      router.push('/HiraganaSet1');
    } else if (buttonTitle === 'Hiragana Basics 2' && completedLessons.basics1) {
      router.push('/HiraganaSet2');
    } else if (buttonTitle === 'Hiragana Basics 3' && completedLessons.basics2) {
      router.push('/HiraganaSet3');
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
          {/* Hiragana Basics 1 */}
          <ImageButton
            title="Hiragana Basics 1"
            subtitle="Learn the first set of Hiragana characters"
            onPress={() => handleButtonPress('Hiragana Basics 1')}
            imageSource={require('../assets/img/kana_button.png')}
            infoContent="This lesson introduces the first set of Hiragana characters."
          />

          {/* Hiragana Basics 2 - Disabled if Basics 1 is not completed */}
          <ImageButton
  title="Hiragana Basics 2"
  subtitle="Continue learning Hiragana characters"
  onPress={() => handleButtonPress('Hiragana Basics 2')}
  imageSource={require('../assets/img/kana_button.png')}
  infoContent="This lesson covers the next set of Hiragana characters."
  buttonStyle={!completedLessons.basics1 ? [styles.disabledButton] : null}
  textStyle={!completedLessons.basics1 ? [styles.disabledText] : null}
  disabled={!completedLessons.basics1}
/>


          {/* Hiragana Basics 3 - Disabled if Basics 2 is not completed */}
          <ImageButton
  title="Hiragana Basics 3"
  subtitle="Master the remaining Hiragana characters"
  onPress={() => handleButtonPress('Hiragana Basics 3')}
  imageSource={require('../assets/img/kana_button.png')}
  infoContent="This lesson completes your Hiragana learning journey."
  buttonStyle={!completedLessons.basics2 ? [styles.disabledButton] : null}
  textStyle={!completedLessons.basics2 ? [styles.disabledText] : null}
  disabled={!completedLessons.basics2}
/>


        </View>
      </View>
    </ImageBackground>
  );
};

export default HiraganaMenu;