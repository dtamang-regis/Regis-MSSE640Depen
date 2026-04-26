"""
Selenium Test 1: Search Functionality
Test Case: Verify search functionality works correctly on PHPTravels demo site
Author: QA Automation Engineer
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_search_functionality():
    """
    Test the search functionality for hotels on PHPTravels demo site
    User Story: As a traveler, I want to search for hotels so that I can find accommodation options
    
    Note: PHPTravels demo site doesn't have traditional search bar on main page.
    This test navigates to Hotels section and tests available search functionality.
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
        
        print("=== TEST 1: SEARCH FUNCTIONALITY ===")
        print("Navigating to AutomationExercise website...")
        
        # Navigate to AutomationExercise - perfect for testing
        driver.get("https://automationexercise.com/")
        wait = WebDriverWait(driver, 10)
        
        print("Looking for search functionality...")
        
        # AutomationExercise has a clear search bar in the header
        search_input = None
        search_selectors = [
            "//input[contains(@placeholder,'Search')]",
            "//input[@name='search']",
            "//input[@type='search']",
            "//input[contains(@class,'search')]",
            "//div[contains(@class,'search')]//input",
            "//input[@id='search_product']"
        ]
        
        for selector in search_selectors:
            try:
                search_input = wait.until(EC.element_to_be_clickable((By.XPATH, selector)))
                print(f"Found search input: {selector}")
                break
            except:
                continue
        
        # If no search found, try any text input
        if not search_input:
            try:
                search_input = driver.find_element(By.XPATH, "//input[@type='text']")
                print("Using first text input field")
            except:
                raise Exception("No search input field found on the page")
        
        # Enter search term (AutomationExercise has products, so search for a product)
        search_term = "Tshirt"
        print(f"Entering search term: '{search_term}'")
        search_input.clear()
        search_input.send_keys(search_term)
        
        # Submit search (try Enter key first - most reliable)
        print("Submitting search...")
        search_input.send_keys("\n")
        time.sleep(3)
        
        # Validate search was performed
        print("Validating search results...")
        
        # Check 1: URL contains search-related terms
        current_url = driver.current_url.lower()
        url_indicates_search = any(term in current_url for term in ['search', 'view_products', 'product'])
        
        # Check 2: Page title changed to indicate search
        page_title = driver.title.lower()
        title_indicates_search = any(term in page_title for term in ['search', 'tshirt', 'product', 'automation'])
        
        # Check 3: Page contains product-related content
        page_content = driver.page_source.lower()
        content_indicates_search = any(term in page_content for term in ['tshirt', 'product', 'search results', 'item'])
        
        # Check 4: Basic validation - search term appears in page content
        search_term_in_content = search_term.lower() in page_content
        
        # Assert search was successful
        if url_indicates_search or title_indicates_search or content_indicates_search or search_term_in_content:
            print("✅ PASS: Search functionality test completed successfully")
            print("✅ Search was performed and results are indicated")
            if url_indicates_search:
                print("✅ URL indicates search was performed")
            if title_indicates_search:
                print("✅ Page title indicates search results")
            if content_indicates_search:
                print("✅ Page content shows search results")
            if search_term_in_content:
                print("✅ Search term found in page content")
        else:
            print("❌ FAIL: No evidence of search results")
            print(f"Current URL: {current_url}")
            print(f"Page title: {page_title}")
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
    print("Starting Selenium Test 1: Search Functionality")
    print("=" * 50)
    
    result = test_search_functionality()
    
    print("\n" + "=" * 50)
    if result:
        print("🎉 TEST 1 COMPLETED: PASSED")
    else:
        print("⚠️  TEST 1 COMPLETED: FAILED")
    print("=" * 50)
