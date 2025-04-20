import axios from "axios";
import Song from "../models/songModel.js";
import qs from "qs";
async function getSpotifyAccessToken() {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    qs.stringify({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${process.env.ID}:${process.env.SECRET}`).toString(
            "base64"
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
}

async function getRecommendationsByGenre(genres = []) {
  const token = await getSpotifyAccessToken();
  if (!token) {
    throw new Error("Failed to get Spotify access token");
  }
  const shuffledGenres = genres.sort(() => Math.random() - 0.5); // Shuffle the genres randomly
  const genreSeeds = shuffledGenres.slice(0, 5).join(","); // max 5 genres
  console.log("Genre Seeds:", genreSeeds); // Log the genre seeds for debugging
  console.log(`https://api.spotify.com/v1/search?q=genre:${genreSeeds}&type=track&limit=10`)
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=genre:${genreSeeds}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // Extract relevant information from the response
  const tracks = response.data.tracks.items.map((item) => ({
    name: item.name,
    artist: item.artists.map((artist) => artist.name).join(", "), // Join multiple artists if present
    duration: item.duration_ms, // Duration in ms
    image: item.album.images[0].url, // Get the album image (largest size)
    link: item.external_urls.spotify, // Link to the song on Spotify
  }));
  return tracks;
}
const getRecommendations = async (req, res) => {
  try {
    const songs = await Song.find({ user: req.user._id });

    const genrePayload = songs.map((song) => ({
      genre: song.genre,
    }));
    const mlResponse = await axios.post("http://localhost:8000/recommend/", {
      songs: genrePayload,
    });
    const recommendations = await getRecommendationsByGenre(
      mlResponse.data.recommended_genres
    );
    res.status(200).json(recommendations);
  } catch (error) {
    console.error("Recommendation error:", error.message);
    res.status(500).json({ error: "Failed to get recommendations" });
  }
};

export { getRecommendations };
