####################################################################################################
#                                          Analysis                                                #
#                                       Genna Olavarri                                             #
#                                          11-2024                                                 #
####################################################################################################

'''This file contains the analysis logic for the FastAPI server.'''

####################################################################################################

from schemas import AnalysisResponse

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import pickle

def percentage(probability: float) -> float:
    '''
    Convert a probability to a percentage
    '''
    return probability * 100

def determine_conclusion(probability: float) -> tuple:
    '''
    Determine the advice and conclusion based on the probability.
    '''

    # 60% or higher = scam
    if probability >= 0.6:
        return (
            "yes",
            "likely a scam or phishing attempt",
            "do not click on any links or respond to the message. Block the account and report it to the platform.",
            "red"
        )
    # 30% or lower = genuine
    elif probability <= 0.3:
        return (
            "no",
            "likely genuine",
            "you can safely respond to the message, but always exercise caution when sharing personal information online!",
            "green"
        )
    # 40-60% = maybe
    else:
        return (
            "maybe",
            "ambiguous. You should investigate a little more to be sure",
            "examine details about the account before taking any action.",
            "blue"
        )
    
def predict_message(message, model_path="model.pkl", vectorizer_path="vectorizer.pkl"):
    """
    Predict the category of a new message using the trained model.
    :param message: The input text to classify.
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
    transformed_text = vectorizer.transform([message])
    
    # Make predictions
    # spam, ham, phishing -- don't care about this for now
    predicted_label = model.predict(transformed_text)[0]

    # list of probabilities for each class
    # [ham, phishing, spam]
    predicted_probabilities = model.predict_proba(transformed_text)[0]
    
    return predicted_probabilities
    
def get_analysis(query: str) -> AnalysisResponse:
    '''
    Get the analysis for a given query.
    '''

    # Load the trained model and vectorizer
    model_path = "model.pkl"
    vectorizer_path = "vectorizer.pkl"

    # Get the probabilities
    probabilities = predict_message(query, model_path, vectorizer_path)

    # spam = probabilities[2]
    phishing = probabilities[1]
    # ham = probabilities[0]
    
    probability = percentage(phishing)
    answer, conclusion, advice, color = determine_conclusion(phishing)

    return AnalysisResponse(query= query, answer=answer, probability=probability, conclusion=conclusion, advice=advice, color=color)