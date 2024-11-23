import { View, Pressable, ImageBackground, TouchableOpacity, Text, Modal, TextInput, ScrollView , Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { stylesLessonContent } from '../styles/stylesLessonContentEdit';
import { styles } from '../styles/stylesLessonModal';
import BackIcon from '../assets/svg/back-icon.svg';
import { AuthContext } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';
import RemoveButton from '../components/RemoveButton';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import { Audio } from 'expo-av';

const LessonContentEdit = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [showAddContentModal, setShowAddContentModal] = useState(false);
    const [textContent, setTextContent] = useState('');
    const [image, setImage] = useState <string | null>(null);
    const [audio, setAudio] = useState(null);
    const [lessonContentData, setLessonContentData] = useState([]);
    const [lessonContent, setLessonContent] = useState(null);
    const [selectedLessonContent, setselectedLessonContent] = useState(new Set());
    const [showViewContentModal, setShowViewContentModal] = useState(false);
    const [gamePicked, setGamePicked] = useState('');
    const [showDeleteContentModal, setShowDeleteContentModal] = useState(false);
    const [showLessonContentEdit, setShowLessonContentEdit] = useState(false);
    const [lessonContentToEditId, setLessonContentToEditId] = useState('');
    const soundObject = new Audio.Sound();
    const [inputHeight, setInputHeight] = useState(65);

    const handleBackPress = () => {
      router.back();
    };

    const fetchLessonContent = () => {

    }

    const handleAddLessonContent = () => {
      setShowAddContentModal(true);
    }

    const handleSaveLessonContent = () => {
      const newlessonContent = {
        id: Math.random().toString(36).substr(2,9),
        lessonTextContent: textContent,
        contentImage: image,
        contentAudio: audio,
        contentGame: gamePicked
      }

      setLessonContentData([...lessonContentData, newlessonContent]);

      setImage(null);
      setAudio(null);
      setTextContent('');
      setGamePicked('');
      setShowAddContentModal(false);
    }

    const cancelAdd = () => {
      setTextContent('');
      setImage(null);
      setAudio(null);
      setGamePicked('');
      setShowAddContentModal(false);
    }

    const handleRemoveLessonContent = () => {
      setShowDeleteContentModal(true);
    }

    const confirmRemoveLessonContent = () => {
      setLessonContentData(prev => prev.filter(content => !selectedLessonContent.has(content.id)))
      setselectedLessonContent(new Set());
      setShowDeleteContentModal(false);
    }

    const handleLessonContentEdit = (content) => {
      setLessonContentToEditId(content.id);
      setTextContent(content.lessonTextContent);
      setImage(content.contentImage);
      setAudio(content.contentAudio);
      setGamePicked(content.contentGame);
      setShowLessonContentEdit(true);
    }
    
    const confirmLessonContentEdit = () => {
      setLessonContentData(prevContent => prevContent.map(
        Content => Content.id === lessonContentToEditId
        ? {...Content, 
          lessonTextContent: textContent,
          contentImage: image,
          contentAudio: audio,
          contentGame: gamePicked
          } : Content
      ));

      setLessonContentToEditId('');
      setTextContent('');
      setImage(null);
      setAudio(null);
      setGamePicked('');
      setShowLessonContentEdit(false);
    }

    const cancelLessonContentEdit = () => {
      setLessonContentToEditId('');
      setTextContent('');
      setImage(null);
      setAudio(null);
      setGamePicked('');
      setShowLessonContentEdit(false);
    }

    //Image picker
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    };

    const removeImage = () => {
      setImage(null);
    }

    //Get Audio
    const pickAudio = async () => {
     let result = await DocumentPicker.getDocumentAsync({type: 'audio/*', copyToCacheDirectory:true});

     if(!result.canceled){
      setAudio(result.assets[0]);
     }
    }
    
    const removeAudio = () => {
      setAudio(null);
    }

    const playAudio = async (audio) => {
      const audioUri = audio.uri;

      soundObject.setOnPlaybackStatusUpdate();

      await soundObject.loadAsync({uri: audioUri});
      await soundObject.playAsync();
    }

    const unloadAudio = async () => {
      await soundObject.unloadAsync();
    }
  
    const toggleSelectContent = (id) => {
      const newSelectedLessonContent = new Set(selectedLessonContent);
      if(newSelectedLessonContent.has(id)){
        newSelectedLessonContent.delete(id);
      } else {
        newSelectedLessonContent.add(id);
      }
      setselectedLessonContent(newSelectedLessonContent);
    }

    const viewContent = (content) => {
      setLessonContent(content);
      setShowViewContentModal(true);
    }

    const closeViewContentModal = () => {
      setLessonContent(null);
      unloadAudio();
      setShowViewContentModal(false);
    }

    return (
      // Header 
        <View style={stylesLessonContent.container}>
          <View style={stylesLessonContent.header}>
            <TouchableOpacity onPress={handleBackPress}>
              <View style={stylesLessonContent.backButtonContainer}>
                <BackIcon width={20} height={20} fill={'white'} />
              </View>
            </TouchableOpacity>
            <View style={stylesLessonContent.centerContainer}>
                <Text style={stylesLessonContent.headerText}>Lesson Content Edit</Text>
            </View>
          </View>
          <View style={stylesLessonContent.buttonContainer}>
                <CustomButton title="Add" onPress={handleAddLessonContent} buttonStyle={stylesLessonContent.button} textStyle={stylesLessonContent.buttonText} />
                <CustomButton title="Remove" onPress={handleRemoveLessonContent} buttonStyle={stylesLessonContent.button} textStyle={stylesLessonContent.buttonText} />
          </View>

           {/* Lesson Content container view */}
           <ScrollView contentContainerStyle={stylesLessonContent.contentScrollContainer}>
            <View style={stylesLessonContent.lessonContentContainer}>
                {lessonContentData.map((content, index) => (
                    <TouchableOpacity key={index} onPress={() => toggleSelectContent(content.id)} onLongPress={() => viewContent(content)}>
                        <View style={[stylesLessonContent.LessonContent, selectedLessonContent.has(content.id) && stylesLessonContent.selectedLessonContent]}>
                            {content.contentImage && (
                              <Image 
                                source={{ uri: content.contentImage.uri }} 
                                style={stylesLessonContent.lessonContentImage} 
                              />)}
                              <View style={stylesLessonContent.textContainer}>
                                {content.lessonTextContent && ( 
                                <Text style={stylesLessonContent.LessonContentText}>
                                  Text Content: {content.lessonTextContent}
                                </Text>
                                )}                              
                                {content.contentAudio && (
                                  <Text style={stylesLessonContent.LessonContentText}>
                                    Audio: {content.contentAudio.name}
                                  </Text>
                                )}
                                {content.contentGame && (
                                  <Text style={stylesLessonContent.LessonContentText}>
                                    Game: {content.contentGame}
                                  </Text>
                                )}
                              </View>
                            <CustomButton title="Edit" onPress={() => handleLessonContentEdit(content)} buttonStyle={stylesLessonContent.lessonContentButton} textStyle={stylesLessonContent.buttonText} />
                        </View>
                    </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

         { /* modal for Adding content */ }
          <Modal
          animationType="slide"
          transparent={true}
          visible={showAddContentModal}
          onRequestClose={() => setShowAddContentModal(false)}
            >
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <TextInput
                          style={[styles.input, {textAlignVertical: 'top'}]}
                          multiline={true}
                          value={textContent}
                          onChangeText={setTextContent}
                          placeholder="Add Lesson Content"
                          onContentSizeChange={(event) =>
                            setInputHeight(event.nativeEvent.contentSize.height)
                        }
                      />
                      <CustomButton title="Pick an image" onPress={pickImage} buttonStyle={styles.button} textStyle={styles.buttonText}/>
                      {image && (
                        <>
                          <Text>Selected image: {image.fileName}</Text>
                          <RemoveButton title="Remove" onPress={removeImage} buttonStyle={styles.RemoveButton} textStyle={styles.buttonText}/>
                        </>
                      )}
                      <CustomButton title="Pick an audio" onPress={pickAudio}  buttonStyle={styles.button} textStyle={styles.buttonText}/>
                      {audio && (
                        <>
                          <Text>Selected audio: {audio.name}</Text>
                          <RemoveButton title="Remove" onPress={removeAudio} buttonStyle={styles.RemoveButton} textStyle={styles.buttonText}/>
                        </>
                      )}
                      <Picker
                        selectedValue={gamePicked}
                        onValueChange={(itemValue, itemIndex) =>
                            setGamePicked(itemValue)
                          }>
                        <Picker.Item label="None" value=""/>
                        <Picker.Item label="Game 1" value="Game1"/>
                        <Picker.Item label="Game 2" value="Game2"/>
                        <Picker.Item label="Game 3" value="Game3"/>
                      </Picker>

                      <View style={styles.buttonRow}>
                          <CustomButton title="Save" onPress={handleSaveLessonContent} buttonStyle={styles.button} textStyle={styles.buttonText} />
                          <CustomButton title="Cancel" onPress={() => cancelAdd()} buttonStyle={styles.button} textStyle={styles.buttonText} />
                      </View>
                  </View>
              </View>
         </Modal>

         { /* modal for Removing content */ }
          <Modal
              animationType="slide"
              transparent={true}
              visible={showDeleteContentModal}
              onRequestClose={() => setShowDeleteContentModal(false)}
          >
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Text style={styles.modalText}>Are you sure you want to remove the selected Lesson Content?</Text>
                      <View style={styles.buttonRow}>
                          <CustomButton title="Yes" onPress={confirmRemoveLessonContent} buttonStyle={styles.button} textStyle={styles.buttonText} />
                          <CustomButton title="No" onPress={() => setShowDeleteContentModal(false)} buttonStyle={styles.button} textStyle={styles.buttonText} />
                      </View>
                  </View>
              </View>
          </Modal>

          { /* modal for Editing content */ }
          <Modal
          animationType="slide"
          transparent={true}
          visible={showLessonContentEdit}
          onRequestClose={() => setShowLessonContentEdit(false)}
            >
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <TextInput
                          style={styles.input}
                          value={textContent}
                          onChangeText={setTextContent}
                          placeholder="Add Lesson Content"
                      />
                      <CustomButton title="Pick an image" onPress={pickImage} buttonStyle={styles.button} textStyle={styles.buttonText}/>
                      {image && (
                        <>
                          <Text>Selected image: {image.fileName}</Text>
                          <RemoveButton title="Remove" onPress={removeImage} buttonStyle={styles.RemoveButton} textStyle={styles.buttonText}/>
                        </>
                      )}
                      <CustomButton title="Pick an audio" onPress={pickAudio}  buttonStyle={styles.button} textStyle={styles.buttonText}/>
                      {audio && (
                        <>
                          <Text>Selected audio: {audio.name}</Text>
                          <RemoveButton title="Remove" onPress={removeAudio} buttonStyle={styles.RemoveButton} textStyle={styles.buttonText}/>
                        </>
                      )}
                      <Picker
                        selectedValue={gamePicked}
                        onValueChange={(itemValue) =>
                            setGamePicked(itemValue)
                          }>
                        <Picker.Item label="None" value=""/>
                        <Picker.Item label="Game 1" value="Game1"/>
                        <Picker.Item label="Game 2" value="Game2"/>
                        <Picker.Item label="Game 3" value="Game3"/>
                      </Picker>

                      <View style={styles.buttonRow}>
                          <CustomButton title="Save" onPress={confirmLessonContentEdit} buttonStyle={styles.button} textStyle={styles.buttonText} />
                          <CustomButton title="Cancel" onPress={() => cancelLessonContentEdit()} buttonStyle={styles.button} textStyle={styles.buttonText} />
                      </View>
                  </View>
              </View>
         </Modal>

         { /* modal for Viewing content */ }
         <Modal
            animationType="slide"
            transparent={true}
            visible={showViewContentModal}
            onRequestClose={() => setShowViewContentModal(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {lessonContent ? (
                  <>
                    {lessonContent.contentImage && (
                      <Image
                        source={{ uri: lessonContent.contentImage.uri }}
                        style={styles.lessonContentImage}
                      />
                    )}
                    {lessonContent.lessonTextContent && (
                      <Text>
                        Text: {lessonContent.lessonTextContent}
                      </Text>
                    )}
                    {lessonContent.contentAudio && (
                      <Text>
                        Audio: {lessonContent.contentAudio.name}
                        <CustomButton title="Play Audio" onPress={() => playAudio(lessonContent.contentAudio)} buttonStyle={styles.playButton} textStyle={styles.playButtonText} />
                      </Text>
                    )}
                    {lessonContent.contentGame && (
                      <Text>
                        Game: {lessonContent.contentGame}
                      </Text>
                    )}
                    </>
                ) : (
                  <> </>
                )}
                  <View style={styles.buttonRow}>              
                    <CustomButton title="Cancel" onPress={() => closeViewContentModal()} buttonStyle={styles.button} textStyle={styles.buttonText} />
                  </View>
              </View>
            </View>
          </Modal>
        </View>
    );
};  

export default LessonContentEdit;