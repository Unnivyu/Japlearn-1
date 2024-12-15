import { View, TouchableOpacity, Text, Pressable } from 'react-native';
import { styles } from "../styles/stylesHiraganaIntro";
import BackIcon from '../assets/svg/back-icon.svg';
import { useRouter } from 'expo-router';
import React from 'react';

const CharacterExercise1 = () => {
    const router = useRouter();

    const handleBackPress = () => {
        router.push('/HiraganaMenu');
    };

    const handleNextPress = () => {
        router.push("/HiraganaSet1"); // Navigate to the desired next screen
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
                    Hiragana and Katakana are both under Kana which is a Japanese
                    system of syllaabic writing. Hiragana and Katakana have exactly 
                    the same 46 basic characters with exactly the same pronunciation.
                </Text>
                <Text style={styles.matchGameText}>
                    Hiragana scripts are used to write original Japanese words. Each
                    Hiragana character represents a particular syllable. The strokes 
                    of Hiragana characters are curvy and may have similar strokes with 
                    some Kanji characters but Hiragana characters have no meaning. 
                    Hiragana is widely used to form sentences, since this is used to 
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