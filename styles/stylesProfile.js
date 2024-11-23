import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 90,
        justifyContent: 'center',
        paddingLeft: '5%',
        paddingTop: 30,
    },
    cover: {
        backgroundColor: '#8423D9',
        height: 180,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'white',
    },
    profileContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 110,
        marginLeft: 10,
        shadowColor: 'light-grey',
    },
    description: {
        padding: 20,
        borderBottomColor: '#E1E1E1',
        borderBottomWidth: 5,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    descText: {
        fontFamily: 'jua',
        fontSize: 20,
        marginTop: 10,
    },
    descTextContainer: {
        justifyContent: 'center',
    },
    whiteSpace: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '5%',
    },
    buttonContainer: {
        height: 50,
        backgroundColor: '#D6D6D6',
        borderRadius: 40,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontFamily: 'jua',
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    categoryButton: {
        backgroundColor: '#8ED94D',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 35,
        marginHorizontal: 5,
    },
    categoryButtonText: {
        color: 'white',
        fontFamily: 'jua',
        fontSize: 14,
    },
    contentScrollContainer: {
        paddingHorizontal: 20,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    scoresContainer: {
        marginTop: 20,
    },
    gameTitle: {
        fontSize: 22,
        fontFamily: 'jua',
        textAlign: 'center',
        marginBottom: 20,
    },
    scoreCard: {
        backgroundColor: '#E1E1E1',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    scoreText: {
        fontSize: 16,
        fontFamily: 'jua',
        marginBottom: 5,
    },
    noScoresText: {
        fontSize: 18,
        fontFamily: 'jua',
        textAlign: 'center',
        marginTop: 20,
        color: 'grey',
    },
});
