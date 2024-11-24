import { View, Pressable, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from 'expo-router';
import styles from '../styles/stylesLearnMenu';
import BackIcon from '../assets/svg/back-icon.svg';
import ImageButton from '../components/ImageButton';
import { AuthContext } from '../context/AuthContext';

const KanaMenu = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleBackPress = () => {
    router.push("/LearnMenu");
  };

  const handleButtonPress = (buttonTitle) => {
    switch (buttonTitle) {
      case 'Hiragana':
        router.push('/HiraganaMenu'); // Example route for Hiragana content
        break;
      case 'Katakana':
        router.push('/KatakanaMenu'); // Example route for Katakana content
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
            title="Hiragana"
            subtitle="Learn Hiragana characters"
            onPress={() => handleButtonPress('Hiragana')}
            imageSource={require('../assets/img/kana_button.png')}
            infoContent="This lesson introduces you to Hiragana characters."
          />
          <ImageButton
            title="Katakana"
            subtitle="Learn Katakana characters"
            onPress={() => handleButtonPress('Katakana')}
            imageSource={require('../assets/img/kana_button.png')}
            infoContent="This lesson introduces you to Katakana characters."
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default KanaMenu;
