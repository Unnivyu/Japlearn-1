import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const cellSize = Math.min(width, height - 400) / 5 - 10;


export const stylesQuackman = StyleSheet.create({
    progressContainer: {
        alignItems: 'flex-end'
    },
    progress: {
        backgroundColor: '#FDFCFE',
        width: 100,
        height: 50,
        borderRadius: 50,
        margin: 20,
        justifyContent: 'center'
    },
    progressText: {
        textAlign: 'center',
    },
    menuContainer: {
        flexDirection: 'row', 
        alignItems: 'center',  
        justifyContent: 'center',
        marginBottom: 10,
    },
    Quacklogo: {
        width: 100,
        height: 100,
    },
    textStyle: {
        fontFamily: 'jua',
        fontSize: 30,
    },
    attemptsContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 20,
    },
    attempt: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#C7C5C5',
        margin: 5,
    },
    attemptWrong: {
        backgroundColor: '#FF6347', // Red color for incorrect attempt
    },
    attemptCorrect: {
        backgroundColor: '#8ED94D', // Green color for correct attempt
    },
    charGridContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20, // Ensure some padding at the bottom
    },
    charGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    charCell: {
        width: cellSize,
        height: cellSize, // Ensure the cell is square
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: '#8423D9', // Adjusted to match the provided image color
        borderRadius: 10,
    },
    charCellSelected: {
        backgroundColor: '#6C3A99', // Change color when selected
    },
    charText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white', // Text color to match the provided image
    },
    hintInputContainer: {
        padding: 10,
        backgroundColor: '#A883C8', // Set background color for the entire container
        alignItems: 'center',
    },
    hintContainer: {
        marginBottom: 10, // Add margin to separate hint text from input cells
    },
    hintText: {
        fontSize: 16,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    inputCell: {
        width: 40,
        height: 40, // Ensure the cell is square
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#8423D9',
        borderRadius: 10,
    },
    inputText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8423D9',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    gameOverText: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#8ED94D',
    },
    scoreText: {
        fontSize: 24,
        marginBottom: 40,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',  // This will ensure that buttons are evenly spaced
        width: '75%',  // Takes full width to spread out buttons
    },
    endButton: {
        backgroundColor: '#8423D9',
        height: 50,
        width: 80,
    },
    endButtonText: {
        fontSize: 20,
        color: '#fff'
    },
    retryButton: {
        backgroundColor: '#8423D9',
        height: 50,
        width: 80,
    },
    retryButtonText: {
        fontSize: 20,
        color: '#fff'
    },
    modButton: {
        height: 40,
        backgroundColor: '#8ED94D'
    }
});
