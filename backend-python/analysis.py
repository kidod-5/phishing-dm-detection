
from schemas import AnalysisResponse

def percentage(probability: float) -> float:
    return probability * 100

def determine_conclusion(probability: float) -> tuple:
    if probability >= 0.6:
        return (
            "yes",
            "likely a scam or phishing attempt",
            "do not click on any links or respond to the message. Block the account and report it to the platform.",
            "red"
        )
    elif probability <= 0.3:
        return (
            "no",
            "likely genuine",
            "you can safely respond to the message, but always exercise caution when sharing personal information online!",
            "green"
        )
    else:
        return (
            "maybe",
            "ambiguous. You should investigate a little more to be sure",
            "examine details about the account before taking any action.",
            "blue"
        )
    
def get_analysis(query: str) -> AnalysisResponse:

    print(f"Query: {query}")
    
    raw_probability = 0.9
    probability = percentage(raw_probability)
    answer, conclusion, advice, color = determine_conclusion(raw_probability)

    return AnalysisResponse(query= query, answer=answer, probability=probability, conclusion=conclusion, advice=advice, color=color)