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

def determine_conclusion(spam, phishing, ham) -> tuple:

    if ham > phishing and ham > spam:
        # Check if the probability that the message is ham is within 10% of the probability
        # that the message is spam or phishing
        if abs(ham - spam) <= 15 or abs(ham - phishing) <= 15:
            return (
                "maybe",
                "ambiguous. You should investigate a little more to be sure",
                "examine details about the account before taking any action.",
                "blue"
            )
        else:
            # If the message is not within 10% of spam or phishing probability, then it is likely ham
            return (
                "no",
                "likely genuine", 
                "you can safely respond to the message, but always exercise caution when sharing personal information online!",
                "green"
            )

    # If the probability of phishing is greater than the probability of spam, then it is likely phishing
    if phishing > spam:
        return (
            "yes",
            "likely a phishing attempt",
            "do not click on any links or respond to the message. Block the account and report it to the platform.",
            "red"
        )
    # If the probability of spam is greater than the probability of phishing, then it is likely spam
    elif spam > phishing:
        return (
            "yes",
            "likely a scam",
            "do not click on any links or respond to the message. Block the account and report it to the platform.",
            "red"
        )
    # If any other case, the message is ambiguous 
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

    spam = probabilities[2]
    phishing = probabilities[1]
    ham = probabilities[0]
    
    phishing_prob = percentage(phishing)
    spam_prob = percentage(spam)
    ham_prob = percentage(ham)

    if ham_prob > phishing_prob and ham_prob > spam_prob:
        message_type = "ham"
        probability = ham_prob
    elif phishing_prob > spam_prob and phishing_prob > ham_prob:
        message_type = "phishing"
        probability = phishing_prob
    else:
        message_type = "spam"
        probability = spam_prob

    answer, conclusion, advice, color = determine_conclusion(spam_prob, phishing_prob, ham_prob)

    return AnalysisResponse(query= query, 
                            answer=answer, 
                            probability=probability, 
                            conclusion=conclusion, 
                            advice=advice, 
                            color=color, 
                            type=message_type,
                            all_probabilities=[ham_prob, phishing_prob, spam_prob]
                            )