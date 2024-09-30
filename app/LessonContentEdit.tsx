import { View, Pressable, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from 'expo-router';
import { stylesLessonContent } from '../styles/stylesLessonContentEdit';
import BackIcon from '../assets/svg/back-icon.svg';
import { AuthContext } from '../context/AuthContext';

const LessonContentEdit = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();


    const handleBackPress = () => {
      router.back();
    };

    return (
        <View style={stylesLessonContent.container}>
          <View style={stylesLessonContent.header}>
            <Pressable onPress={handleBackPress}>
              <View style={stylesLessonContent.backButtonContainer}>
                <BackIcon width={20} height={20} fill={'white'} />
              </View>
            </Pressable>
          </View>
        </View>
    );
};  

export default LessonContentEdit;