import librosa
import numpy as np

def extract_features(audio_path, sr=22050, duration=30):
    """
    Extract MFCC features from an audio file.
    
    Parameters:
        audio_path (str): Path to the audio file
        sr (int): Sample rate
        duration (int): Duration in seconds to analyze
    
    Returns:
        numpy.ndarray: Extracted features
    """
    try:
        # Load audio file
        y, sr = librosa.load(audio_path, sr=sr, duration=duration)
        
        # Extract MFCCs
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        
        # Calculate statistics
        mfccs_mean = np.mean(mfccs, axis=1)
        mfccs_std = np.std(mfccs, axis=1)
        mfccs_max = np.max(mfccs, axis=1)
        
        # Extract additional features
        chroma = librosa.feature.chroma_stft(y=y, sr=sr)
        chroma_mean = np.mean(chroma, axis=1)
        
        spectral_centroids = librosa.feature.spectral_centroid(y=y, sr=sr)
        spectral_mean = np.mean(spectral_centroids, axis=1)
        
        # Combine all features
        features = np.concatenate([
            mfccs_mean, mfccs_std, mfccs_max,
            chroma_mean, spectral_mean
        ])
        
        # Pad or truncate to ensure consistent length
        target_length = 128
        if len(features) < target_length:
            features = np.pad(features, (0, target_length - len(features)))
        else:
            features = features[:target_length]
        
        return features
        
    except Exception as e:
        print(f"Error extracting features: {str(e)}")
        return None