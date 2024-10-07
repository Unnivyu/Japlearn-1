import { Text, View, Pressable, ImageBackground, Modal, TextInput, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { useRouter } from 'expo-router';
import { stylesLessonPage } from '../styles/stylesLessonPageEdit';
import { styles } from '../styles/stylesModal';
import BackIcon from '../assets/svg/back-icon.svg';
import { AuthContext } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';

const LessonPageEdit = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [showAddPageModal, setShowAddPageModal] = useState(false);
    const [showRemovePageModal, setShowRemovePageModal] = useState(false);
    const [lessonPageData, setLessonPageData] = useState([]);
    const [newPageTitle, setNewPageTitle] = useState('');
    const [selectedPages, setSelectedPages] = useState(new Set());
    const [showEditPageTitleModal, setShowEditPageTitleModal] = useState(false);
    const [pageToEditId, setPageToEditId] = useState(null);

    const fetchLessonPageData = () => {

    }

    const handleBackPress = () => {
      router.back();
    };

    const handleLessonPageLongPress = (id) => {
      router.push("/LessonContentEdit");
    }

    const toggleSelectPage = (id) => {
      const newSelectedPages = new Set(selectedPages);
      if (newSelectedPages.has(id)) {
        newSelectedPages.delete(id);
    } else {
      newSelectedPages.add(id);
    }
      setSelectedPages(newSelectedPages);
    }

    const handleAddPage = () => {
      setShowAddPageModal(true);
    }

    const handleSavePage = () => {
      if (newPageTitle.trim() === "") {
        alert("Please enter a lesson title.");
        return;
      } 

      const newPage = {
        id: Math.random().toString(36).substr(2, 9),
        title: newPageTitle
      }

      setLessonPageData([...lessonPageData, newPage]);

      setNewPageTitle('');
      setShowAddPageModal(false);
    }

    const handleRemovePage = () => {
      if(selectedPages.size === 0){
        return;
      }

      setShowRemovePageModal(true);
    }

    const confirmRemovePages = async () => {
      try {
        for (let id of selectedPages ){
          console.log(`Removing lesson with id: ${id}`);
        }
        setLessonPageData(prev => prev.filter(page => !selectedPages.has(page.id)));
        setSelectedPages(new Set ());
        setShowRemovePageModal(false);

      } catch (error) {
        console.error("Error in removing pages", error);
      }
    }
 
    const handleLessonPageEdit = (pageId, currentTitle) => {

      setPageToEditId(pageId);
      setNewPageTitle(currentTitle)
      setShowEditPageTitleModal(true);
    }

    const editLessonPageTitle = () => {
      if(newPageTitle.length === 0){
        alert("Please input a title");
        return;
      }

      setLessonPageData(prevPages =>
        prevPages.map(Page =>
            Page.id === pageToEditId
                ? { ...Page, title: newPageTitle }
                : Page
        )
    );


      setNewPageTitle('');
      setPageToEditId(null);
      setShowEditPageTitleModal(false);
    }

    return (
        <View style={stylesLessonPage.container}>
          <View style={stylesLessonPage.header}>
            <Pressable onPress={handleBackPress}>
              <View style={stylesLessonPage.backButtonContainer}>
                <BackIcon width={20} height={20} fill={'white'} />
              </View>
            </Pressable>
          </View>
          {/* Buttons section */}
          <View style={stylesLessonPage.buttonContainer}>
                <CustomButton title="Add" onPress={handleAddPage} buttonStyle={styles.button} textStyle={styles.buttonText} />
                <CustomButton title="Remove" onPress={handleRemovePage} buttonStyle={styles.button} textStyle={styles.buttonText} />
          </View>

          {/* Page container view */}
          <View style={stylesLessonPage.pageContentContainer}>
              {lessonPageData.map((page, index) => (
                  <TouchableOpacity key={index} onPress={() => toggleSelectPage(page.id)} 
                  onLongPress={() => handleLessonPageLongPress(page.id)}
                  >
                      <View style={[stylesLessonPage.pageContent, selectedPages.has(page.id) && stylesLessonPage.selectedPage]}>
                          <Text style={stylesLessonPage.pageContentText}>{page.title}</Text>
                          <CustomButton title="Edit" onPress={() => handleLessonPageEdit(page.id, page.title)} buttonStyle={stylesLessonPage.lessonButton} textStyle={stylesLessonPage.buttonText} />
                      </View>
                  </TouchableOpacity>
              ))}
          </View>

          {/*Modal for Adding Pages*/}
          <Modal
          animationType="slide"
          transparent={true}
          visible={showAddPageModal}
          onRequestClose={() => setShowAddPageModal(false)}
            >
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <TextInput
                          style={styles.input}
                          value={newPageTitle}
                          onChangeText={setNewPageTitle}
                          placeholder="Page Title"
                      />
                      <View style={styles.buttonRow}>
                          <CustomButton title="Save" onPress={handleSavePage} buttonStyle={styles.button} textStyle={styles.buttonText} />
                          <CustomButton title="Cancel" onPress={() => setShowAddPageModal(false)} buttonStyle={styles.button} textStyle={styles.buttonText} />
                      </View>
                  </View>
              </View>
         </Modal>

          {/*Modal for Removing Pages*/}
          <Modal
              animationType="slide"
              transparent={true}
              visible={showRemovePageModal}
              onRequestClose={() => setShowRemovePageModal(false)}
          >
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Text style={styles.modalText}>Are you sure you want to remove the selected Pages?</Text>
                      <View style={styles.buttonRow}>
                          <CustomButton title="Yes" onPress={confirmRemovePages} buttonStyle={styles.button} textStyle={styles.buttonText} />
                          <CustomButton title="No" onPress={() => setShowRemovePageModal(false)} buttonStyle={styles.button} textStyle={styles.buttonText} />
                      </View>
                  </View>
              </View>
          </Modal>

          {/*Modal for Editing Page title*/}
          <Modal
          animationType="slide"
          transparent={true}
          visible={showEditPageTitleModal}
          onRequestClose={() => setShowEditPageTitleModal(false)}
            >
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <TextInput
                          style={styles.input}
                          value={newPageTitle}
                          onChangeText={setNewPageTitle}
                          placeholder="Page Title"
                      />
                      <View style={styles.buttonRow}>
                          <CustomButton title="Save" onPress={editLessonPageTitle} buttonStyle={styles.button} textStyle={styles.buttonText} />
                          <CustomButton title="Cancel" onPress={() => setShowEditPageTitleModal(false)} buttonStyle={styles.button} textStyle={styles.buttonText} />
                      </View>
                  </View>
              </View>
         </Modal>

        </View>
    );
};  

export default LessonPageEdit;
