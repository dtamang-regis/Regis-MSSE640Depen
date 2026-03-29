-------------

author: Depen Tamang

--------------

# Part 1: Research an APIs and Integration Testing with Postman

## Introduction
This project demonstrates the concepts of API integration testing using Postman. The goal is to understand how APIs work, how HTTP requests and responses are structured, and how to validate API behavior through testing.

For this project, I chose to build my own API using FastAPI instead of using a public API. Public APIs often have rate limits and require API keys, which may not work reliably on different local machines. Building a custom API ensured full control over testing and functionality.

Additionally, I implemented CORS (Cross-Origin Resource Sharing) in my API to allow communication between a frontend (e.g., localhost:3000) and the backend API.


### 1. Basic Functionality of HTTP
HTTP (HyperText Trasfer Protocol) is the foundation of communication on the web. It defines how clients and servers exchange information. 

Client and Servers
- A client is any system that sends a request (e.g., a browser or Postman).
- A server is a system that processes that request and sends back a response. 

Requests and Responses 
- A request is send by the client to the server and includes: URL (endpoint), HTTP method (GET, POST, PUT, PATCH, and DELETE), Headers, Optional body, 
- A response is sent back by the server and includes: Status code, Headers, Body (data, usually JSON).

Header vs Body
- Headers: Contain metadata about the request/response (e.g., content type, authorization).
- Body: Contains the actual data being sent or received (e.g., JSON payload).

Status Codes
HTTP status codes indicate the result of a request:
- 200 OK - Request successful 
- 201 Created - Resoruce successfully created
- 400 Bad Request - Invalid request
- 401 Unauthorized - Authentication required
- 404 Not Found - Resource not found
- 500 Internal Server Error = Server failure

HTTP Verbs
- GET - Retrieve data
- POST - Create new data
- PUT - Update existing data
- DELETE - Remove data

Stateless Nature of HTTP
HTTP is stateless, meaning:
- Each request is independent 
- The server does not remember previous interactions
- Any required context (like authentication) must be included in every request

### 2. Role of APIs in Modern Applications
An API (Application Programming Interface) allows different software systems to communciate with each other. APIs are essential in modern applications because they enable separation between frontend and backend systems.
For example, a web application may use a frontend interface built with React while backend provides data through APIs.

Open APIs
Open APIs (Public APIs) are APIs that are publicly available for developers to use. They allow external developers to access data or services without needing internal system access. 

Example of Open API Usage
A common example is a weather applicaiton:
- The app sends a request to a weather API
- The API returns weather data (temperature, humidity, etc.)
- The app displays this data to the user
This allows develoeprs to build applications withoout creating all services from scratch. 
Source Exmaple: OpenWeather API documentation

### 3. Cross-Origin Resource Sharing (CORS)
CORS (Cross-Origin Resource Sharing) is security feature implemented by web browsers
- It restricts web pages from making requests to a different domain than the one that served the page. 
- This prevents authorized access to resources. 

Example:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

Without CORS enabled on the server, the browser will block the request. 
CORS allows servers to specify which origins are permitted to access their resources. 

### 4. API Security
APIs must be secured to prevent unauthorized access and protect sensitive data. 

-------

# Part 2: Postman Testing

## API OVerview
I created a **Word API using FastAPI** that allows user to:
- Retrieve words
- Add custom words
- Update words
- Delete words

The API also stores custom words in memory.

## Postman Setup

### 1. Collections
Created a Postman colection named ***Word API Testing***

![alt text](<../Screenshot 2026-03-29 at 1.56.19 PM.png>)

Created an environment variable: {{url}} = http://127.0.0.1:8000

## Request Implemneted 

### 1. GET /
Returns API status message

**Response Example:**
```json
{
    "message": "Word API is running"
}
```

![alt text](<../Screenshot 2026-03-29 at 1.58.33 PM.png>)

### 2. GET /words
Returns default and custom words

**Response Example:**
```json
{
    "default_words": [
        "happy",
        "sad",
        "fast",
        "slow",
        "bright",
        "dark",
        "smart",
        "strong",
        "weak",
        "brave"
    ],
    "custom_words": []
}
```

![alt text](<../Screenshot 2026-03-29 at 1.59.51 PM.png>)


### 3. GET /word/{word}
Fetches word details from:
- Custom storage OR
- External dictionary API

Example: GET {{url}}/word/happy

![alt text](<../Screenshot 2026-03-29 at 2.01.20 PM.png>)

### 4. POST /word
Adds a new custom word

Request Body:
```json
{
  "word": "joyful",
  "definition": "feeling happiness",
  "example": "She felt joyful",
  "synonyms": ["happy", "cheerful"]
}
```

Response:
```json
{
    "message": "Word 'joyful' added successfully"
}
```

![alt text](<../Screenshot 2026-03-29 at 2.02.36 PM.png>)

### 5. PUT /word/{word}
Updates an existing word

![\[Insert Screenshot here\]](<../Screenshot 2026-03-29 at 2.03.13 PM.png>)

### 6. DELETE /word/{word}
Deletes a custom word

![alt text](<../Screenshot 2026-03-29 at 2.03.36 PM.png>)

## CRUD and Data Persistenc
The API Supports full CRUD operations:
- Create -> POST
- Read -> GET
- Update -> PUT
- Delete -> DELETE

Data is stored in memory, meaning:
- Data persists during runtime
- Data resets when the server restarts

## Error Handling
Example: Requesting a word that does not exists
GET {{url}}/word/happysssss

Response:
```json
{
    "detail": "Word not found"
}
```

![alt text](<../Screenshot 2026-03-29 at 2.04.26 PM.png>)

## Curl api call

![alt text](<../Screenshot 2026-03-29 at 2.07.26 PM.png>)

## External API Integration
The API integrates with:
https://api.dictionaryapi.dev

- If a word is not found locally, it fetches data from this external API
- Demonstrates real-world API integration

## Conclusion
In this project, I learned how APIs function and how to perform integration testing using Postman. I gained hands-on experience with HTTP methods, request/response structures, and error handling.
Building my own API helped me better understand backend development and how endpoints are designed. Testing with Postman allowed me to validate API behavior and ensure correct data flow.
I also learned the importance of CORS and how it enables communication between frontend and backend systems.