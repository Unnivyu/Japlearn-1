import React, { useState } from 'react';
import { View, Text, ImageBackground, Pressable, Modal, StyleSheet } from 'react-native';

const ImageButton = ({ imageSource, title, subtitle, infoContent, onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleInfoPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handlePlayPress = (e) => {
    e.stopPropagation(); // Prevent triggering the container's onPress
    onPress(); // Trigger the play action
  };

  return (
    <Pressable style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.upperPart}>
        <ImageBackground source={imageSource} style={styles.imageBackground} resizeMode="cover">
          <Pressable style={styles.infoButton} onPress={handleInfoPress}>
            <Text style={styles.infoText}>i</Text>
          </Pressable>
        </ImageBackground>
      </View>
      <View style={styles.lowerPart}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Pressable style={styles.playButton} onPress={handlePlayPress}>
          <Text style={styles.playText}>▶</Text>
        </Pressable>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{infoContent}</Text>
            <Pressable onPress={handleCloseModal} style={styles.modalButton}>
              <Text style={styles.closeModalText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 300,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: '#81AF59',
    marginBottom: 20,
  },
  upperPart: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  infoButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#A0D468',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
    fontSize: 18,
  },
  lowerPart: {
    flex: 1,
    backgroundColor: '#A0D468',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
  },
  playButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    color: '#A0D468',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  closeModalText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#8ED94D',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

export default ImageButton;
