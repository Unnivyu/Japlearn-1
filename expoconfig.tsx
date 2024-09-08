import Constants from 'expo-constants';

const { manifest } = Constants;
let localhost = 'http://localhost:8080'; // Default to localhost

if (manifest && manifest.debuggerHost) {
    localhost = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
}

const ipProvided = 'http://192.168.1.5:8080'; // Your provided IP address

// Function to determine the API URL
const getApiUrl = () => {
    // Add any custom logic to choose between IP or localhost
    const useProvidedIp = true; // Set this condition as needed

    return useProvidedIp ? ipProvided : localhost;
};

const expoconfig = {
    API_URL: getApiUrl(),
};

export default expoconfig;
