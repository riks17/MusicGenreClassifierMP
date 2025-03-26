from fastapi import FastAPI, UploadFile, File, HTTPException
import librosa
import numpy as np
import pickle
import io
import soundfile as sf

# Load the pre-trained model
with open("genre_classifier.pkl", "rb") as f:
    model = pickle.load(f)

# Initialize FastAPI app
app = FastAPI()

# Define available genres
GENRES = ['blues', 'classical', 'country', 'disco', 'hiphop', 
          'jazz', 'metal', 'pop', 'reggae', 'rock']

# Feature extraction function
def extract_features(audio_data, sr):
    """Extracts MFCC, Chroma, and Mel Spectrogram features."""
    try:
        mfccs = np.mean(librosa.feature.mfcc(y=audio_data, sr=sr, n_mfcc=13).T, axis=0)
        chroma = np.mean(librosa.feature.chroma_stft(y=audio_data, sr=sr).T, axis=0)
        mel_spec = np.mean(librosa.feature.melspectrogram(y=audio_data, sr=sr).T, axis=0)
        return np.hstack([mfccs, chroma, mel_spec])
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Feature extraction failed: {str(e)}")

# API route for genre classification
@app.post("/classify")
async def classify_genre(file: UploadFile = File(...)):
    """Receives an audio file and predicts its genre."""
    try:
        # Read file contents
        contents = await file.read()
        audio_file = io.BytesIO(contents)
        print(f"Received file: {file.filename}")
        # Load audio using soundfile
        audio_data, sr = sf.read(audio_file)

        # Extract features
        features = extract_features(audio_data, sr).reshape(1, -1)

        # Predict genre
        prediction = model.predict(features)[0]
        predicted_genre = GENRES[prediction]

        return {"genre": predicted_genre}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
