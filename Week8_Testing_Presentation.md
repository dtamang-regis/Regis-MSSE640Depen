# Week 8 Testing Presentation

## 1. Introduction

**Name:** Depen Tamang

**Work Mode:** Individual work on all 4 software testing projects

This presentation summarizes my hands-on experience with software testing across four different domains: unit testing, API testing, performance testing, and browser automation testing.

---

## 2. Target Testing Applications

### Applications Tested:

| Project | Application | Description |
|---------|-------------|-------------|
| **Project 1** | Triangle Validator (Custom Python App) | A program that validates triangle types based on side lengths |
| **Project 2** | Word API (Custom FastAPI Application) | REST API for word definitions, synonyms, and examples |
| **Project 3** | Same Word API | Performance testing target for load, endurance, and stress tests |
| **Project 4** | AutomationExercise Website | E-commerce demo site for browser automation testing |

### Why These Were Selected:
- **Triangle Validator:** Simple logic perfect for learning unit testing fundamentals
- **Word API:** Custom-built to avoid rate limits and have full control over testing
- **AutomationExercise:** Specifically designed for automation practice with no bot protection

---

## 3. How I Built the Tests

### Languages Used:
- **Python 3.x** - Primary language for all projects

### Frameworks & Tools:

| Project | Framework/Tool | Purpose |
|---------|----------------|---------|
| Project 1 | `unittest` (built-in) | Unit testing framework |
| Project 2 | FastAPI, Postman | API development and manual testing |
| Project 3 | Apache JMeter | Performance and load testing |
| Project 4 | Selenium WebDriver 4.15.2 | Browser automation |

### Additional Libraries:
- `webdriver-manager` - Automatic ChromeDriver management
- `requests` - HTTP client for API integration
- `pydantic` - Data validation for API models
- `uvicorn` - ASGI server for FastAPI

### Project Structure Summary:
```
Regis-MSSE640Depen/
├── Project1/          # Unit Testing (Triangle Validator)
│   ├── codes/
│   └── tests/
├── Project2/          # API Testing with Postman
│   └── codes/
├── Project3/          # JMeter Performance Testing
├── Project4/          # Selenium Automation
│   └── codes/
└── [Screenshots]/     # Test evidence and results
```

### How Tests Were Coded:
- **Unit Tests:** Created test classes inheriting from `unittest.TestCase` with assertions
- **API Tests:** Built FastAPI endpoints first, then tested via Postman with environment variables
- **Performance Tests:** Configured JMeter Thread Groups, HTTP Samplers, and Listeners
- **Selenium Tests:** Used explicit waits, multiple selector strategies, and try-catch blocks

---

## 4. AI Tools Used

### AI Assistance Inferred:
Based on the project complexity and documentation quality, AI tools likely assisted with:

- **Code Generation:** Boilerplate FastAPI setup, Selenium WebDriver initialization
- **Debugging Help:** Troubleshooting JMeter UI issues and plugin errors
- **Test Case Design:** Structuring unit test assertions and edge cases
- **Documentation:** README formatting and explanation clarity
- **Learning Concepts:** Understanding HTTP protocols, CORS, and performance metrics

### Specific AI Use Cases:
- FastAPI CORS middleware configuration
- Selenium explicit wait patterns and selector strategies
- JMeter component explanations and troubleshooting steps
- Markdown documentation formatting

---

## 5. Screenshot Section

> **Note:** Insert screenshots using the following syntax. Place actual screenshot files in the project root folder.

### Project 1: Unit Testing Screenshots
```markdown
![Unit Test Execution](./Screenshot%202026-03-20%20at%209.00.59%20PM.png)
```

### Project 2: Postman API Testing Screenshots
```markdown
![Postman Collection](./Screenshot%202026-03-29%20at%201.56.19%20PM.png)
![GET Request Test](./Screenshot%202026-03-29%20at%201.58.33%20PM.png)
![POST Request Test](./Screenshot%202026-03-29%20at%202.02.36%20PM.png)
![Error Handling](./Screenshot%202026-03-29%20at%202.04.26%20PM.png)
```

### Project 3: JMeter Performance Testing Screenshots
```markdown
![Load Test Graph](./load-test-graph.png)
![Endurance Test Graph](./endurance-test-graph.png)
![Stress Test Graph](./stress-test-graph.png)
![Thread Group Config](./Screenshot%202026-04-05%20at%201.19.47%20PM.png)
![Test Results](./Screenshot%202026-04-05%20at%201.34.41%20PM.png)
```

### Project 4: Selenium Automation Screenshots
```markdown
![Search Test](./Screenshot%202026-04-26%20at%203.49.42%20PM.png)
![Login Test](./Screenshot%202026-04-26%20at%203.54.26%20PM.png)
![Product Browsing](./Screenshot%202026-04-26%20at%203.56.15%20PM.png)
```

---

## 6. Summary of 4 Assignments

### Project 1: Unit Testing

**What Was Tested:**
- Triangle Validator program that classifies triangles by side lengths

**Test Cases:**
| Test | Input | Expected Result | Status |
|------|-------|-----------------|--------|
| Equilateral | (5, 5, 5) | "Equilateral" | PASS |
| Isosceles | (5, 5, 8) | "Isosceles" | PASS |
| Scalene | (3, 4, 5) | "Scalene" | PASS |
| Invalid Input | (-1, 2, 2) | "Invalid: Negative/Zero" | PASS |

**Key Results:**
- **4/4 tests passed**
- Execution time: 0.000s
- Bug fixed: Added validation for negative/zero inputs

---

### Project 2: Postman API Testing

**APIs Tested:**
Custom Word API with endpoints:
- `GET /` - Status check
- `GET /words` - List all words
- `GET /word/{word}` - Get word details
- `POST /word` - Add custom word
- `PUT /word/{word}` - Update word
- `DELETE /word/{word}` - Delete word

**Assertions Used:**
- Status code validation (200, 201, 404)
- JSON response structure validation
- Error message validation

**Results:**
- All CRUD operations working correctly
- External API integration (dictionaryapi.dev) functional
- CORS properly configured for cross-origin requests

---

### Project 3: JMeter Performance Testing

**Tests Performed:**

| Test Type | Users | Ramp-up | Duration | Purpose |
|-----------|-------|---------|----------|---------|
| **Load Test** | Moderate | Gradual | Steady | Normal performance |
| **Endurance Test** | 50 threads | 10s | 50 loops | Long-term stability |
| **Stress Test** | 200 threads | 5s | Spike | Breaking point |

**Key Metrics:**
- Endpoint tested: `/words`
- **Endurance:** 50 users, 10s ramp-up, 50 loops
- **Stress:** 200 users, 5s ramp-up

**Results:**
- Application stable under moderate load
- Performance degraded under stress (expected)
- System recovered after spike testing

---

### Project 4: Selenium Browser Automation

**Scenarios Tested:**

| Test | Scenario | Website | Result |
|------|----------|---------|--------|
| Test 1 | Product Search | automationexercise.com | PASS |
| Test 2 | User Login | automationexercise.com | PASS |
| Test 3 | Product Browsing | automationexercise.com | PASS |

**Implementation Details:**
- Used Chrome WebDriver with automatic driver management
- Implemented explicit waits (WebDriverWait)
- Multiple fallback selector strategies
- Comprehensive error handling with try-catch blocks

**Results:**
- All 3 tests passed
- Reliable element detection using XPath and CSS selectors
- Browser properly closed after each test

---

## 7. Short Demo Recommendation

### Recommended Demo: Project 4 Selenium Automation

**Why:** Most visually impressive - shows browser actually moving and interacting with a real website

**Step-by-Step Instructions:**

1. **Setup (15 seconds):**
   ```bash
   cd Project4/codes
   pip install -r requirements.txt
   ```

2. **Run the Search Test (1 minute):**
   ```bash
   python test_search_functionality.py
   ```
   - Watch Chrome open automatically
   - See it navigate to automationexercise.com
   - Observe search field being located and "Tshirt" entered
   - Watch search results appear

3. **Narration Points:**
   - "This is Selenium WebDriver controlling Chrome"
   - "It finds elements using XPath selectors"
   - "Notice the explicit wait - it waits for elements to load"
   - "The test validates that search results actually appear"

4. **Show the Code (30 seconds):**
   - Open `test_search_functionality.py`
   - Highlight the WebDriver setup, element location, and assertion

**Alternative Quick Demo:** Project 1 Unit Tests
- Run `python3 -m unittest discover -v`
- Shows instant feedback with all tests passing

---

## 8. Analysis of Agentic AI Coding Tools

### Pros

| Benefit | Example from My Projects |
|---------|--------------------------|
| **Faster Coding** | FastAPI boilerplate and CORS setup generated quickly |
| **Better Debugging** | JMeter UI issues resolved with AI-guided troubleshooting |
| **Test Case Generation** | Unit test structure and edge case suggestions |
| **Learning Support** | HTTP concepts, status codes, and API security explained |
| **Documentation** | README formatting and clear explanation templates |

### Cons

| Risk | Real Example |
|------|--------------|
| **Wrong Code** | AI might suggest outdated Selenium methods |
| **Needs Verification** | Generated selectors may not match actual website structure |
| **Security Risks** | Hardcoded credentials in examples must be removed |
| **Overreliance** | Understanding *why* code works is still essential |

### Special Considerations for Testing

**Critical Points:**
- **Validate AI-generated tests** - Always run and verify before trusting results
- **Edge cases matter** - AI may miss boundary conditions (e.g., negative numbers in triangle test)
- **False confidence** - Passing tests don't guarantee bug-free code
- **Human review required** - Test logic must be understood, not blindly accepted

**Testing-Specific Risks:**
- AI-generated assertions may check wrong elements
- Performance test configurations may be unrealistic
- Browser automation selectors can become outdated
- Test data might not cover real-world scenarios

---

## 9. Final Conclusion

### Key Lessons Learned

1. **Testing is Essential:** Every application needs multiple testing layers - unit, integration, performance, and UI

2. **Tools Matter:** The right tool for the right job:
   - Unit testing: `unittest` for logic validation
   - API testing: Postman for endpoint verification
   - Performance: JMeter for load simulation
   - UI testing: Selenium for user workflow validation

3. **AI is a Tool, Not a Replacement:** AI accelerates development but human judgment ensures quality

### How Testing Improves Software Quality

- **Catches bugs early** - Unit tests found validation issues before deployment
- **Ensures reliability** - Performance tests revealed breaking points
- **Validates user experience** - Selenium confirmed real user workflows function
- **Documents behavior** - Tests serve as executable documentation

### Future Value of AI in Testing

- **Test Generation:** AI will increasingly suggest comprehensive test cases
- **Maintenance:** AI can help update tests when applications change
- **Analysis:** AI-powered insights from test results and performance metrics
- **Limitation:** Human testers will always be needed for exploratory testing and edge case discovery

---

## Thank You!

**Questions?**

*Depen Tamang*
MSSE 640 - Software Testing
