import { StyleSheet } from "react-native";

export const stylesLevels = StyleSheet.create ({
    header: {
        height: 105,
        backgroundColor: '#8423D9',
        borderBottomWidth: 10,
        borderBottomColor: '#6C3A99',
        justifyContent: 'center',
        padding: 10,
        paddingTop: 40,
    },
    backButtonContainer: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: '#462A5E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleTextContainer: {
        padding: 20,
    },
    titleText: {
        fontFamily: 'jua',
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10, 
        paddingHorizontal: 10, 
    },
    button: {
        backgroundColor: '#8ED94D',
        padding: 5,
        height: 60,
        width: 100,
        borderRadius: 5,
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    levelContainer: {
        padding: 10,
    },
    scrollViewContent: {
        flexGrow: 1, 
    },
    level : {
        padding: 20,
        backgroundColor: '#8ED94D',
        height: 100,
        borderRadius: 10,
        borderBottomWidth: 8,
        borderBottomColor: '#81AF59',
        marginBottom: 10,
        
    },
    levelText: {
        fontFamily: 'jua',
        fontSize: 16,
        color: 'white',
    }
});
