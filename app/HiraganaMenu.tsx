import { View, Pressable, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from 'expo-router';
import styles from '../styles/stylesLearnMenu';
import BackIcon from '../assets/svg/back-icon.svg';
import ImageButton from '../components/ImageButton';
import { AuthContext } from '../context/AuthContext';

const HiraganaMenu = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handleButtonPress = (buttonTitle) => {
    switch (buttonTitle) {
      case 'Hiragana Basics 1':
        router.push('/HiraganaSet1'); // Example route for Hiragana Basics 1
        break;
      case 'Hiragana Basics 2':
        router.push('/HiraganaSet2'); // Example route for Hiragana Basics 2
        break;
      case 'Hiragana Basics 3':
        router.push('/HiraganaSet3'); // Example route for Hiragana Basics 3
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
            title="Hiragana Basics 1"
            subtitle="Learn the first set of hiragana characters"
            onPress={() => handleButtonPress('Hiragana Basics 1')}
            imageSource={require('../assets/img/kana_button.png')}
            infoContent="This lesson introduces the first set of Hiragana characters."
          />
          <ImageButton
            title="Hiragana Basics 2"
            subtitle="Continue learning Hiragana characters"
            onPress={() => handleButtonPress('Hiragana Basics 2')}
            imageSource={require('../assets/img/kana_button.png')}
            infoContent="This lesson covers the next set of Hiragana characters."
          />
          <ImageButton
            title="Hiragana Basics 3"
            subtitle="Master the remaining Hiragana characters"
            onPress={() => handleButtonPress('Hiragana Basics 3')}
            imageSource={require('../assets/img/kana_button.png')}
            infoContent="This lesson completes your Hiragana learning journey."
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default HiraganaMenu;
