# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import pickle

# Step 1: Function to load and preprocess dataset
def load_and_preprocess_data(file_path):
    """
    Load dataset and preprocess it for training.
    :param file_path: Path to the CSV file containing 'text' and 'label' columns.
    :return: Preprocessed features (X) and labels (y).
    """
    # Load the dataset
    data = pd.read_csv(file_path)
    
    # Ensure the dataset has the required columns
    if 'label' not in data.columns or 'message' not in data.columns:
        raise ValueError("Dataset must contain 'text' and 'label' columns.")
    
    # Drop any missing values
    data = data.dropna(subset=['message','label'])
    
    # Normalize labels: lowercase everything
    #data['Label'] = data['Label'].str.lower()
    
    # Map labels to standard categories
    label_mapping = {
        'ham': 'normal',
        0 : 'normal',
        1 : 'spam',
        2 : 'phishing',
        'phishing': 'phishing'
    }
    data['label'] = data['label'].map(label_mapping)
    
    # Remove any rows with labels not in the mapping
    data = data.dropna(subset=['label'])
    
    return data['message'], data['label']

# Step 2: Preprocessing Pipeline
def preprocess_texts(X, max_features=5000):
    """
    Convert raw text into TF-IDF features.
    :param X: Input text data.
    :param max_features: Maximum number of features for TF-IDF.
    :return: TF-IDF transformed features and the vectorizer object.
    """
    tfidf = TfidfVectorizer(max_features=max_features, stop_words='english')
    X_transformed = tfidf.fit_transform(X)
    return X_transformed, tfidf

# Step 3: Model Training and Evaluation
def train_and_evaluate(X, y):
    """
    Train and evaluate a Random Forest Classifier.
    :param X: Features (TF-IDF transformed).
    :param y: Labels.
    :return: Trained model and evaluation report.
    """
    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train a Random Forest model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate the model
    y_pred = model.predict(X_test)
    report = classification_report(y_test, y_pred, output_dict=True)
    
    return model, report

# Step 4: Save Model and Vectorizer
def save_model(model, vectorizer, model_path="model.pkl", vectorizer_path="vectorizer.pkl"):
    """
    Save the trained model and vectorizer to disk.
    :param model: Trained model.
    :param vectorizer: Fitted vectorizer.
    :param model_path: Path to save the model.
    :param vectorizer_path: Path to save the vectorizer.
    """
    with open(model_path, 'wb') as model_file:
        pickle.dump(model, model_file)
    with open(vectorizer_path, 'wb') as vectorizer_file:
        pickle.dump(vectorizer, vectorizer_file)

# Step 5: Main Execution Flow (Example Usage)

file_path = "longer_dataset5.csv" 
X, y = load_and_preprocess_data(file_path)
X_transformed, tfidf_vectorizer = preprocess_texts(X)
trained_model, eval_report = train_and_evaluate(X_transformed, y)

save_model(trained_model, tfidf_vectorizer)

print("Model training complete. Evaluation report:")
print(eval_report)


def predict_message(example_text, model_path="model.pkl", vectorizer_path="vectorizer.pkl"):
    """
    Predict the category of a new message using the trained model.
    :param example_text: The input text to classify.
    :param model_path: Path to the trained model file.
    :param vectorizer_path: Path to the vectorizer file.
    :return: Predicted label and probabilities for each class.
    """
    # Load the trained model and vectorizer
    with open(model_path, 'rb') as model_file:
        model = pickle.load(model_file)
    with open(vectorizer_path, 'rb') as vectorizer_file:
        vectorizer = pickle.load(vectorizer_file)
    
    # Preprocess the input text
    transformed_text = vectorizer.transform([example_text])
    
    # Make predictions
    predicted_label = model.predict(transformed_text)[0]
    predicted_probabilities = model.predict_proba(transformed_text)[0]
    
    return predicted_label, predicted_probabilities

# Example Usage
example_message = "Urgent: Your account will be deactivated in 48 hours. Verify here: https://instaupdates.co"
label, probabilities = predict_message(example_message)
print(f"Predicted Label: {label}")
print(f"Probabilities: {probabilities}")