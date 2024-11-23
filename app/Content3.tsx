import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, ImageBackground, Image, Dimensions, Pressable } from 'react-native';
import { styles } from '../styles/content3Styles';
import Game3 from './Game3'; // Import Game3 component
import talk from '../assets/talk.png';
import hello from '../assets/hello.png';
import point from '../assets/point.png';
import mascot from '../assets/adventure.png';
import lost from '../assets/lost.png';
import { useRouter } from 'expo-router';
import BackIcon from '../assets/svg/back-icon.svg'; // Import the Back Icon

const { width, height } = Dimensions.get('window');

const dialogues = [
  { character: 'Ahiru-san', text: 'Welcome to Japanese grammar! Today we are going to learn about basic sentence structures.', image: hello },
  { character: 'Ahiru-san', text: 'In Japanese, the basic sentence order is Subject-Object-Verb. For example, "I eat sushi" would be "Watashi wa sushi wo tabemasu."', image: talk },
  { character: 'Ahiru-san', text: 'It\'s important to remember the particles "wa" and "wo". They help to indicate the subject and the object in the sentence.', image: talk },
  { character: 'Ahiru-san', text: 'Let\'s learn about some other important particles.', image: point },
  { character: 'Ahiru-san', text: 'The particle "de" is a place particle and is used to indicate where an action takes place. For example, "I sleep in the room" would be "Watashi wa heya de nemasu."', image: talk },
  { character: 'Ahiru-san', text: 'The particle "ni" is a destination particle and is used to indicate where someone is going to or coming from. For example, "I go to Tokyo" would be "Watashi wa Tokyo ni ikimasu."', image: talk },
  { character: 'Ahiru-san', text: 'The particle "no" is a possessive particle and is used to show possession. For example, "my book" would be "watashi no hon."', image: point },
  { character: 'Ahiru-san', text: 'The particle "ka" is a question particle and is used to turn a sentence into a question. For example, "Is this a pen?" would be "Kore wa pen desu ka?"', image: talk },
  { character: 'Ahiru-san', text: 'Great job! Now you know some of the basic particles and the sentence order in Japanese.', image: talk },
  { character: 'Ahiru-san', text: 'Are you ready for our adventure?!', image: mascot },
  { character: 'Ahiru-san', text: 'Great! Ikimashou!', image: mascot }
];

const cinematicScenes = [
  'Ahiru-san begins his journey in the deep, green forest.',
  'With determination, he walks deeper into the forest, the canopy thickening above him.',
  'As he progresses, he encounters a big problem....'
];

const postCinematicDialogues = [
  { character: 'Ahiru-san', text: 'Oh no! I think I am lost.', image: lost },
  { character: 'Ahiru-san', text: 'Can you help me?', image: lost } // Trigger Game3 after this dialogue
];

const finalDialogue = {
  character: 'Ahiru-san',
  text: 'Thank you for guiding me through the forest! You\'ve done a great job!',
  image: hello
};

const Content3 = () => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [cinematicIndex, setCinematicIndex] = useState(0);
  const [isCinematic, setIsCinematic] = useState(false);
  const [postCinematicIndex, setPostCinematicIndex] = useState(0);
  const [isPostCinematic, setIsPostCinematic] = useState(false);
  const [isFinalDialogue, setIsFinalDialogue] = useState(false); // State to show the final dialogue
  const [showGame3, setShowGame3] = useState(false); // State to conditionally render Game3

  const router = useRouter();

  const handleBackPress = () => {
    router.back(); // Navigate to the previous screen
  };

  const nextDialogue = () => {
    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else {
      setIsCinematic(true);
    }
  };

  const nextCinematic = () => {
    if (cinematicIndex < cinematicScenes.length - 1) {
      setCinematicIndex(cinematicIndex + 1);
    } else {
      setIsCinematic(false);
      setIsPostCinematic(true);
    }
  };

  const nextPostCinematicDialogue = () => {
    if (postCinematicIndex < postCinematicDialogues.length - 1) {
      setPostCinematicIndex(postCinematicIndex + 1);
    } else {
      // Show Game3 after the last post-cinematic dialogue
      setIsPostCinematic(false);
      setShowGame3(true);
    }
  };

  const handleGameOver = () => {
    // Show the final dialogue after Game3 ends
    setShowGame3(false);
    setIsFinalDialogue(true);
  };

  const { character, text, image } = dialogues[currentDialogueIndex];
  const postCinematic = postCinematicDialogues[postCinematicIndex];

  const backgroundSource = isFinalDialogue
    ? require('../assets/forest3.png')
    : isCinematic
    ? require('../assets/forest2.png')
    : isPostCinematic
    ? require('../assets/forest.jpg')
    : require('../assets/background.png');

  if (showGame3) {
    // Render Game3 when it's time and pass the handleGameOver callback
    return <Game3 onGameOver={handleGameOver} />;
  }

  return (
    <TouchableWithoutFeedback
      onPress={
        isCinematic
          ? nextCinematic
          : isPostCinematic
          ? nextPostCinematicDialogue
          : isFinalDialogue
          ? null
          : nextDialogue
      }
    >
      <View style={styles.container}>
        <ImageBackground source={backgroundSource} style={styles.background} resizeMode="cover">
          {/* Back Button */}
          <Pressable style={styles.backButton} onPress={handleBackPress}>
            <BackIcon width={20} height={20} fill="white" />
          </Pressable>

          {/* Dialogue Content */}
          {!isCinematic && !isPostCinematic && !isFinalDialogue ? (
            <>
              <Image source={image} style={[styles.characterImage, { width: width * 0.8, height: height * 0.4 }]} />
              <View style={styles.characterContainer}>
                <Text style={styles.character}>{character}</Text>
              </View>
              <View style={[styles.dialogueContainer, { width: width * 0.9 }]}>
                <Text style={styles.dialogue}>{text}</Text>
              </View>
            </>
          ) : isCinematic ? (
            <View style={styles.cinematicContainer}>
              <Text style={styles.cinematicText}>{cinematicScenes[cinematicIndex]}</Text>
            </View>
          ) : isPostCinematic ? (
            <>
              <Image source={postCinematic.image} style={styles.characterImage} />
              <View style={styles.characterContainer}>
                <Text style={styles.character}>{postCinematic.character}</Text>
              </View>
              <View style={styles.dialogueContainer}>
                <Text style={styles.dialogue}>{postCinematic.text}</Text>
              </View>
            </>
          ) : isFinalDialogue ? (
            <>
              <Image source={finalDialogue.image} style={[styles.characterImage, { width: width * 0.8, height: height * 0.4 }]} />
              <View style={styles.characterContainer}>
                <Text style={styles.character}>{finalDialogue.character}</Text>
              </View>
              <View style={[styles.dialogueContainer, { width: width * 0.9 }]}>
                <Text style={styles.dialogue}>{finalDialogue.text}</Text>
              </View>
            </>
          ) : null}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Content3;
