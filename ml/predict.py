import pickle
import librosa
import numpy as np

# Load trained model
with open("genre_classifier.pkl", "rb") as model_file:
    model = pickle.load(model_file)

# Extract features from a new song
def extract_features(file_path):
    y_data, sr = librosa.load(file_path, sr=22050, mono=True, duration=30)
    mfcc = np.mean(librosa.feature.mfcc(y=y_data, sr=sr, n_mfcc=13).T, axis=0)
    chroma = np.mean(librosa.feature.chroma_stft(y=y_data, sr=sr).T, axis=0)
    mel = np.mean(librosa.feature.melspectrogram(y=y_data, sr=sr).T, axis=0)
    return np.hstack([mfcc, chroma, mel])

# Predict genre
def predict_genre(file_path):
    features = extract_features(file_path).reshape(1, -1)
    genre_index = model.predict(features)[0]
    genres = ['blues', 'classical', 'country', 'disco', 'hiphop', 'jazz', 'metal', 'pop', 'reggae', 'rock']
    return genres[genre_index]

# Example usage
file_path = "./test/test2.wav"  # Change this to your audio file
predicted_genre = predict_genre(file_path)
print(f"Predicted Genre: {predicted_genre}")
