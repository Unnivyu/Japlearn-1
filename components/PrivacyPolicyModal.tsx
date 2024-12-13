import React, { useState } from 'react';
import { Modal, ScrollView, Text, View, StyleSheet } from 'react-native';
import CustomButton from './CustomButton'; // Assuming you have a CustomButton component

const PrivacyPolicyModal = ({ visible, onAgree, onClose }) => {
    const [canAgree, setCanAgree] = useState(false);

    const handleScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const isAtBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        setCanAgree(isAtBottom);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose} // Close the modal when the user presses the back button
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        onScroll={handleScroll}
                        scrollEventThrottle={16} // Higher value to ensure smooth scroll tracking
                    >
                        <Text style={styles.header}>JapLearn Privacy Policy</Text>
                        <Text style={styles.intro}>
                        </Text>
                        <Text style={styles.paragraph}>
                            Welcome to JapLearn. Your privacy is our priority, and we are committed to safeguarding your personal data. This Privacy Policy outlines the information we collect, how we use it, and the measures we take to protect it. By using our application, you consent to the practices described in this policy. If you have any concerns about how we handle your information, please contact us directly using the details provided below.
                        </Text>

                        <Text style={styles.subtitle}>1. Information We Collect</Text>
                        <Text style={styles.paragraph}>
                            To enhance your experience and provide our services effectively, we collect and process the following types of information:
                        </Text>
                        <Text style={styles.listItem}>
                            - <Text style={styles.bold}>Personal Information:</Text> Your name, email address, and other contact details provided during account registration.
                        </Text>
                        <Text style={styles.listItem}>
                            - <Text style={styles.bold}>Usage Data:</Text> Information such as your app activity, learning scores, and progress logs. We use this data to analyze your learning journey and provide tailored recommendations.
                        </Text>
                        <Text style={styles.listItem}>
                            - <Text style={styles.bold}>Device Information:</Text> Details about your device, such as type, operating system, and app version, to ensure compatibility and optimize performance.
                        </Text>

                        <Text style={styles.subtitle}>2. How We Use Your Information</Text>
                        <Text style={styles.paragraph}>
                            The information we collect is used to:
                        </Text>
                        <Text style={styles.listItem}>
                            - Create and maintain your account.
                        </Text>
                        <Text style={styles.listItem}>
                            - Improve our app and provide personalized learning experiences.
                        </Text>
                        <Text style={styles.listItem}>
                            - Communicate important updates and changes to our services.
                        </Text>
                        <Text style={styles.listItem}>
                            - Ensure the security and functionality of the app.
                        </Text>

                        <Text style={styles.subtitle}>3. Data Security</Text>
                        <Text style={styles.paragraph}>
                            We implement strict security measures to protect your data from unauthorized access, loss, or misuse. While no system is entirely secure, we follow industry best practices to safeguard your information.
                        </Text>
                        <Text style={styles.paragraph}>
                            In the unlikely event of a data breach, we will promptly notify affected users and take immediate steps to minimize risks.
                        </Text>

                        <Text style={styles.subtitle}>4. Contact Us</Text>
                        <Text style={styles.paragraph}>
                            If you have any questions or concerns about this Privacy Policy, please contact us at:
                        </Text>
                        <Text style={styles.contactInfo}>Email: support@japlearn.com</Text>
                        <Text style={styles.contactInfo}>Address: JapLearn Headquarters, 123 Learning Lane, Knowledge City</Text>
                    </ScrollView>
                    <CustomButton
                        title="I Agree"
                        onPress={onAgree}
                        buttonStyle={[
                            styles.agreeButton,
                            { backgroundColor: canAgree ? '#4CAF50' : '#ccc' },
                        ]}
                        textStyle={[
                            styles.agreeButtonText,
                            { color: canAgree ? '#fff' : '#666' },
                        ]}
                        disabled={!canAgree} // Disable button if not at the bottom
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        width: '90%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#4CAF50',
        fontFamily: 'Jua',
    },
    intro: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
        fontFamily: 'Jua',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#4CAF50',
        fontFamily: 'Jua',
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
        color: '#4F4F4F',
        fontFamily: 'Jua',
    },
    listItem: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 5,
        color: '#4F4F4F',
        fontFamily: 'Jua',
    },
    bold: {
        fontWeight: 'bold',
        fontFamily: 'Jua',
    },
    contactInfo: {
        fontSize: 16,
        color: '#4CAF50',
        marginBottom: 5,
        fontFamily: 'Jua',
    },
    agreeButton: {
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    agreeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Jua',
    },
});

export default PrivacyPolicyModal;
