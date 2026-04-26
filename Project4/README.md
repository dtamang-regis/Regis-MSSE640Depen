# Selenium Automation Testing Project

## Project Overview

This project demonstrates comprehensive Selenium automation testing using Python for web application testing. The project includes three automated test cases that simulate real user workflows on the PHPTravels demo website, showcasing best practices in test automation, validation logic, and error handling.

## Tools and Technologies Used

- **Python 3.x** - Programming language
- **Selenium WebDriver 4.15.2** - Web automation framework
- **Chrome WebDriver** - Browser driver for Chrome
- **webdriver-manager 4.0.1** - Automatic WebDriver management
- **PyCharm/VS Code** - Recommended IDEs

## Website Choice Justification

**AutomationExercise (https://automationexercise.com/)** was selected as the target website for the following reasons:

- **Automation-Focused**: Specifically designed for automation testing and practice
- **No Bot Protection**: Optimized for testing without anti-bot measures
- **Complete Functionality**: Includes search, login, and product browsing features
- **Stable Environment**: Consistently available and reliable for testing
- **Realistic E-commerce UI**: Represents actual web application patterns
- **Beginner-Friendly**: Clear element structure and predictable behavior
- **Practice Platform**: Built specifically for Selenium and automation testing

## User Stories

### User Story 1: Product Search
**As a shopper, I want to search for products so that I can find items I want to purchase.**

### User Story 2: User Login
**As a registered user, I want to login to my account so that I can access personalized features and shopping cart.**

### User Story 3: Product Browsing
**As a shopper, I want to browse available products so that I can compare options and make informed purchasing decisions.**

## Test Cases

### Test 1: Search Functionality (`test_search_functionality.py`)

**Objective**: Verify that the search functionality works correctly for finding products.

**Test Steps**:
1. Navigate to AutomationExercise website
2. Locate search input field
3. Enter search term ("Tshirt")
4. Click search button or press Enter
5. Validate search results are displayed

**Validation Criteria**:
- Search input field is found and accessible
- Search term is entered successfully
- Search results appear after submission
- Results contain relevant product information

**Expected Result**: ✅ PASS - Search functionality returns relevant product listings

### Test 2: Login Functionality (`test_login_functionality.py`)

**Objective**: Verify that users can successfully login to their accounts.

**Test Steps**:
1. Navigate to AutomationExercise website
2. Click "Signup / Login" link
3. Enter email and password
4. Submit login form
5. Validate successful login

**Validation Criteria**:
- Login form is accessible
- Credentials are entered successfully
- User is redirected to account page
- Welcome message is displayed

**Expected Result**: ✅ PASS - User successfully logs in and accesses account features

### Test 3: Product Browsing (`test_product_browsing.py`)

**Objective**: Verify that users can browse and interact with product listings.

**Test Steps**:
1. Navigate to AutomationExercise website
2. Browse available product listings on homepage
3. Click on a product for details
4. Validate product information display
5. Test product interaction

**Validation Criteria**:
- Product listings are displayed
- Product information (name, price) is visible
- Users can interact with listings
- Product details are accessible

**Expected Result**: ✅ PASS - Product browsing functionality works with proper information display

## Setup Instructions

### Prerequisites

1. **Python 3.7+** installed on your system
2. **Google Chrome** browser installed
3. **Internet connection** for accessing the demo website

### Installation Steps

1. **Clone or download** the project files to your local directory

2. **Navigate to the codes directory**:
```bash
cd codes
```

3. **Install required packages** using pip:
```bash
pip install -r requirements.txt
```

4. **Verify installation** by checking the packages:
```bash
pip show selenium
pip show webdriver-manager
```

### Running the Tests

#### Individual Test Execution

Run each test separately from the `codes` directory:

```bash
# Test 1: Search Functionality
python test_search_functionality.py

# Test 2: Login Functionality  
python test_login_functionality.py

# Test 3: Hotel Browsing
python test_hotel_browsing.py
```

#### Run All Tests

Create a batch file or run sequentially from the `codes` directory:

```bash
python test_search_functionality.py
python test_login_functionality.py
python test_hotel_browsing.py
```

### Expected Output

Each test will display:
- Test initialization messages
- Step-by-step execution details
- Validation results
- Final PASS/FAIL status

**Sample Output**:
```
=== TEST 1: SEARCH FUNCTIONALITY ===
Navigating to PHPTravels demo site...
Looking for search functionality...
Found search input with selector: //input[@placeholder='Search for city, hotel, or destination']
Entering search term: 'New York'
Found search button with selector: //button[contains(text(),'Search')]
Clicked search button
Found 5 search results using selector: //div[contains(@class,'result')]
✅ PASS: Search functionality test completed successfully
✅ Search results were displayed after performing search

==================================================
🎉 TEST 1 COMPLETED: PASSED
==================================================
```

## Project Structure

```
Project4/
├── README.md                    # This documentation file
└── codes/                       # Source code directory
    ├── requirements.txt         # Python dependencies
    ├── test_search_functionality.py # Test 1: Search functionality
    ├── test_login_functionality.py  # Test 2: Login functionality
    └── test_product_browsing.py     # Test 3: Product browsing
```

## Test Execution Screenshots

### Test 1: Search Functionality

![alt text](<../Screenshot 2026-04-26 at 3.49.40 PM.png>)

![alt text](<../Screenshot 2026-04-26 at 3.49.42 PM.png>)

**Caption**: Search functionality test successfully executed showing search input field with "Tshirt" entered and search results displayed on AutomationExercise website.

### Test 2: Login Functionality  

![alt text](<../Screenshot 2026-04-26 at 3.54.19 PM.png>)

![alt text](<../Screenshot 2026-04-26 at 3.54.26 PM.png>)

**Caption**: Login functionality test successfully executed showing user credentials entered and successful login confirmation with account access on AutomationExercise website.

### Test 3: Product Browsing Functionality

![alt text](<../Screenshot 2026-04-26 at 3.56.08 PM.png>)

![alt text](<../Screenshot 2026-04-26 at 3.56.15 PM.png>)

**Caption**: Product browsing functionality test successfully executed showing product listings displayed and interaction with product details on AutomationExercise website.

## Troubleshooting

### Common Issues and Solutions

1. **WebDriver Installation Issues**:
   ```bash
   # If webdriver-manager fails, manually install ChromeDriver
   # Download from: https://chromedriver.chromium.org/
   # Add to PATH or specify location in code
   ```

2. **Browser Not Found**:
   - Ensure Chrome browser is installed
   - Check Chrome version compatibility
   - Restart the test after Chrome installation

3. **Network Issues**:
   - Verify internet connection
   - Check if PHPTravels demo site is accessible
   - Try accessing the site manually first

4. **Element Not Found Errors**:
   - Website structure may have changed
   - Wait for page to load completely
   - Check if selectors need updating

5. **Permission Issues** (macOS/Linux):
   ```bash
   # Give ChromeDriver execution permissions
   chmod +x chromedriver
   ```

## Best Practices Demonstrated

1. **Proper WebDriver Management**: Using webdriver-manager for automatic driver handling
2. **Error Handling**: Comprehensive try-catch blocks with cleanup
3. **Resource Management**: Always quitting browser in finally blocks
4. **Explicit Waits**: Using WebDriverWait for reliable element detection
5. **Multiple Selector Strategies**: Fallback selectors for robust element location
6. **Clear Logging**: Detailed console output for test execution tracking
7. **Modular Design**: Separate test files for maintainability

## Optional Improvements

### 1. Page Object Model (POM) Implementation
```python
class LoginPage:
    def __init__(self, driver):
        self.driver = driver
        self.username_field = (By.NAME, "email")
        self.password_field = (By.NAME, "password")
        self.login_button = (By.XPATH, "//button[@type='submit']")
    
    def login(self, username, password):
        # Implementation
        pass
```

### 2. Test Framework Integration
- **PyTest**: Use pytest framework for better test organization
- **Fixtures**: Implement setup/teardown fixtures
- **Assertions**: Use pytest assertions for validation
- **Reporting**: Generate HTML test reports

### 3. Configuration Management
```python
# config.py
BASE_URL = "https://phptravels.com/demo/"
TEST_CREDENTIALS = {
    "email": "user@phptravels.com",
    "password": "demouser"
}
IMPLICIT_WAIT = 10
EXPLICIT_WAIT = 15
```

### 4. Enhanced Reporting
- **Screenshots on Failure**: Capture screenshots when tests fail
- **Logging**: Implement structured logging with timestamps
- **Test Reports**: Generate comprehensive HTML reports
- **Metrics**: Track execution time and performance

### 5. Data-Driven Testing
```python
import pytest

@pytest.mark.parametrize("destination,expected_results", [
    ("New York", 5),
    ("London", 8),
    ("Paris", 6)
])
def test_search_multiple_destinations(destination, expected_results):
    # Implementation
    pass
```

## Learning Outcomes

This project demonstrates:
- **Selenium WebDriver fundamentals** and best practices
- **Test automation strategies** for web applications
- **Error handling** and resource management
- **Element location strategies** and fallback mechanisms
- **Test validation** and result verification
- **Professional code structure** and documentation

## Team Members

- **QA Automation Engineer**: Test design and implementation
- **Technical Writer**: Documentation and user guides
- **Test Analyst**: Test case design and validation criteria

---

