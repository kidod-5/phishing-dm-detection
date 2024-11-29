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