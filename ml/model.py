import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from sklearn.preprocessing import LabelEncoder

class MusicGenreClassifier:
    def __init__(self):
        self.genres = ['blues', 'classical', 'country', 'disco', 'hiphop', 
                      'jazz', 'metal', 'pop', 'reggae', 'rock']
        self.model = self._build_model()
        self.label_encoder = LabelEncoder()
        self.label_encoder.fit(self.genres)
    
    def _build_model(self):
        model = Sequential([
            Dense(512, activation='relu', input_shape=(128,)),
            Dropout(0.3),
            Dense(256, activation='relu'),
            Dropout(0.3),
            Dense(128, activation='relu'),
            Dropout(0.3),
            Dense(64, activation='relu'),
            Dense(10, activation='softmax')
        ])
        
        model.compile(
            optimizer='adam',
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )
        
        return model
    
    def predict(self, features):
        # Ensure features are in the correct shape
        features = np.array(features).reshape(1, -1)
        
        # Get prediction probabilities
        pred_probs = self.model.predict(features)
        
        # Get the predicted class index
        pred_class = np.argmax(pred_probs)
        
        # Convert to genre label
        predicted_genre = self.genres[pred_class]
        
        return predicted_genre