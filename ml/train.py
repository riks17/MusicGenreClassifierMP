import os
import pickle
import numpy as np
import librosa
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

# Define dataset path and genres
DATASET_PATH = "./genres_original"
GENRES = ['blues', 'classical', 'country', 'disco', 'hiphop', 'jazz', 'metal', 'pop', 'reggae', 'rock']

X, y = [], []

# Feature extraction function
def extract_features(file_path):
    y_data, sr = librosa.load(file_path, sr=22050, mono=True, duration=30)
    
    mfcc = np.mean(librosa.feature.mfcc(y=y_data, sr=sr, n_mfcc=13).T, axis=0)
    chroma = np.mean(librosa.feature.chroma_stft(y=y_data, sr=sr).T, axis=0)
    mel = np.mean(librosa.feature.melspectrogram(y=y_data, sr=sr).T, axis=0)
    
    return np.hstack([mfcc, chroma, mel])

# Process each genre folder
for genre_index, genre in enumerate(GENRES):
    genre_path = os.path.join(DATASET_PATH, genre)
    for file in os.listdir(genre_path):
        file_path = os.path.join(genre_path, file)
        try:
            features = extract_features(file_path)
            X.append(features)
            y.append(genre_index)
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

# Convert to NumPy arrays
X, y = np.array(X), np.array(y)

# Define a pipeline with scaling + classifier
model = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

# Train the model
model.fit(X, y)

# Save the trained model
with open("genre_classifier.pkl", "wb") as model_file:
    pickle.dump(model, model_file)

print("Model trained and saved as 'genre_classifier.pkl'")
