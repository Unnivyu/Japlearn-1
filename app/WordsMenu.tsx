import { View, Pressable, ImageBackground, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import styles from '../styles/stylesLearnMenu';
import BackIcon from '../assets/svg/back-icon.svg';
import ImageButton from '../components/ImageButton';
import { AuthContext } from '../context/AuthContext';
import expoconfig from '../expoconfig';

const KanaMenu = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [wordLessons, setWordLessons] = useState([]);
  const [classCode, setClassCode] = useState('');

  const handleBackPress = () => {
    router.push("/LearnMenu");
  };

  const fetchUserClassCode = async () => {
    const userEmail = user?.email;

    try {
      const response = await fetch(`${expoconfig.API_URL}/api/students/getStudentByEmail?email=${encodeURIComponent(userEmail)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const responseData = await response.json();
      setClassCode(responseData.classCode);

    } catch (error) {
      console.log("Error in fetching user data: ", error);
    }
  };

  const fetchWordLesson = async () => {
    try {
      const response = await fetch(`${expoconfig.API_URL}/api/lesson/getLessonByClass/${classCode}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const responseData = await response.json();
      setWordLessons(responseData);

    } catch (error) {
      console.log("Error fetching word lessons: ", error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserClassCode();
    }
  }, [user]);

  useEffect(() => {
    if (classCode) {
      fetchWordLesson(); // Only call fetchWordLesson when classCode is available
    }
  }, [classCode]); // This effect depends on classCode

  const handleButtonPress = (lessonId) => {
    router.push(`/Words?lessonId=${lessonId}`)
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
          {wordLessons.length > 0 && wordLessons.map((lesson) => (
            <ImageButton
              key={lesson.id} // Use unique key (id in this case)
              title={lesson.lesson_title}
              subtitle={lesson.lesson_type}
              onPress={() => handleButtonPress(lesson.id)} // Pass the lesson title to the button handler
              imageSource={require('../assets/img/kana_button.png')}
              infoContent={`This lesson is about ${lesson.lesson_type}.`}
            />
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

export default KanaMenu;
