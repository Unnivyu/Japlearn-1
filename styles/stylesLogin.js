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
    marginTop: 50,
  },

  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: 50,
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
    marginBottom: 100,
  },
  
  linkContainer: {
    marginTop: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  linkText: {
      color: '#B6B5B5',
      textDecorationLine: 'underline',
      fontSize: 16,
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
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#8ED94D',
    marginTop: 10,
    fontSize: 30,
    fontFamily: 'Jua'  
  },

  policyText: {
    top: 15,
    text: 16,
    textAlign: 'center'
  }

});

export default styles;