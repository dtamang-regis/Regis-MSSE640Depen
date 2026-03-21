import unittest
from codes.assignment1 import triangle_validator

class TestTriangleValidator(unittest.TestCase):

    def test_equilateral(self):
        self.assertEqual(triangle_validator(5, 5, 5), "Equilateral")

    def test_isosceles(self):
        self.assertEqual(triangle_validator(5, 5, 8), "Isosceles")

    def test_scalene(self):
        self.assertEqual(triangle_validator(3, 4, 5), "Scalene")

    def test_invalid_inequality(self):
        self.assertEqual(triangle_validator(-1, 2, 2), "Invalid: Negative/Zero")
        self.assertEqual(triangle_validator(0, 5, 5), "Invalid: Negative/Zero")

if __name__ == '__main__':
    unittest.main()