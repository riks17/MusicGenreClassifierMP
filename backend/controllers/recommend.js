import axios from "axios";
import Song from "../models/songModel.js"; // Assuming you have a Song model

const getRecommendations = async (req, res) => {
    try {
        const songs = await Song.find({ user: req.user._id });

        const genreList = songs.map((song) => ({ genre: song.genre }));

        const response = await axios.post("http://localhost:8000/recommend/", {
            songs: genreList,
        });

        res.json(response.data); // { recommended_genres: [...] }
    } catch (err) {
        console.error("Error getting recommendations:", err.message);
        res.status(500).json({ error: "Failed to fetch recommendations" });
    }
};

export { getRecommendations };