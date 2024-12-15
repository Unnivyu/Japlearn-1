import { View, TouchableOpacity, Text, Pressable } from 'react-native';
import { styles } from "../styles/stylesHiraganaIntro";
import BackIcon from '../assets/svg/back-icon.svg';
import { useRouter } from 'expo-router';
import React from 'react';

const CharacterExercise1 = () => {
    const router = useRouter();

    const handleBackPress = () => {
        router.push('/KatakanaMenu');
    };

    const handleNextPress = () => {
        router.push("/KatakanaSet1"); // Navigate to the desired next screen
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={styles.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            
            {/* Content */}
            <View style={styles.matchGame}>
                <Text style={styles.matchGameText}>
                    Katakana scripts are used to write foreign words,
                    adapted in Japanese. Katakana strokes, in contrast
                    with Hiragana, are angular and edgy. Common uses of 
                    Katakana scripts are for names, onomatopoeia, and 
                    other captions for emphasis. 
                    write original Japanese words.
                </Text>
                <Pressable style={styles.nextButton} onPress={handleNextPress}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default CharacterExercise1;