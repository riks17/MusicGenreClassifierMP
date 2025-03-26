import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Upload, Music, AlertCircle, Clock } from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongHistory();
  }, []);

  const fetchSongHistory = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/songs", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSongs(response.data);
    } catch (err) {
      console.error("Error fetching song history:", err);
      setError("Failed to load song history");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("audio/")) {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please select a valid audio file");
      setFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsAnalyzing(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/songs",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await fetchSongHistory();
      setFile(null);

      // Show success message if needed
      console.log("Upload successful:", response.data);
    } catch (err) {
      console.error("Upload error:", err.response || err);
      setError(
        err.response?.data?.message || "Error uploading file. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.name}!
            </h1>
            <Music className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-gray-600 mb-8">
            Upload your audio file to classify its genre
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="hidden"
              id="audio-upload"
            />
            <label
              htmlFor="audio-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-12 w-12 text-purple-500 mb-4" />
              <span className="text-gray-600">
                {file ? file.name : "Click to upload or drag and drop"}
              </span>
              <span className="text-sm text-gray-500 mt-2">
                Supported formats: MP3, WAV, OGG
              </span>
            </label>
          </div>

          {error && (
            <div className="mt-4 flex items-center text-red-500">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          {file && !error && (
            <button
              onClick={handleUpload}
              disabled={isAnalyzing}
              className="mt-6 w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Genre"}
            </button>
          )}
        </div>

        {/* Song History Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Analysis History
            </h2>
            <Clock className="h-6 w-6 text-purple-500" />
          </div>

          {songs.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No songs analyzed yet
            </p>
          ) : (
            <div className="space-y-4">
              {songs.map((song) => (
                <div
                  key={song._id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {song.filename}
                      </h3>
                      <p className="text-purple-600 font-semibold">
                        {song.genre}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(song.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
