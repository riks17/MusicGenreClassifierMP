import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

GENRES = ['blues', 'classical', 'country', 'disco', 'hiphop',
          'jazz', 'metal', 'pop', 'reggae', 'rock']

GENRE_FEATURES = np.array([
    [1, 0, 0, 0, 0],   # blues
    [0, 1, 0, 0, 0],   # classical
    [0.7, 0, 0.3, 0, 0], # country
    [0, 0, 1, 0.5, 0], # disco
    [0, 0, 0, 1, 0],   # hiphop
    [0.5, 0.5, 0, 0, 0], # jazz
    [0, 0, 0, 0, 1],   # metal
    [0.2, 0, 0.8, 0, 0], # pop
    [0.1, 0, 0.2, 0, 0.7], # reggae
    [0.3, 0.2, 0, 0, 0.5], # rock
])

def recommend_genre(user_vector, top_k=3):
    """
    user_vector: list or np.array of 5 preferences
    Returns: Top K genre names
    """
    user_vector = np.array(user_vector).reshape(1, -1)
    similarities = cosine_similarity(user_vector, GENRE_FEATURES)
    top_indices = similarities.argsort()[0][-top_k:][::-1]
    return [GENRES[i] for i in top_indices]
