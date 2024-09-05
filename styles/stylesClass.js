import { StyleSheet } from 'react-native';

export const stylesClass = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 105,
        backgroundColor: '#8423D9',
        borderBottomWidth: 10,
        borderBottomColor: '#6C3A99',
        justifyContent: 'center',
        padding: 10,
        paddingTop: 40,
    },
    selectedScore: {
        backgroundColor: '#8ed94d',
    },
    backButtonContainer: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: '#462A5E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuContainer: {
        justifyContent: 'center',
        padding: 10,
        borderBottomWidth: 5,
        borderBottomColor: '#D9D9D9',
        marginBottom: 28,
    },
    titleText: {
        fontFamily: 'jua',
        fontSize: 20,
    },
    categoryContainer: {
        height: 150,
        marginBottom: 40,
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: 5
    },
    categoryButton: {
        backgroundColor: '#8ED94D',
        width: 100,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 30,
        height: 55,
    },
    button: {
        backgroundColor: '#8ED94D',
        padding: 5,
        height: 60,
        width: 100,
        borderRadius: 5,
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        padding: 10,
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    categoryButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 12,
    },
    content: {
        justifyContent: 'center',
        backgroundColor: '#C7C3C3',
        height: 70,
        padding: 20,
        borderRadius: 10,
        width: '100%',
    },
    scoreContent: {
        justifyContent: 'center',
        backgroundColor: '#C7C3C3',
        height: 100,
        padding: 20,
        borderRadius: 10,
        width: '100%',
    },
    gameContent: {
        backgroundColor: '#C28FF0',
        borderWidth: 10,
        borderColor: '#7551B0',
        height: 165,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        position: 'relative',
    },
    gameContentText: {
        color: 'white',
        fontFamily: 'jua',
        fontSize: 24,
        width: '100%'
    },
    gameTextContainer: {
        marginTop: 40,
    },
    classContentText: {
        color: 'white',
        fontFamily: 'jua',
        fontSize: 17,
        width: '100%'
    },
    contentContainer: {
        paddingBottom: 80,
        flexGrow: 1,
        padding: 10,
        width: '100%',
    },
    membersContentContainer: {
        rowGap: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: '100%',
    },
    contentScrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        width: '100%',
    },
    gameDescription: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gamesContainer: {

    },
    gameButton: {
        backgroundColor: '#8ED94D',
        padding: 5,
        height: 40,
        width: 75,
        borderRadius: 5,
        justifyContent: 'center',
    },
    gameContentBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden', 
    },
    floatingIcon: {
        position: 'absolute',
        top: '50%', // Center vertically
        left: '50%', // Center horizontally
        transform: [{ translateX: -60 }, { translateY: -60 }], // Adjust icon size and position
        zIndex: -1,
    },
    
});
