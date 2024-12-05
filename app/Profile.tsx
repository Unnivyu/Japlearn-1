import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Modal } from "react-native";
import BackIcon from "../assets/svg/back-icon.svg";
import { AuthContext } from "../context/AuthContext";
import CustomButton from "../components/CustomButton";
import ForgetPasswordModal from "../components/ForgetPasswordModalProps"; // Import the ForgetPasswordModal
import expoconfig from "../expoconfig";
import studentProfile from "../assets/img/studentProfile.png";
import { styles } from "../styles/stylesProfile";
import { useRouter } from "expo-router";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [forgetPasswordVisible, setForgetPasswordVisible] = useState(false); // State for Forget Password modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handleLogout = () => {
    logout();
    router.push("/Login");
  };

  const handleForgetPassword = async (email) => {
    try {
      const response = await fetch(`${expoconfig.API_URL}/api/users/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setModalMessage("Password reset email sent. Please check your inbox.");
      } else {
        const error = await response.json();
        setModalMessage(error.message || "An error occurred.");
      }
    } catch (error) {
      setModalMessage(`Error: ${error.message}`);
    }
    setForgetPasswordVisible(false); // Hide Forget Password modal
    setModalVisible(true); // Show general modal for feedback
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <BackIcon width={30} height={30} />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.cover} />
        <View style={styles.profileContainer}>
          <Image source={studentProfile} style={styles.profilePicture} />
        </View>
        <View style={styles.whiteSpace}>
          <TouchableOpacity onPress={handleLogout} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setForgetPasswordVisible(true)} // Open Forget Password modal
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.description}>
        <View style={styles.descTextContainer}>
          <Text style={styles.descText}>
            User: {user ? `${user.fname} ${user.lname}` : ""}
          </Text>
          <Text style={styles.descText}>Email: {user ? user.email : ""}</Text>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <CustomButton
          title="QUACKMAN"
          onPress={() => console.log("QUACKMAN")}
          buttonStyle={styles.categoryButton}
          textStyle={styles.categoryButtonText}
        />
        <CustomButton
          title="QUACKAMOLE"
          onPress={() => console.log("QUACKAMOLE")}
          buttonStyle={styles.categoryButton}
          textStyle={styles.categoryButtonText}
        />
        <CustomButton
          title="QUACKSLATE"
          onPress={() => console.log("QUACKSLATE")}
          buttonStyle={styles.categoryButton}
          textStyle={styles.categoryButtonText}
        />
      </View>

      {/* Forget Password Modal */}
      <ForgetPasswordModal
        isVisible={forgetPasswordVisible}
        onClose={() => setForgetPasswordVisible(false)} // Close Forget Password modal
        onSubmit={handleForgetPassword} // Handle email submission
      />

      {/* General Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notice</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <CustomButton
              title="Close"
              onPress={() => setModalVisible(false)} // Close General Modal
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
