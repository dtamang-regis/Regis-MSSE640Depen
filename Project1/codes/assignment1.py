def triangle_validator(a, b, c):
    if a <= 0 or b <= 0 or c <= 0:
        return "Invalid: Negative/Zero"
    if not ((a + b > c) and (a + c > b) and (b + c > a)):
        return "Invalid: Inequality Failure"
    
    if a == b == c:
        return "Equilateral"
    elif a == b or b == c or a == c:
        return "Isosceles"
    else:
        return "Scalene"
    
if __name__ == "__main__":
    try:
        side_a = float(input("Enter length of side A: "))
        side_b = float(input("Enter length of side B: "))
        side_c = float(input("Enter length of side C: "))

    except:
        print("Invalid input! Please enter positive numbers only.")