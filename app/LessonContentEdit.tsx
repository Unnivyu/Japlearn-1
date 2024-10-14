import { View, Pressable, ImageBackground, TouchableOpacity, Text, Modal, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { useRouter } from 'expo-router';
import { stylesLessonContent } from '../styles/stylesLessonContentEdit';
import { styles } from '../styles/stylesModal';
import BackIcon from '../assets/svg/back-icon.svg';
import { AuthContext } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';

const LessonContentEdit = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [showAddContentModal, setShowAddContentModal] = useState(false);


    const handleBackPress = () => {
      router.back();
    };

    const handleAddLessonContent = () => {
      
    }

    const handleRemoveLessonContent = () => {

    }

    return (
        <View style={stylesLessonContent.container}>
          <View style={stylesLessonContent.header}>
            <TouchableOpacity onPress={handleBackPress}>
              <View style={stylesLessonContent.backButtonContainer}>
                <BackIcon width={20} height={20} fill={'white'} />
              </View>
            </TouchableOpacity>
            <View style={stylesLessonContent.centerContainer}>
                <Text style={stylesLessonContent.headerText}>Lesson Content Edit</Text>
            </View>
          </View>
          <View style={stylesLessonContent.buttonContainer}>
                <CustomButton title="Add" onPress={handleAddLessonContent} buttonStyle={stylesLessonContent.button} textStyle={stylesLessonContent.buttonText} />
                <CustomButton title="Remove" onPress={handleRemoveLessonContent} buttonStyle={stylesLessonContent.button} textStyle={stylesLessonContent.buttonText} />
          </View>

        </View>
    );
};  

export default LessonContentEdit;