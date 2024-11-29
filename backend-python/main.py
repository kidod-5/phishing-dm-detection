from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from loguru import logger
import os

from analysis import get_analysis

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost"
]

# server config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/search-landing")
async def read_item(query: str):
    return get_analysis(query)

if __name__ == "__main__":
    try:
        port = int(os.getenv("PORT", 8000))  # Use PORT from environment, default to 8000
        uvicorn.run("main:app", host="0.0.0.0", port=port)  # Use 0.0.0.0 to allow external traffic
    except Exception as e:
        logger.error(f"Error: {e}")

