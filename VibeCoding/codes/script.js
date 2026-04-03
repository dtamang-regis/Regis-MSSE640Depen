// BMI Calculator with Equivalence Class and Boundary Value Testing
// Validation Rules:
// - Age: 18-65 years (valid), <18 or >65 (invalid)
// - Height: 100-250 cm (valid), <100 or >250 (invalid)  
// - Weight: 30-300 kg (valid), <30 or >300 (invalid)
// BMI Categories: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (≥30)

class BMIValidator {
    constructor() {
        this.rules = {
            age: {
                min: 18,
                max: 65,
                unit: 'years'
            },
            height: {
                min: 100,
                max: 250,
                unit: 'cm'
            },
            weight: {
                min: 30,
                max: 300,
                unit: 'kg'
            }
        };
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const form = document.getElementById('bmiForm');
        const inputs = form.querySelectorAll('input[type="number"]');
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateField(input);
            });
            
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    // Validate individual field with equivalence class and boundary value logic
    // EQUivalence Class Testing: Groups inputs into valid/invalid classes
    // Boundary Value Testing: Tests edges where errors commonly occur
    validateField(input) {
        const fieldName = input.name;
        const value = parseFloat(input.value);
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        // Clear previous validation state
        input.classList.remove('valid', 'invalid');
        errorElement.textContent = '';
        
        // Input validation: Handle empty, zero, or negative values
        if (isNaN(value) || input.value === '') {
            errorElement.textContent = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
            input.classList.add('invalid');
            return { valid: false, value: null, error: 'Required field' };
        }
        
        if (value <= 0) {
            errorElement.textContent = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be greater than 0`;
            input.classList.add('invalid');
            return { valid: false, value: null, error: 'Must be positive' };
        }
        
        const rule = this.rules[fieldName];
        let validationResult = { valid: true, value, error: null };
        
        // EQUivalence Class Testing: Valid Class (18-65 for age, 100-250 for height, 30-300 for weight)
        if (value >= rule.min && value <= rule.max) {
            input.classList.add('valid');
            validationResult.valid = true;
        } 
        // EQUivalence Class Testing: Invalid Classes (<18 or >65 for age, etc.)
        else {
            input.classList.add('invalid');
            validationResult.valid = false;
            
            // Boundary Value Analysis: Specific error messages for edge cases
            // Tests values at min-1, min, min+1, max-1, max, max+1
            if (value < rule.min) {
                if (Math.abs(value - rule.min) < 0.1) {
                    errorElement.textContent = `Boundary Error: ${value} is just below minimum (${rule.min} ${rule.unit})`;
                } else {
                    errorElement.textContent = `Invalid: ${value} is below minimum (${rule.min} ${rule.unit})`;
                }
            } else if (value > rule.max) {
                if (Math.abs(value - rule.max) < 0.1) {
                    errorElement.textContent = `Boundary Error: ${value} is just above maximum (${rule.max} ${rule.unit})`;
                } else {
                    errorElement.textContent = `Invalid: ${value} is above maximum (${rule.max} ${rule.unit})`;
                }
            }
            validationResult.error = errorElement.textContent;
        }
        
        return validationResult;
    }

    // Validate all fields
    validateAllFields() {
        const inputs = document.querySelectorAll('input[type="number"]');
        const results = {};
        let allValid = true;
        
        inputs.forEach(input => {
            const validation = this.validateField(input);
            results[input.name] = validation;
            if (!validation.valid) {
                allValid = false;
            }
        });
        
        return { allValid, results };
    }

    // Calculate BMI using precise decimal values (no rounding until display)
    // BMI Formula: weight (kg) / (height in meters)^2
    calculateBMI(weight, height) {
        const heightInMeters = height / 100;
        return weight / (heightInMeters * heightInMeters);
    }

    // Get BMI category using correct boundary ranges
    // Boundary Value Testing: Tests BMI categories at critical boundaries (18.5, 25, 30)
    getBMICategory(bmi) {
        // Use precise BMI value for categorization (no rounding)
        if (bmi < 18.5) return { category: 'Underweight', class: 'underweight' };
        if (bmi < 25) return { category: 'Normal Weight', class: 'normal' };
        if (bmi < 30) return { category: 'Overweight', class: 'overweight' };
        return { category: 'Obese', class: 'obese' };
    }

    // Handle form submission
    handleFormSubmission() {
        const validation = this.validateAllFields();
        
        if (!validation.allValid) {
            this.showValidationError(validation.results);
            return;
        }
        
        const { age, height, weight } = validation.results;
        const bmi = this.calculateBMI(weight.value, height.value);
        const category = this.getBMICategory(bmi);
        
        this.displayResults(bmi, category, validation.results);
    }

    // Show validation error summary
    showValidationError(results) {
        const resultsSection = document.getElementById('resultsSection');
        const validationSummary = document.getElementById('validationSummary');
        
        let summaryHTML = '<h4>Validation Summary:</h4>';
        
        Object.entries(results).forEach(([field, result]) => {
            const statusClass = result.valid ? 'valid' : 'invalid';
            const statusText = result.valid ? '✓ Valid' : '✗ Invalid';
            
            summaryHTML += `
                <div class="validation-item">
                    <span>${field.charAt(0).toUpperCase() + field.slice(1)}:</span>
                    <span class="validation-status ${statusClass}">${statusText}</span>
                </div>
            `;
        });
        
        validationSummary.innerHTML = summaryHTML;
        resultsSection.style.display = 'block';
        
        // Clear BMI display
        document.getElementById('bmiValue').textContent = '--';
        document.getElementById('bmiCategory').textContent = 'Please correct validation errors';
        document.getElementById('bmiCategory').className = 'bmi-category';
    }

    // Display BMI results
    displayResults(bmi, category, validationResults) {
        const resultsSection = document.getElementById('resultsSection');
        const bmiValue = document.getElementById('bmiValue');
        const bmiCategory = document.getElementById('bmiCategory');
        const validationSummary = document.getElementById('validationSummary');
        
        // Display BMI value rounded to 2 decimal places for display only
        bmiValue.textContent = bmi.toFixed(2);
        bmiCategory.textContent = category.category;
        bmiCategory.className = `bmi-category ${category.class}`;
        
        // Display validation summary
        let summaryHTML = '<h4>Input Validation:</h4>';
        
        Object.entries(validationResults).forEach(([field, result]) => {
            const statusClass = result.valid ? 'valid' : 'invalid';
            const statusText = result.valid ? '✓ Valid' : '✗ Invalid';
            const boundaryInfo = this.getBoundaryInfo(field, result.value);
            
            summaryHTML += `
                <div class="validation-item">
                    <span>${field.charAt(0).toUpperCase() + field.slice(1)} (${result.value} ${this.rules[field].unit}):</span>
                    <span class="validation-status ${statusClass}">${statusText} ${boundaryInfo}</span>
                </div>
            `;
        });
        
        validationSummary.innerHTML = summaryHTML;
        resultsSection.style.display = 'block';
    }

    // Get boundary information for display
    getBoundaryInfo(field, value) {
        const rule = this.rules[field];
        
        if (value === rule.min) return '(Lower Boundary)';
        if (value === rule.max) return '(Upper Boundary)';
        if (value === rule.min + 1) return '(Just Above Lower Boundary)';
        if (value === rule.max - 1) return '(Just Below Upper Boundary)';
        
        return '';
    }

    // Test method for boundary value and equivalence class testing
    // Includes BMI boundary testing for categories (18.5, 25, 30)
    runTestCases() {
        const testCases = [
            // Boundary Value Tests for Input Fields
            { age: 17.9, height: 100, weight: 30, description: 'Age just below boundary' },
            { age: 18, height: 100, weight: 30, description: 'Age at lower boundary' },
            { age: 18.1, height: 100.1, weight: 30.1, description: 'Just above lower boundary' },
            { age: 64.9, height: 249.9, weight: 299.9, description: 'Just below upper boundary' },
            { age: 65, height: 250, weight: 300, description: 'At upper boundary' },
            { age: 65.1, height: 250.1, weight: 300.1, description: 'Just above upper boundary' },
            
            // BMI Category Boundary Tests
            { age: 25, height: 175, weight: 56.2, description: 'BMI 18.4 - Underweight boundary' },
            { age: 25, height: 175, weight: 56.3, description: 'BMI 18.5 - Normal boundary' },
            { age: 25, height: 175, weight: 56.4, description: 'BMI 18.6 - Just above normal boundary' },
            { age: 25, height: 175, weight: 76.5, description: 'BMI 24.9 - Just below overweight' },
            { age: 25, height: 175, weight: 76.6, description: 'BMI 25.0 - Overweight boundary' },
            { age: 25, height: 175, weight: 76.7, description: 'BMI 25.1 - Just above overweight' },
            { age: 25, height: 175, weight: 91.7, description: 'BMI 29.9 - Just below obese' },
            { age: 25, height: 175, weight: 91.8, description: 'BMI 30.0 - Obese boundary' },
            { age: 25, height: 175, weight: 91.9, description: 'BMI 30.1 - Just above obese' },
            
            // Equivalence Class Tests - Valid (Sunny Day)
            { age: 25.5, height: 175.5, weight: 70.2, description: 'Valid decimal inputs' },
            { age: 35.7, height: 180.3, weight: 80.1, description: 'Valid middle range decimals' },
            { age: 45.2, height: 165.8, weight: 60.5, description: 'Valid lower range decimals' },
            
            // Equivalence Class Tests - Invalid (Rainy Day)
            { age: 17.5, height: 99.9, weight: 29.9, description: 'All just below minimum' },
            { age: 65.5, height: 250.1, weight: 300.1, description: 'All just above maximum' },
            { age: 0, height: 0, weight: 0, description: 'Zero values' },
            { age: -5, height: -10, weight: -20, description: 'Negative values' }
        ];
        
        console.log('=== BMI Calculator Test Cases ===');
        console.log('Boundary Value Testing + Equivalence Class Testing + BMI Category Testing');
        
        testCases.forEach((testCase, index) => {
            console.log(`\nTest ${index + 1}: ${testCase.description}`);
            console.log(`Input: Age=${testCase.age}, Height=${testCase.height}, Weight=${testCase.weight}`);
            
            // Simulate validation for each field
            const ageValid = testCase.age >= 18 && testCase.age <= 65;
            const heightValid = testCase.height >= 100 && testCase.height <= 250;
            const weightValid = testCase.weight >= 30 && testCase.weight <= 300;
            const inputValid = testCase.age > 0 && testCase.height > 0 && testCase.weight > 0;
            
            console.log(`Input Validation: Age=${ageValid ? '✓' : '✗'}, Height=${heightValid ? '✓' : '✗'}, Weight=${weightValid ? '✓' : '✗'}, Positive=${inputValid ? '✓' : '✗'}`);
            
            if (ageValid && heightValid && weightValid && inputValid) {
                const bmi = this.calculateBMI(testCase.weight, testCase.height);
                const category = this.getBMICategory(bmi);
                console.log(`BMI: ${bmi.toFixed(2)} (${category.category})`);
                
                // Show boundary testing for BMI categories
                if (Math.abs(bmi - 18.5) < 0.1) console.log('  → BMI Category Boundary: Underweight/Normal');
                if (Math.abs(bmi - 25) < 0.1) console.log('  → BMI Category Boundary: Normal/Overweight');
                if (Math.abs(bmi - 30) < 0.1) console.log('  → BMI Category Boundary: Overweight/Obese');
            } else {
                console.log('BMI: Not calculated due to validation errors');
            }
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const bmiCalculator = new BMIValidator();
    
    // Make test cases available in console for debugging
    window.bmiCalculator = bmiCalculator;
    
    // Uncomment the line below to run test cases automatically
    // bmiCalculator.runTestCases();
    
    console.log('BMI Calculator initialized. Run bmiCalculator.runTestCases() in console to see test cases.');
});
