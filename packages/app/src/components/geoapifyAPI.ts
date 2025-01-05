import axios from 'axios';

const GEOAPIFY_API_KEY = 'f5321287af014a29bdfcfebf468b4282';

export const geocodeLocation = async (locationName: string) => {
  try {
    const response = await axios.get('https://api.geoapify.com/v1/geocode/search', {
      params: {
        text: locationName,
        apiKey: GEOAPIFY_API_KEY,
      },
    });
    return response.data.features[0].geometry.coordinates;
  } catch (error) {
    console.error('Error fetching geocode data from Geoapify:', error);
    throw error;
  }
};

export const calculateDistance = async (lat1: number, lon1: number, lat2: number, lon2: number) => {
  try {
    const response = await axios.get(`https://api.geoapify.com/v1/routing`, {
      params: {
        waypoints: `${lat1},${lon1}|${lat2},${lon2}`,
        mode: 'drive',
        apiKey: GEOAPIFY_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching distance from Geoapify:', error);
    throw error;
  }
};
