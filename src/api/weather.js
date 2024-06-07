import axios from 'axios';

const API_URL = 'http://localhost:5000/weather';

export const fetchWeatherData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};
