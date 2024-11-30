####################################################################################################
#                                          Analysis                                                #
#                                       Genna Olavarri                                             #
#                                          11-2024                                                 #
####################################################################################################

'''This file contains the analysis logic for the FastAPI server.'''

####################################################################################################

from schemas import AnalysisResponse

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
    
def get_analysis(query: str) -> AnalysisResponse:
    '''
    Get the analysis for a given query.
    '''

    print(f"Query: {query}")
    
    raw_probability = 0.9
    probability = percentage(raw_probability)
    answer, conclusion, advice, color = determine_conclusion(raw_probability)

    return AnalysisResponse(query= query, answer=answer, probability=probability, conclusion=conclusion, advice=advice, color=color)