# Unit Test Documentation - Triangle Validator

## Overview 
This document describe the unit tests created for the Triangle Validator program. The purpose of these tests is to verify that the program correctly identifies triangle types and properly handles invalid inputs such as zero or negative values. 

The tests were designed to validate both normal functionality and edge cases to ensure robustness of the application.

## Testing Framework
- Language: Python
- Library: `unittest`

The unit tests are implemented in: tests/test_assignment1.py

## Test Cases Implemented

### 1. Equilateral Trianlge Test
- **Input:** (5,5,5)
- **Expected Output:** `"Equilateral"`
- **Description:**
    Verifies that the program correctly identifies a triangle where all three sides are equal.

### 2. Isosceles Triangle Test
- **Input:** (5,5,8)
- **Expected Output:** `"Isosceles"`
- **Description:**
    Ensures the program correctly identifies a triangle with exactly two equal sides.

### 3. Scalene Triangle Test
- **Input:** (3,4,5)
- **Expected Output:** `"Scalene"`
- **Description:**
    Confirms that the program correctly classifies a triangle where all sides are different 

### 4. Invalid Input - Negative Value
- **Input:** (-1,2,2)
- **Expected Output:** `"Invalid: Negative/Zero"`
- **Description:**
    Tests that the program correctly rejects negative side lengths.

### 5. Invalid Input - Zero Value
- **Input:** (0,5,5)
- **Expected Output:** `"Invalid: Negative/Zero"`
- **Description:**
    Ensures the program handles zero-length sides as invalid input. 

## Testing Strategy
The test cases were selected to cover:
- All three valid triangle types (equilateral, isosceles, scalene)
- Edge cases involing invalid inputs (zero and negative values)

This approach ensures that both standard functionality and error handling are verified.

## Running the Tests
To execute all unit tests, run the following command from the project root:

python -m unittest discover tests (for windows)
python3 -m unittest discover tests (for mac)

## Unit Test Execution Output
The following output was generated after running the tests:

test_equilateral (tests.test_assignment1.TestTriangleValidator.test_equilateral) ... ok
test_invalid_inequality (tests.test_assignment1.TestTriangleValidator.test_invalid_inequality) ... ok
test_isosceles (tests.test_assignment1.TestTriangleValidator.test_isosceles) ... ok
test_scalene (tests.test_assignment1.TestTriangleValidator.test_scalene) ... ok

----------------------------------------------------------------------
Ran 4 tests in 0.000s

OK


## Result Analysis
- All 4 tests passed successfully
- No errors or failures were encountered
- The program behaves correctly for both valid and invalid inputs
- Execution time was minimal, indicating efficient implementation 

## Bug Encountered
Bug 1: Missing Validation for Invalid Inputs
- Issue: Initial implementation did not properly handle negative or zero values
- Fix: Added validation logic to return "Invalid: Negative/Zero" when any side is less than or equal to zero

## Problem Faced
- Ensuring validation checks occur before triangle type classification 
- Structuring unit tests to clearly separate valid and invalid cases
- Determining consistent return messages for invalid inputs

## Screenshots 
![alt text](<../Screenshot 2026-03-20 at 9.00.59 PM.png>)