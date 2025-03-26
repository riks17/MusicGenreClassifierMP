import asyncHandler from 'express-async-handler';
import Song from '../models/songModel.js';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

// @desc    Upload and classify a song
// @route   POST /api/songs
// @access  Private
const uploadSong = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a file');
  }

  try {
    // Create form data for ML service
    const formData = new FormData();
    formData.append('file', fs.createReadStream(req.file.path));
    console.log('uploadSong called !!! teri mkc');
    // Send file to ML service for classification
    const mlResponse = await axios.post(
      "http://localhost:8000/classify",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    const genre = mlResponse.data.genre;

    // Save to database
    const song = await Song.create({
      user: req.user._id,
      filename: req.file.filename,
      genre: genre,
    });
    res.status(201).json(song);
  } catch (error) {
    console.error('Error classifying song:', error);
    res.status(500);
    throw new Error('Error processing audio file');
  }
});

// @desc    Get user's song history
// @route   GET /api/songs
// @access  Private
const getSongs = asyncHandler(async (req, res) => {
  const songs = await Song.find({ user: req.user._id }).sort('-createdAt');
  res.json(songs);
});

export {
  uploadSong,
  getSongs,
};