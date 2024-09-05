import { StyleSheet } from 'react-native';

export const stylesDashboard = StyleSheet.create({
    input: {
        backgroundColor:'#EFECEC',
        color: '#A4A4A4',
        borderRadius: 10,
        padding: 10,
        width: 340,
        marginBottom: 10,
        height: 70,
    },
    header: {
        backgroundColor: '#8423D9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 40,
        marginBottom: 10,
        borderBottomWidth: 10,
        borderBottomColor: '#6C3A99',
        height: 130,
    },
    hText: {
        fontFamily: 'jua',
        color: 'white',
        fontSize: 15,
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    menuContainer: {
        justifyContent: 'center',
        padding: 10,
        borderBottomWidth: 5,
        borderBottomColor: '#D9D9D9',
    },
    menuText: {
        fontFamily: 'jua',
        fontSize: 30,
    },
    button: {
        backgroundColor:'#8ED94D',
        padding: 5,
        height: 60,
        width: 100,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: 'white', // Ensure text is white
    },
    pictureCircle: {
        backgroundColor: 'white',
        width: 65,
        height: 65,
        borderRadius: 50,
    },
    titleText: {
        fontFamily: 'jua',
        fontSize: 20,
        marginBottom: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,  
    },
    classContainer: {
        alignItems: 'center',
        flex: 1,
        padding: 20,
    },
    classContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray', // Use a light background for better contrast
        marginTop: 20,
        padding: 20,
        height: 80,
        borderRadius: 30,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        width: 300, // Adjust the width to your preference
        alignSelf: 'center' // Center the classContent boxes
    },
    classContentText: {
        color: '#333', // Use darker text for readability
        fontFamily: 'jua',
        fontSize: 18, // Increase font size for visibility
        textAlign: 'center', // Center the text within the box
    }
});
