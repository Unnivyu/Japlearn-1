import Constants from 'expo-constants';

const { manifest } = Constants;
let localhost = 'http://localhost:8080'; // Default to localhost
const productionBackendUrl = 'https://backend-ten-roan.vercel.app/api'; // Your production backend URL

if (manifest && manifest.debuggerHost) {
    localhost = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
}

const ipProvided = 'http://192.168.1.17:8080'; // Your provided IP address

// Function to determine the API URL
const getApiUrl = () => {
    // Add any custom logic to choose between IP or localhost for development
    const isProduction = process.env.NODE_ENV === 'production'; // Determine if in production environment
    const useProvidedIp = !isProduction; // Use provided IP in development

    return isProduction ? productionBackendUrl : (useProvidedIp ? ipProvided : localhost);
};

const expoconfig = {
    API_URL: getApiUrl(),
};

export default expoconfig;
