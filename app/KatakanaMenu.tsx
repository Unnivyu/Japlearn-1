import { View, Pressable, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from 'expo-router';
import styles from '../styles/stylesLearnMenu';
import BackIcon from '../assets/svg/back-icon.svg';
import ImageButton from '../components/ImageButton';
import { AuthContext } from '../context/AuthContext';

const KatakanaMenu = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handleButtonPress = (buttonTitle) => {
    switch (buttonTitle) {
      case 'Katakana Basics 1':
        router.push('/KatakanaSet1'); // Example route for Katakana Basics 1
        break;
      case 'Katakana Basics 2':
        router.push('/KatakanaSet2'); // Example route for Katakana Basics 2
        break;
      case 'Katakana Basics 3':
        router.push('/KatakanaSet3'); // Example route for Katakana Basics 3
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
          />
          <ImageButton
            title="Katakana Basics 3"
            subtitle="Master the remaining Katakana characters"
            onPress={() => handleButtonPress('Katakana Basics 3')}
            imageSource={require('../assets/img/kana_button.png')}
            infoContent="This lesson completes your Katakana learning journey."
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default KatakanaMenu;
