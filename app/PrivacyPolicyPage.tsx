import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const PrivacyPolicyPage = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Privacy Policy</Text>
                <Text style={styles.paragraph}>
                    At [YourAppName], we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.
                </Text>

                <Text style={styles.subtitle}>1. Information We Collect</Text>
                <Text style={styles.paragraph}>
                    We collect the following types of information:
                </Text>
                <Text style={styles.paragraph}>
                    - <Text style={styles.bold}>Names:</Text> To personalize your experience within the app.
                </Text>
                <Text style={styles.paragraph}>
                    - <Text style={styles.bold}>Emails:</Text> For account management and communication purposes.
                </Text>
                <Text style={styles.paragraph}>
                    - <Text style={styles.bold}>Scores:</Text> To track your progress and performance within the app.
                </Text>

                <Text style={styles.subtitle}>2. How We Use Your Information</Text>
                <Text style={styles.paragraph}>
                    The information we collect is used for the following purposes:
                </Text>
                <Text style={styles.paragraph}>
                    - To improve and personalize your experience within the app.
                </Text>
                <Text style={styles.paragraph}>
                    - To communicate with you regarding your account and updates.
                </Text>
                <Text style={styles.paragraph}>
                    - To analyze your performance and progress to enhance our services.
                </Text>

                <Text style={styles.subtitle}>3. Data Security</Text>
                <Text style={styles.paragraph}>
                    We implement appropriate technical and organizational measures to safeguard your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </Text>

                <Text style={styles.subtitle}>4. Third-Party Services</Text>
                <Text style={styles.paragraph}>
                    We do not share your personal information with third parties except as required by law or with service providers who assist us in operating the app and providing services to you.
                </Text>

                <Text style={styles.subtitle}>5. Changes to This Privacy Policy</Text>
                <Text style={styles.paragraph}>
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
                </Text>

                <Text style={styles.subtitle}>6. Contact Us</Text>
                <Text style={styles.paragraph}>
                    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </Text>
                <Text style={styles.paragraph}>
                    Email: [YourEmail@example.com]
                </Text>

                <Text style={styles.paragraph}>
                    Address: [Your Company Address]
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    contentContainer: {
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default PrivacyPolicyPage;
