import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  filename: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    enum: ['blues', 'classical', 'country', 'disco', 'hiphop', 'jazz', 'metal', 'pop', 'reggae', 'rock'],
  },
}, {
  timestamps: true,
});

const Song = mongoose.model('Song', songSchema);

export default Song;