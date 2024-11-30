####################################################################################################
#                                            Main                                                  #
#                                       Genna Olavarri                                             #
#                                          11-2024                                                 #
####################################################################################################

'''This is the entry point for the FastAPI server. It sets up the server and handles the requests.'''

####################################################################################################

# FastAPI imports
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import uvicorn
from loguru import logger

# Local imports
from analysis import get_analysis

####################################################################################################

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost"
]

# server config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://isthisphishing.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/search-landing")
async def read_item(query: str):
    return get_analysis(query)

if __name__ == "__main__":
    try:
        uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
    except Exception as e:
        logger.error(f"Error: {e}")

