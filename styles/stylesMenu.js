import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pictureCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    header: {
        backgroundColor: '#8423D9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 40,
        marginBottom: 20,
        borderBottomWidth: 10,
        borderBottomColor: '#6C3A99',
        height: 130,
    },
    hText: {
        fontFamily: 'Jua',
        color: 'white',
        fontSize: 20,
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    menuContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontFamily: 'Jua',
        fontSize: 18,
        marginBottom: 10,
    },
    flatListContainer: {
        justifyContent: 'space-between',
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    levelContainer: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
        maxWidth: '50%', 
        marginBottom: 40, 
    },
    menuText: {
        fontFamily: 'Jua',
        fontSize: 20,
        textAlign: 'center',
    },
    buttonText: {
        fontSize: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#8ED94D',
        borderRadius: 5,
        padding: 5

    },
    modalButtonText: {
        fontSize: 20,
        color: "#fff",
    },
    imageIcon: {
        width: 148,
        height: 100,
        resizeMode: 'contain',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Ensure the image covers the entire background
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent', // Make sure the background is transparent to show the image
    },
    titleContainer: {
    alignItems: 'center',
    marginBottom: 10, // Adjust spacing if needed
},
titleText: {
    fontFamily: 'Jua', // Match font style with the rest
    fontSize: 18,
    color: 'black', // White to contrast with the purple header
    textAlign: 'center',
},

});

export default styles;
