import React, { useState } from "react";
import { analyzeMood, getSpotifyRecommendations, spotifyLogin } from "../api";

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [moodAnalysis, setMoodAnalysis] = useState<string>("");
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const handleAnalyzeMood = async () => {
    try {
      const response = await analyzeMood(userInput);
      setMoodAnalysis(response.analysis);
    } catch (error) {
      console.error("Error analyzing mood:", error);
    }
  };

  const handleGetRecommendations = async () => {
    try {
      const genres = moodAnalysis.split(",").map((genre) => genre.trim());
      const response = await getSpotifyRecommendations(genres);
      setRecommendations(response.tracks.map((track: any) => track.name));
    } catch (error) {
      console.error("Error getting recommendations:", error);
    }
  };

  return (
    <div>
      <h1>Moodify</h1>
      <button onClick={spotifyLogin}>Login with Spotify</button>
      <div>
        <input
          type="text"
          placeholder="How are you feeling?"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleAnalyzeMood}>Analyze Mood</button>
      </div>
      {moodAnalysis && <p>Your mood: {moodAnalysis}</p>}
      <div>
        <button onClick={handleGetRecommendations}>Get Recommendations</button>
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
