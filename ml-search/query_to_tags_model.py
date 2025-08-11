import json
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics import accuracy_score, classification_report
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout, Bidirectional
from tensorflow.keras.callbacks import EarlyStopping
import pickle
import os

class QueryToTagsModel:
    def __init__(self, max_words=10000, max_len=50, embedding_dim=128, lstm_units=128):
        self.max_words = max_words
        self.max_len = max_len
        self.embedding_dim = embedding_dim
        self.lstm_units = lstm_units
        
        # Initialize components
        self.tokenizer = Tokenizer(num_words=max_words, oov_token='<OOV>')
        self.mlb = MultiLabelBinarizer()
        self.model = None
        
    def load_training_data(self, file_path='data/processed/training_pairs.json'):
        """Load and prepare training data."""
        print("=== Loading Training Data ===")
        
        with open(file_path, 'r') as f:
            training_pairs = json.load(f)
        
        # Extract queries and tags
        queries = [pair['query'] for pair in training_pairs]
        tags_list = [pair['tags'] for pair in training_pairs]
        
        print(f"📊 Loaded {len(queries)} training pairs")
        print(f"📋 Sample queries: {queries[:3]}")
        print(f"🏷️ Sample tags: {tags_list[:3]}")
        
        return queries, tags_list
    
    def prepare_data(self, queries, tags_list):
        """Prepare data for training."""
        print("\n=== Preparing Data ===")
        
        # Fit tokenizer on queries
        self.tokenizer.fit_on_texts(queries)
        print(f"📝 Vocabulary size: {len(self.tokenizer.word_index) + 1}")
        
        # Convert queries to sequences
        sequences = self.tokenizer.texts_to_sequences(queries)
        X = pad_sequences(sequences, maxlen=self.max_len, padding='post', truncating='post')
        
        # Prepare tags (multi-label)
        y = self.mlb.fit_transform(tags_list)
        print(f"🏷️ Number of unique tags: {len(self.mlb.classes_)}")
        print(f"📊 X shape: {X.shape}, y shape: {y.shape}")
        
        return X, y
    
#     def build_model(self, num_tags):
#         """Build LSTM model for query-to-tags prediction."""
#         print(f"\n=== Building LSTM Model ===")
#         print(f"🏗️ Model architecture:")
#         print(f"   - Input: {self.max_len} tokens")
#         print(f"   - Embedding: {self.embedding_dim} dimensions")
#         print(f"   - LSTM: {self.lstm_units} units")
#         print(f"   - Output: {num_tags} tags")
        
#         model = Sequential([
#             # Embedding layer
#             Embedding(self.max_words, self.embedding_dim, input_length=self.max_len),
            
#             # Bidirectional LSTM layers
#             Bidirectional(LSTM(self.lstm_units, return_sequences=True)),
#             Dropout(0.3),
            
#             Bidirectional(LSTM(self.lstm_units // 2)),
#             Dropout(0.3),
            
#             # Dense layers
#             Dense(256, activation='relu'),
#             Dropout(0.3),
            
#             Dense(128, activation='relu'),
#             Dropout(0.3),
            
#             # Output layer (multi-label classification)
#             Dense(num_tags, activation='sigmoid')
#         ])
        
#         # Compile model
#         model.compile(
#             optimizer='adam',
#             loss='binary_crossentropy',
#             metrics=['accuracy']
#         )
        
#         print(f"✅ Model built successfully!")
#         return model
    
#     def train_model(self, X, y, validation_split=0.2, epochs=50, batch_size=32):
#         """Train the LSTM model."""
#         print(f"\n=== Training Model ===")
#         print(f"📊 Training data: {X.shape[0]} samples")
#         print(f"🏷️ Predicting {y.shape[1]} tags")
#         print(f"⚙️ Parameters: epochs={epochs}, batch_size={batch_size}")
        
#         # Split data
#         X_train, X_val, y_train, y_val = train_test_split(
#             X, y, test_size=validation_split, random_state=42
#         )
        
#         # Build model
#         self.model = self.build_model(y.shape[1])
        
#         # Callbacks
#         early_stopping = EarlyStopping(
#             monitor='val_loss',
#             patience=5,
#             restore_best_weights=True
#         )
        
#         # Train model
#         history = self.model.fit(
#             X_train, y_train,
#             validation_data=(X_val, y_val),
#             epochs=epochs,
#             batch_size=batch_size,
#             callbacks=[early_stopping],
#             verbose=1
#         )
        
#         print(f"✅ Training completed!")
#         return history
    
#     def predict_tags(self, query, top_k=5):
#         """Predict relevant tags for a given query."""
#         if self.model is None:
#             raise ValueError("Model not trained yet!")
        
#         # Preprocess query
#         sequence = self.tokenizer.texts_to_sequences([query])
#         padded = pad_sequences(sequence, maxlen=self.max_len, padding='post', truncating='post')
        
#         # Predict
#         predictions = self.model.predict(padded)[0]
        
#         # Get top-k predictions
#         top_indices = np.argsort(predictions)[::-1][:top_k]
#         top_tags = []
        
#         for idx in top_indices:
#             if predictions[idx] > 0.1:  # Threshold for relevance
#                 tag = self.mlb.classes_[idx]
#                 confidence = predictions[idx]
#                 top_tags.append((tag, confidence))
        
#         return top_tags
    
#     def evaluate_model(self, X_test, y_test):
#         """Evaluate model performance."""
#         print(f"\n=== Model Evaluation ===")
        
#         # Predict on test set
#         y_pred = self.model.predict(X_test)
        
#         # Convert to binary predictions
#         y_pred_binary = (y_pred > 0.1).astype(int)
        
#         # Calculate metrics
#         accuracy = accuracy_score(y_test, y_pred_binary)
#         print(f"📊 Accuracy: {accuracy:.4f}")
        
#         # Sample predictions
#         print(f"\n📝 Sample Predictions:")
#         for i in range(min(5, len(X_test))):
#             true_tags = self.mlb.inverse_transform([y_test[i]])[0]
#             pred_tags = self.predict_tags_from_sequence(X_test[i])
#             print(f"Query {i+1}:")
#             print(f"  True: {true_tags[:3]}...")
#             print(f"  Pred: {pred_tags[:3]}...")
    
#     def predict_tags_from_sequence(self, sequence):
#         """Predict tags from a preprocessed sequence."""
#         predictions = self.model.predict(sequence.reshape(1, -1))[0]
#         top_indices = np.argsort(predictions)[::-1][:5]
#         tags = []
#         for idx in top_indices:
#             if predictions[idx] > 0.1:
#                 tags.append(self.mlb.classes_[idx])
#         return tags
    
#     def save_model(self, model_dir='data/models/query_to_tags_model'):
#         """Save the trained model and components."""
#         print(f"\n=== Saving Model ===")
        
#         # Create directory
#         os.makedirs(model_dir, exist_ok=True)
        
#         # Save model
#         self.model.save(f'{model_dir}/model.h5')
        
#         # Save tokenizer
#         with open(f'{model_dir}/tokenizer.pkl', 'wb') as f:
#             pickle.dump(self.tokenizer, f)
        
#         # Save multi-label binarizer
#         with open(f'{model_dir}/mlb.pkl', 'wb') as f:
#             pickle.dump(self.mlb, f)
        
#         print(f"✅ Model saved to: {model_dir}")
    
#     def load_model(self, model_dir='data/models/query_to_tags_model'):
#         """Load a trained model."""
#         print(f"=== Loading Model ===")
        
#         # Load model
#         self.model = tf.keras.models.load_model(f'{model_dir}/model.h5')
        
#         # Load tokenizer
#         with open(f'{model_dir}/tokenizer.pkl', 'rb') as f:
#             self.tokenizer = pickle.load(f)
        
#         # Load multi-label binarizer
#         with open(f'{model_dir}/mlb.pkl', 'rb') as f:
#             self.mlb = pickle.load(f)
        
#         print(f"✅ Model loaded from: {model_dir}")

def main():
    """Main training function."""
    print("=== Query-to-Tags LSTM Model Training ===\n")
    
    # Initialize model
    model = QueryToTagsModel()
    
    # Load training data
    queries, tags_list = model.load_training_data()
    
    # Prepare data
    X, y = model.prepare_data(queries, tags_list)
    
#     # Train model
#     history = model.train_model(X, y, epochs=20, batch_size=64)
    
#     # Evaluate model
#     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
#     model.evaluate_model(X_test, y_test)
    
#     # Save model
#     model.save_model()
    
    # Test predictions
    print(f"\n=== Test Predictions ===")
    test_queries = [
        "I need to generate images from text",
        "Looking for a chatbot for my website",
        "Want to analyze data and create reports",
        "Need help with writing content"
    ]
    
    for query in test_queries:
        predicted_tags = model.predict_tags(query)
        print(f"\nQuery: '{query}'")
        print(f"Predicted tags: {predicted_tags}")
    
    print(f"\n✅ Training completed successfully!")

if __name__ == "__main__":
    main()
