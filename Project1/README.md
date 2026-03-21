-------------

author: Depen Tamang

--------------

# Triangle Validator Program 

## Overview
This project is a Python-based program that determines whether three given side lengths form a valid triangle and identifies the triangle type (scalene, isosceles, or equilateral).
The program also handles edge cases such as zero or negative inputs and includes unit tests to validate correctness. 

## Features
- Validates triangle using triangle inequality theorem
- Identifies trianlge type:
    - Equilateral
    - Isosceles
    - Scalene
- Handles invalid inputs (zero, negative values)
- Includes automated unit tests using Python's `unittest`

## Project Structure
Project1/
├── codes/
│ ├── init.py
│ └── assignment1.py
├── tests/
│ ├── init.py
│ └── test_assignment1.py
└── README.md
└── Project1UnitTest.md

## Requirements 
- Python 3.x

## How to Run the Program
You can run the main logic by importing the function in `assignment1.py` or adding a driver function.

Example:
python codes/assignment1.py (for windows)
python3 codes/assignment1.py (for mac)

To run Unit Tests
python -m unittest discover -v (for windows)
python3 -m unittest discover -v (for mac)

## Logic Used
A triangle is valid if:
- Sum of any two sides is greater than third side

Triangle types:
- Equilateral -> all sides equal
- Isosceles -> two sides equal
- Scalene -> all sides different

## Error Handling 
The program checks for:
- Zero-length sides
- Negative values

# Example Inputs & Outputs

Input                       Output
(3,4,5)                     Valid, Scalene
(3,3,3)                     Valid, Equilateral
(3,3,4)                     Valid, Isosceles
(1,2,3)                     Invalid, Triangle
(0,4,5)                     Invalid Input 