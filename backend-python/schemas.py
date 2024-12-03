####################################################################################################
#                                          Schemas                                                 #
#                                       Genna Olavarri                                             #
#                                          11-2024                                                 #
####################################################################################################

'''This file contains the schemas for the FastAPI server.'''

from pydantic import BaseModel
from typing import List

class AnalysisResponse(BaseModel):
    query: str
    probability: float
    answer: str
    conclusion: str
    advice: str
    additional_qs: List[str] = None
    color: str = None
    type: str
    all_probabilities: List[float]