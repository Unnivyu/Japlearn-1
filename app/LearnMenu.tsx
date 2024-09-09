import { View, Pressable, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from 'expo-router';
import styles from '../styles/stylesLearnMenu';
import BackIcon from '../assets/svg/back-icon.svg';
import ImageButton from '../components/ImageButton';
import { AuthContext } from '../context/AuthContext';

const LearnMenu = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();


    const handleBackPress = () => {
      router.back();
    };
  
    const handleButtonPress = (buttonTitle) => {
      console.log(`${buttonTitle} button pressed`);
      // Handle specific button press
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
              title="KANA"
              subtitle="Introduction to KANA"
              onPress={() => handleButtonPress('KANA')}
              imageSource={require('../assets/img/kana_button.png')}
              infoContent="This lesson introduces you to the KANA characters."
            />
            <ImageButton
              title="WORDS"
              subtitle="Learn basic words"
              onPress={() => handleButtonPress('WORDS')}
              imageSource={require('../assets/img/words_button.png')}
              infoContent="This lesson helps you learn basic Japanese words."
            />
            <ImageButton
              title="GRAMMAR"
              subtitle="Understand basic grammar"
              onPress={() => handleButtonPress('GRAMMAR')}
              imageSource={require('../assets/img/grammar_button.png')}
              infoContent="This lesson covers basic Japanese grammar."
            />
          </View>
        </View>
      </ImageBackground>
    );
};  

export default LearnMenu;
