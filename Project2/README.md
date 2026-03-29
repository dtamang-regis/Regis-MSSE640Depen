-------

author: Depen Tamang

-------

# REST API Project – Week 2 (Postman Testing)

## Overview
This project involves building and testing a simple Python-based REST API using **FastAPI**. The API allows users to perform CRUD operations (Create, Read, Update, Delete) on a word list with definitions, synonyms, and example sentences. Postman is used to test the API endpoints and validate functionality.

## Features
- **GET** – Retrieve all words or a specific word
- **POST** – Add a new word with definition, synonyms, and example
- **PUT** – Update an existing word
- **DELETE** – Remove a word from the list
- Handles edge cases such as missing fields or invalid input
- Tested using **Postman** to ensure all endpoints work correctly

## Project Structure
Project2/
├── codes/
│   ├── __init__.py
│   └── assignment2.py
└── Project2Part1.md

> Note: `README.md` for Week 2 is at the root of the repository (`REGIS/README.md`) to document all projects collectively.

## Requirements 
- Python 3.x
- FastAPI
- Uvicorn (for running the API server)
- Requests (for any HTTP client scripts, optional)

## How to Run the API
1. Navigate to the project directory:  
```bash
cd Project2/codes
```

## Run the FastAPI server:
```bash 
uvicorn assignment2:app --reload
```

## Open your browser or Postman and test the endpoints at:
http://127.0.0.1:8000

| Method | Endpoint      | Description                                           |
| ------ | ------------- | ----------------------------------------------------- |
| GET    | /words        | Get list of all words                                 |
| GET    | /words/{word} | Get details of a specific word                        |
| POST   | /words        | Add a new word with definition, synonyms, and example |
| PUT    | /words/{word} | Update an existing word                               |
| DELETE | /words/{word} | Delete a word                                         |


## Testing with Postman
- Use Postman to send requests to the API endpoints.
- Example workflow:
  - POST a new word
  - GET the word to confirm it was added
  - PUT to update the word
  - DELETE to remove the word
- Verify responses, status codes, and error handling.