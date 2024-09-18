import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/stylesLessons'; // Assuming you have this in your project
import CustomButton from '../components/CustomButton'; // Assuming you have this component
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const lessonsData = [
  {
    id: 1,
    title: "Introduction to Japanese Writing Systems",
    pages: [
      {
        sections: [
          {
            content: "The Japanese language, spoken by over 128 million people, is primarily written using a combination of three scripts. These 3 scripts include Hiragana, Katakana. Hiragana and Katakana are both under Kana."
          },
          {
            title: "What is Kana?",
            content: "Kana represents syllabic sounds and consists of two categories: Hiragana and Katakana.",
          },
          {
            title: "Hiragana",
            content: "Hiragana is used for native Japanese words and grammatical elements.",
            imageUrl: "https://files.tofugu.com/articles/japanese/2016-04-05-hiragana-chart/hiragana-origins-chart-sample.jpg"
          },
          {
            title: "Katakana",
            content: "Katakana is used for foreign words, loanwords, and scientific terms, among others.",
            imageUrl: "https://files.tofugu.com/articles/japanese/2017-07-13-katakana-chart/wikipedia-katatkana-chart.jpg"
          },
          {
            title: "Kanji",
            content: "Kanji are characters borrowed from Chinese, used for most nouns, verbs, adjectives, and adverbs.",
            imageUrl: "https://example.com/kanji.png"
          }
        ]
      },
      {
        sections: [
          {
            title: "Introduction to Hiragana Characters",
            content: "Now let's dive deeper into Hiragana and start with some basic characters.",
            imageUrl: "https://files.tofugu.com/articles/japanese/2016-04-05-hiragana-chart/hiragana-full-chart.jpg"
          },
          {
            title: "Hiragana Practice",
            content: "Practice writing the characters with proper stroke order to master Hiragana."
          }
        ]
      }
    ]
  }
];

// Drawer Navigator for Lessons Pages
const Drawer = createDrawerNavigator();

function LessonPage({ route }) {
  const { pageData } = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.lessonBlock}>
          {pageData.sections.map((section, index) => (
            <View key={index} style={styles.section}>
              {section.title && <Text style={styles.sectionTitle}>{section.title}</Text>}
              <Text style={styles.sectionContent}>{section.content}</Text>
              {section.imageUrl && (
                <Image source={{ uri: section.imageUrl }} style={styles.sectionImage} />
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// Drawer Navigator Component
function LessonsDrawerNavigator() {
  const currentLesson = lessonsData[0]; // Get the first lesson

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f5f5f5',
          width: 240,
        },
        drawerActiveTintColor: '#e91e63',
        drawerItemStyle: { marginVertical: 5 },
      }}
    >
      {currentLesson.pages.map((page, index) => (
        <Drawer.Screen
          key={index}
          name={`Page ${index + 1}`}
          component={LessonPage}
          initialParams={{ pageData: page }}
        />
      ))}
    </Drawer.Navigator>
  );
}

const Lessons = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <View style={styles.container}>
      {/* Custom Header with Drawer Toggle */}
      <View style={styles.header}>
        <View style={styles.backButtonContainer}>
          <Pressable onPress={toggleDrawer} style={styles.backButtonContainer}>
            <FontAwesome name="bars" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>

      {/* Drawer Navigator for Lesson Pages */}
      <NavigationContainer>
        <LessonsDrawerNavigator />
      </NavigationContainer>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <CustomButton title="Next" onPress={toggleDrawer} buttonStyle={styles.button} textStyle={styles.buttonText} />
      </View>
    </View>
  );
};

export default Lessons;
