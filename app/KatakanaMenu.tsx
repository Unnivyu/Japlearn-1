import { View, Pressable, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import styles from '../styles/stylesLearnMenu';
import BackIcon from '../assets/svg/back-icon.svg';
import ImageButton from '../components/ImageButton';
import { useLessonProgress } from '../context/LessonProgressContext';

const KatakanaMenu = () => {
  const { completedLessons, setCompletedLessons } = useLessonProgress();
  const router = useRouter();
  
  // Check and mark Katakana Menu as completed
  useEffect(() => {
    if (
      completedLessons.katakana1 &&
      completedLessons.katakana2 &&
      completedLessons.katakana3 &&
      !completedLessons.katakanaMenu
    ) {
      setCompletedLessons({
        ...completedLessons,
        katakanaMenu: true,
      });
    }
  }, [
    completedLessons.katakana1,
    completedLessons.katakana2,
    completedLessons.katakana3,
    completedLessons.katakanaMenu,
  ]);

  const handleBackPress = () => {
    router.push("/LearnMenu");
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
      </View>
    </ImageBackground>
  );
};

export default KatakanaMenu;
