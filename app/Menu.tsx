import { SafeAreaView, Text, View, Pressable, FlatList, Image, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from 'expo-router';
import styles from '../styles/stylesMenu';
import Profile from '../assets/svg/user_pf.svg';
import Complete from '../assets/img/level_available.png';
import Background from '../assets/img/MenuBackground.png';
import { AuthContext } from '../context/AuthContext';

const levels = [
    { id: 'LearnMenu', title: 'Learn' },
    { id: 'Exercises', title: 'Exercise' }
];

const LevelButton = ({ title, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <Image
                source={Complete}
                style={styles.imageIcon}
            />
            <Text style={styles.menuText}>{title}</Text>
        </Pressable>
    );
};

const Menu = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const handleLevelPress = (level) => {
        router.push(`/${level.id}`);
    };

    const renderItem = ({ item }) => (
        <View style={styles.levelContainer}>
            <LevelButton title={item.title} onPress={() => handleLevelPress(item)} />
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={Background} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={[styles.header, { padding: 20 }]}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.hText}>Welcome Back</Text>
                            <Text style={styles.hText}>{user?.fname}</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Pressable onPress={() => router.push('/Profile')}>
                                <Profile width={65} height={65} />
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.menuContainer}>
                        <FlatList
                            data={levels}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            contentContainerStyle={styles.flatListContainer}
                            columnWrapperStyle={styles.columnWrapper}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Menu;
