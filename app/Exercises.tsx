import { View, Pressable, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from 'expo-router';
import styles from '../styles/stylesExercises';
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
              title="CHARACTERS"
              subtitle="KANA Exercise"
              onPress={() => handleButtonPress('KANA')}
              imageSource={require('../assets/img/kana_button.png')}
              infoContent="TThis exercise tests your understanding of KANA characters."
            />
            <ImageButton
              title="WORDS"
              subtitle="Japanese Words Exercise"
              onPress={() => handleButtonPress('WORDS')}
              imageSource={require('../assets/img/words_button.png')}
              infoContent="This exercise tests your understanding of basic Japanese words."
            />
            <ImageButton
              title="GRAMMAR"
              subtitle="Grammar Exercise"
              onPress={() => handleButtonPress('GRAMMAR')}
              imageSource={require('../assets/img/grammar_button.png')}
              infoContent="This exercise tests your understanding of basic Japanese grammar."
            />
          </View>
        </View>
      </ImageBackground>
    );
};  

export default LearnMenu;
