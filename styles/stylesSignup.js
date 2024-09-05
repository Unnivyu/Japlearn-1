import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#8ED94D',
        padding: 10,
        width:  '100%',
        borderRadius: 5,
        borderColor: '#8AC25A',
        borderBottomWidth: 6,
        height: 80,
    },

    buttonText: {
        color: '#fff',
        fontSize: 40
    },

    buttonContainer: {
        alignItems:'center',
        marginTop: 20,
    },

    container: {
        marginTop: 50,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },

    input: {
        backgroundColor: '#ececec',
        color: '#777676',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        height: 60,
        borderColor: 'red',
    },

    imageContainer: {
        alignItems: 'center',
        marginBottom: 30
    },
    
    linkContainer: {
        marginTop: 40,
        alignItems: 'center',
    },

    linkText: {
        color: '#B6B5B5',
        textDecorationLine: 'underline',
        fontSize: 16,
    },

    errorInput: {
        borderWidth: 1,
        borderColor: 'red',   
    },

    errorText: {
        color: 'white',
        marginLeft: 5,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'red',
        padding: 5, 
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        position: 'relative',
    },
    passwordInput: {
        flex: 1,
        paddingRight: 40, 
    },
    insideInputButton: {
        position: 'absolute',
        right: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;
