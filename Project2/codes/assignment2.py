from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # allow frontend
    allow_credentials=True,
    allow_methods=["*"],        # allow all methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],        # allow all headers
)

# Default words
words_list = [
    "happy", "sad", "fast", "slow", "bright",
    "dark", "smart", "strong", "weak", "brave"
]

# In-memory storage for custom words
custom_words = {}

# External dictionary API
BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"

# Request models
class WordRequest(BaseModel):
    definition: str
    example: str
    synonyms: list[str]


class CreateWordRequest(WordRequest):
    word: str


@app.get("/")
def home():
    return {"message": "Word API is running"}


#Get all words
@app.get("/words")
def get_words():
    return {
        "default_words": words_list,
        "custom_words": list(custom_words.keys())
    }


#Fetch word data (custom first, then external API)
def fetch_word_data(word):
    word = word.lower()

    # Check custom words
    if word in custom_words:
        return {
            "word": word,
            **custom_words[word]
        }

    # Fetch from external API
    response = requests.get(BASE_URL + word)

    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="Word not found")

    data = response.json()
    meanings = data[0].get("meanings", [])

    synonyms = set()
    definition = None
    example = None

    for meaning in meanings:
        synonyms.update(meaning.get("synonyms", []))

        for defi in meaning.get("definitions", []):
            if not definition:
                definition = defi.get("definition")
            if not example:
                example = defi.get("example")

    return {
        "word": word,
        "definition": definition,
        "example": example,
        "synonyms": list(synonyms)
    }


@app.get("/word/{word}")
def get_word_details(word: str):
    return fetch_word_data(word)

@app.get("/word/{word}/definition")
def get_definition(word: str):
    data = fetch_word_data(word)
    return {
        "word": word,
        "definition": data["definition"]
    }

@app.get("/word/{word}/synonyms")
def get_synonyms(word: str):
    data = fetch_word_data(word)
    return {
        "word": word,
        "synonyms": data["synonyms"]
    }

@app.get("/word/{word}/example")
def get_example(word: str):
    data = fetch_word_data(word)
    return {
        "word": word,
        "example": data["example"]
    }

# POST: Add new word
@app.post("/word")
def add_word(word_data: CreateWordRequest):
    word = word_data.word.lower()

    if word in custom_words:
        raise HTTPException(status_code=400, detail="Word already exists")

    custom_words[word] = {
        "definition": word_data.definition,
        "example": word_data.example,
        "synonyms": word_data.synonyms
    }

    return {"message": f"Word '{word}' added successfully"}


# PUT: Update existing word
@app.put("/word/{word}")
def update_word(word: str, word_data: WordRequest):
    word = word.lower()

    if word not in custom_words:
        raise HTTPException(
            status_code=404,
            detail="Word not found in custom list"
        )

    custom_words[word] = {
        "definition": word_data.definition,
        "example": word_data.example,
        "synonyms": word_data.synonyms
    }

    return {"message": f"Word '{word}' updated successfully"}


# DELETE: Remove word
@app.delete("/word/{word}")
def delete_word(word: str):
    word = word.lower()

    if word not in custom_words:
        raise HTTPException(
            status_code=404,
            detail="Word not found in custom list"
        )

    del custom_words[word]

    return {"message": f"Word '{word}' deleted successfully"}