import React, { useState } from 'react';
import { View, Text, Image, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import BackIcon from '../assets/svg/back-icon.svg';
import styles from '../styles/stylesWords';

const Words = () => {
  const router = useRouter();

  // Example word data (draft)
  const word = {
    japanese: 'りんご',
    english: 'Apple',
    romaji: 'Ringo',
    image: require('../assets/hello.png'), // Replace with actual apple image
  };

  const handleBackPress = () => {
    router.back(); // Navigate to the previous screen
  };

  const handleNextPress = () => {
    console.log('No next word available - this is a draft!');
  };

  return (
    <ImageBackground
      source={require('../assets/img/MenuBackground.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={handleBackPress}>
            <View style={styles.backButtonContainer}>
              <BackIcon width={30} height={30} fill={'white'} />
            </View>
          </Pressable>
        </View>

        {/* Word Content */}
        <View style={styles.contentContainer}>
          <Image source={word.image} style={styles.image} />
          <Text style={styles.japanese}>{word.japanese}</Text>
          <Text style={styles.romaji}>{word.romaji}</Text>
          <Text style={styles.english}>{word.english}</Text>

          {/* Next Word Button */}
          <Pressable style={styles.nextButton} onPress={handleNextPress}>
            <Text style={styles.nextButtonText}>Next Word</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Words;
