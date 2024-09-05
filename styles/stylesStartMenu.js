import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    input: {
        backgroundColor:'#EFECEC',
        color: '#A4A4A4',
        borderRadius: 10,
        padding: 10,
        width: 340,
        marginBottom: 10,
        height: 70,
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
        marginBottom: 90, 
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuText: {
        fontFamily: 'jua',
        fontSize: 30,
    },
    button: {
        backgroundColor:'#8ED94D',
        borderBottomColor: '#74A14C',
        borderBottomWidth: 6,
        padding: 5,
        height: 60,
        width: 100,
        marginBottom: 20,
        borderRadius: 30,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    pictureCircle: {
        backgroundColor: 'white',
        width: 65, 
        height: 65, 
        borderRadius: 50,
    },
    
});
