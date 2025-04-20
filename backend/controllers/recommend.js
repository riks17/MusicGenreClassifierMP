import axios from "axios";
import Song from "../models/songModel.js";

const getRecommendations = async (req, res) => {
      try {
        const songs = await Song.find({ user: req.user._id });

        const genrePayload = songs.map((song) => ({
          genre: song.genre,
        }));

        const mlResponse = await axios.post(
          "http://localhost:8000/recommend/",
          {
            songs: genrePayload,
          }
        );

        res.json(mlResponse.data); 
      } catch (error) {
        console.error("Recommendation error:", error.message);
        res.status(500).json({ error: "Failed to get recommendations" });
      }
    
};

export { getRecommendations };