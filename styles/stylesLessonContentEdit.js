import { StyleSheet } from 'react-native';

export const stylesLessonContent = StyleSheet.create ({
    container: {
        flex: 1,
    },
    header: {
        height: 105,
        backgroundColor: '#8423D9',
        borderBottomWidth: 10,
        borderBottomColor: '#6C3A99',
        flexDirection: 'row', // Make sure this is in place to align back button and text horizontally
        alignItems: 'center',
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
    buttonContainer: {
        flexDirection: 'row',
        padding: 10,
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
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
        fontSize: 20,
        color: 'white',
    },
    centerContainer: {
        flex: 1, 
        alignItems: 'center',  // Center horizontally
        justifyContent: 'center', // Center vertically
        marginLeft: -40
    },
    headerText:{
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})