"""
Selenium Test 2: Login Functionality
Test Case: Verify login functionality works correctly on PHPTravels demo site
Author: QA Automation Engineer
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_login_functionality():
    """
    Test the login functionality on PHPTravels demo site
    User Story: As a registered user, I want to login to my account so that I can access personalized features
    """
    driver = None
    test_passed = True
    
    try:
        # Initialize Chrome WebDriver with simplified approach for Apple Silicon
        options = webdriver.ChromeOptions()
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        
        # Simple initialization without webdriver-manager
        print("Initializing Chrome WebDriver...")
        driver = webdriver.Chrome(options=options)
        driver.maximize_window()
        
        print("=== TEST 2: LOGIN FUNCTIONALITY ===")
        print("Navigating to AutomationExercise website...")
        
        # Navigate to AutomationExercise - perfect for testing
        driver.get("https://automationexercise.com/")
        wait = WebDriverWait(driver, 10)
        
        # Look for login functionality - AutomationExercise has "Signup/Login" link
        print("Looking for login functionality...")
        
        # Look for Signup/Login link
        login_link = None
        login_selectors = [
            "//a[contains(text(),'Signup / Login')]",
            "//a[contains(text(),'Signup/Login')]",
            "//a[contains(text(),'Login')]",
            "//a[contains(@href,'login')]"
        ]
        
        for selector in login_selectors:
            try:
                login_link = wait.until(EC.element_to_be_clickable((By.XPATH, selector)))
                print(f"Found login link: {selector}")
                break
            except:
                continue
        
        if login_link:
            login_link.click()
            time.sleep(3)
        
        # Find username/email field
        username_field = None
        username_selectors = [
            "//input[@name='email']",
            "//input[@type='email']",
            "//input[contains(@placeholder,'Email')]",
            "//input[@data-qa='login-email']"
        ]
        
        for selector in username_selectors:
            try:
                username_field = wait.until(EC.element_to_be_clickable((By.XPATH, selector)))
                print(f"Found username field: {selector}")
                break
            except:
                continue
        
        # Find password field
        password_field = None
        password_selectors = [
            "//input[@name='password']",
            "//input[@type='password']",
            "//input[contains(@placeholder,'Password')]",
            "//input[@data-qa='login-password']"
        ]
        
        for selector in password_selectors:
            try:
                password_field = wait.until(EC.element_to_be_clickable((By.XPATH, selector)))
                print(f"Found password field: {selector}")
                break
            except:
                continue
        
        # Validate form fields exist
        if not username_field or not password_field:
            raise Exception("Login form not found")
        
        # Enter login credentials with correct credentials
        print("Entering login credentials...")
        username_field.clear()
        username_field.send_keys("dtamang001@regis.edu")
        
        password_field.clear()
        password_field.send_keys("wR87ha@YkfcHxD3")
        
        # Find and click login button
        login_button = None
        button_selectors = [
            "//button[@type='submit']",
            "//button[contains(text(),'Login')]",
            "//input[@type='submit']"
        ]
        
        for selector in button_selectors:
            try:
                login_button = driver.find_element(By.XPATH, selector)
                if login_button.is_displayed():
                    print(f"Found login button: {selector}")
                    break
            except:
                continue
        
        if not login_button:
            raise Exception("Login button not found")
        
        print("Submitting login...")
        login_button.click()
        time.sleep(3)
        
        # Validate successful login
        print("Validating login success...")
        
        # Check for login success indicators
        current_url = driver.current_url.lower()
        page_title = driver.title.lower()
        page_content = driver.page_source.lower()
        
        # Success indicators
        url_indicates_success = any(term in current_url for term in ['dashboard', 'account', 'profile'])
        title_indicates_success = any(term in page_title for term in ['dashboard', 'account', 'welcome'])
        content_indicates_success = any(term in page_content for term in ['dashboard', 'welcome', 'logout', 'profile'])
        
        # Assert login was successful
        if url_indicates_success or title_indicates_success or content_indicates_success:
            print("✅ PASS: Login functionality test completed successfully")
            print("✅ User successfully logged in")
        else:
            print("❌ FAIL: Login was not successful")
            test_passed = False
            
    except Exception as e:
        print(f"❌ FAIL: Test encountered an error - {str(e)}")
        test_passed = False
        
    finally:
        # Keep browser open for inspection
        if driver:
            print("Browser remains open for inspection")
            print("Press Enter to close the browser...")
            input()  # Wait for user input before closing
            driver.quit()
            print("Browser closed")
    
    return test_passed

if __name__ == "__main__":
    print("Starting Selenium Test 2: Login Functionality")
    print("=" * 50)
    
    result = test_login_functionality()
    
    print("\n" + "=" * 50)
    if result:
        print("🎉 TEST 2 COMPLETED: PASSED")
    else:
        print("⚠️  TEST 2 COMPLETED: FAILED")
    print("=" * 50)
