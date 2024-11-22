import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const analyzeMood = async (input: string): Promise<any> => {
  const response = await axios.post(`${API_BASE_URL}/mood/analyze`, { input });
  return response.data;
};

export const getSpotifyRecommendations = async (genres: string[]): Promise<any> => {
  const response = await axios.post(`${API_BASE_URL}/spotify/recommendations`, { genres });
  return response.data;
};

export const spotifyLogin = (): void => {
  window.location.href = `${API_BASE_URL}/spotify/auth/login`;
};
