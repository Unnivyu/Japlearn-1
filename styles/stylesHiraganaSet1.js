import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backButtonContainer: {
    padding: 10,
    backgroundColor: '#6200EE',
    borderRadius: 20,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  character: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  romaji: {
    fontSize: 40,
    color: '#333',
    marginBottom: 40,
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6200EE',
    borderRadius: 10,
  },
  nextButtonText: {
    fontSize: 18,
    color: '#FFF',
  },
});

export default styles;
