# Decision Table Login System - Software Testing Assignment

## Introduction

### Decision Tables

Decision tables are a systematic approach to representing complex business logic in a structured, tabular format. They provide a clear visual representation of conditions, actions, and rules, making them particularly valuable for testing complex systems with multiple input combinations. Decision tables help ensure comprehensive test coverage by systematically covering all possible combinations of input conditions and their corresponding outputs.

### Pairwise Testing

Pairwise testing, also known as all-pairs testing, is a combinatorial testing technique that reduces the number of test cases while maintaining high defect detection capability. Instead of testing all possible combinations (which can be exponentially large), pairwise testing ensures that every possible pair of input parameters is tested at least once. This approach is based on the observation that most defects are triggered by interactions between two parameters rather than three or more.

### Limitations

While both techniques are powerful, they have limitations:
- **Decision Tables**: Can become unwieldy with many conditions (combinatorial explosion)
- **Pairwise Testing**: May miss defects that require three or more parameters to interact
- Both techniques assume independence between parameters, which may not always be true

## Application Explanation


The Decision Table Login System is a web application that demonstrates the practical implementation of decision table logic and pairwise testing concepts. The system simulates a login process with four main conditions:

1. **Username Validity**: Whether the username matches the expected value
2. **Password Validity**: Whether the password matches the expected value  
3. **Account Status**: Whether the account is locked or active
4. **2FA Status**: Whether two-factor authentication is enabled

The application provides:
- An interactive login interface
- Real-time decision table visualization
- Automated test execution (Sunny, Rainy, and All tests)
- Comprehensive error handling and validation

## Complete Decision Table

The decision table contains all 16 possible combinations of the four binary conditions:

| Rule # | Username Valid | Password Valid | Account Locked | 2FA Enabled | 2FA Valid | Result | Message |
|--------|----------------|----------------|----------------|-------------|-----------|---------|---------|
| 1 | ✓ | ✓ | ✗ | ✗ | - | ✓ Success | Login successful! |
| 2 | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ Success | Login successful with 2FA! |
| 3 | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ Fail | Invalid 2FA code. |
| 4 | ✓ | ✓ | ✓ | ✗ | - | ✗ Fail | Account is locked. Please contact administrator. |
| 5 | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ Fail | Account is locked. Please contact administrator. |
| 6 | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ Fail | Account is locked. Please contact administrator. |
| 7 | ✓ | ✗ | ✗ | ✗ | - | ✗ Fail | Invalid password. |
| 8 | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ Fail | Invalid password. |
| 9 | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ Fail | Invalid password. |
| 10 | ✓ | ✗ | ✓ | ✗ | - | ✗ Fail | Account is locked. Please contact administrator. |
| 11 | ✓ | ✗ | ✓ | ✓ | ✓ | ✗ Fail | Account is locked. Please contact administrator. |
| 12 | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ Fail | Account is locked. Please contact administrator. |
| 13 | ✗ | ✓ | ✗ | ✗ | - | ✗ Fail | Invalid username. |
| 14 | ✗ | ✓ | ✗ | ✓ | ✓ | ✗ Fail | Invalid username. |
| 15 | ✗ | ✓ | ✗ | ✓ | ✗ | ✗ Fail | Invalid username. |
| 16 | ✗ | ✓ | ✓ | ✗ | - | ✗ Fail | Account is locked. Please contact administrator. |

*Note: Rules 17-32 (Invalid Username + Invalid Password combinations) follow similar patterns but are omitted for brevity as they all result in "Invalid username and password."*

## Pairwise Test Cases

Using pairwise testing, we can reduce the 32+ possible combinations to just 8 test cases while maintaining coverage of all parameter pairs:

| Test Case | Username Valid | Password Valid | Account Locked | 2FA Enabled | Expected Result |
|-----------|----------------|----------------|----------------|-------------|-----------------|
| 1 | ✓ | ✓ | ✗ | ✗ | Success |
| 2 | ✓ | ✗ | ✗ | ✓ | Invalid Password |
| 3 | ✗ | ✓ | ✗ | ✗ | Invalid Username |
| 4 | ✓ | ✓ | ✓ | ✗ | Account Locked |
| 5 | ✗ | ✗ | ✗ | ✓ | Invalid Username & Password |
| 6 | ✓ | ✗ | ✓ | ✗ | Account Locked |
| 7 | ✗ | ✓ | ✓ | ✓ | Account Locked |
| 8 | ✓ | ✓ | ✗ | ✓ | Success with 2FA |

### Pairwise Coverage Analysis



This reduced set ensures every pair of parameters is tested:

- **Username/Password pairs**: ✓/✗, ✓/✓, ✗/✓, ✗/✗
- **Username/Account pairs**: ✓/✗, ✓/✓, ✗/✗, ✗/✓
- **Username/2FA pairs**: ✓/✗, ✓/✓, ✗/✗, ✗/✓
- **Password/Account pairs**: ✓/✗, ✓/✓, ✗/✗, ✗/✓
- **Password/2FA pairs**: ✓/✗, ✓/✓, ✗/✗, ✗/✓
- **Account/2FA pairs**: ✗/✗, ✗/✓, ✓/✗, ✓/✓

## Test Case Mapping

### Sunny Day Tests (Happy Path)

| Test | Description | Input | Expected |
|------|-------------|-------|----------|
| ST-1 | Valid login without 2FA | Username: admin, Password: password123, Account: Active, 2FA: Disabled | Success |
| ST-2 | Valid login with 2FA | Username: admin, Password: password123, Account: Active, 2FA: Enabled, Code: 123456 | Success |

### Rainy Day Tests (Error Conditions)

| Test | Description | Input | Expected |
|------|-------------|-------|----------|
| RT-1 | Invalid username | Username: wronguser, Password: password123, Account: Active, 2FA: Disabled | Invalid username |
| RT-2 | Invalid password | Username: admin, Password: wrongpass, Account: Active, 2FA: Disabled | Invalid password |
| RT-3 | Account locked | Username: admin, Password: password123, Account: Locked, 2FA: Disabled | Account locked |
| RT-4 | Invalid 2FA code | Username: admin, Password: password123, Account: Active, 2FA: Enabled, Code: wrongcode | Invalid 2FA |

### Edge Cases

![alt text](<../Screenshot 2026-04-11 at 2.12.31 PM.png>)

| Test | Description | Input | Expected |
|------|-------------|-------|----------|
| ET-1 | Empty credentials | Username: "", Password: "", Account: Active, 2FA: Disabled | Invalid username & password |
| ET-2 | 2FA enabled but no code | Username: admin, Password: password123, Account: Active, 2FA: Enabled, Code: "" | Invalid 2FA |

## Code Snippets

### Decision Table Logic Implementation

```javascript
validateLogin(username, password, accountLocked, twoFactorEnabled, twoFactorCode) {
    const isUsernameValid = username === this.validCredentials.username;
    const isPasswordValid = password === this.validCredentials.password;
    const isAccountLocked = accountLocked === 'true';
    const isTwoFactorEnabled = twoFactorEnabled === 'true';
    const isTwoFactorValid = twoFactorCode === '123456';

    // Decision Table Rules
    if (isAccountLocked) {
        return {
            success: false,
            message: 'Account is locked. Please contact administrator.',
            rule: 'Account Locked'
        };
    }

    if (!isUsernameValid && !isPasswordValid) {
        return {
            success: false,
            message: 'Invalid username and password.',
            rule: 'Invalid Username & Password'
        };
    }

    if (!isUsernameValid) {
        return {
            success: false,
            message: 'Invalid username.',
            rule: 'Invalid Username'
        };
    }

    if (!isPasswordValid) {
        return {
            success: false,
            message: 'Invalid password.',
            rule: 'Invalid Password'
        };
    }

    if (isTwoFactorEnabled && !isTwoFactorValid) {
        return {
            success: false,
            message: 'Invalid 2FA code.',
            rule: 'Invalid 2FA'
        };
    }

    if (isTwoFactorEnabled && isTwoFactorValid) {
        return {
            success: true,
            message: 'Login successful with 2FA!',
            rule: 'Success with 2FA'
        };
    }

    return {
        success: true,
        message: 'Login successful!',
        rule: 'Success without 2FA'
    };
}
```

### Test Execution Framework

```javascript
runTestSuite(testCases, suiteName) {
    const resultsDiv = document.getElementById('testResults');
    resultsDiv.innerHTML = `<h3>${suiteName}</h3>`;

    let passCount = 0;
    let failCount = 0;

    testCases.forEach((testCase, index) => {
        const result = this.validateLogin(
            testCase.username,
            testCase.password,
            testCase.accountLocked,
            testCase.twoFactorEnabled,
            testCase.twoFactorCode
        );

        const passed = result.success === testCase.expected;
        if (passed) {
            passCount++;
        } else {
            failCount++;
        }

        // Display test results with detailed information
        const testResultDiv = document.createElement('div');
        testResultDiv.className = `test-case ${passed ? 'pass' : 'fail'}`;
        testResultDiv.innerHTML = `
            <strong>Test ${index + 1}: ${testCase.name}</strong><br>
            Input: Username="${testCase.username}", Password="${testCase.password}", 
            Locked=${testCase.accountLocked}, 2FA=${testCase.twoFactorEnabled}<br>
            Expected: ${testCase.expected ? 'Success' : 'Failure'}, 
            Actual: ${result.success ? 'Success' : 'Failure'}<br>
            Message: ${result.message}
        `;
        resultsDiv.appendChild(testResultDiv);
    });
}
```

## Screenshot Placeholders

### Main Application Interface

![alt text](<../Screenshot 2026-04-11 at 2.06.44 PM.png>)

### Decision Table Display

![alt text](<../Screenshot 2026-04-11 at 2.07.45 PM.png>)

![alt text](<../Screenshot 2026-04-11 at 2.14.26 PM.png>)

### Test Results - Sunny Day Tests

![alt text](<../Screenshot 2026-04-11 at 2.10.09 PM.png>)

### Test Results - Rainy Day Tests

![alt text](<../Screenshot 2026-04-11 at 2.11.40 PM.png>)


## Conclusion

This Decision Table Login System successfully demonstrates the practical application of decision tables and pairwise testing in software quality assurance. The implementation provides several key insights:

### Key Learnings

1. **Decision Table Benefits**: The tabular format makes complex logic easy to understand and maintain. Each rule is clearly defined with specific conditions and outcomes.

2. **Pairwise Testing Efficiency**: By reducing 32+ possible combinations to just 8 test cases, we achieve 75% reduction in test cases while maintaining comprehensive pair coverage.

3. **Test Organization**: The separation of Sunny Day (happy path) and Rainy Day (error conditions) tests provides clear test strategy and easier maintenance.

4. **Real-time Validation**: The interactive nature of the application allows immediate verification of decision table rules and test cases.

### Practical Applications

This approach is particularly valuable for:
- Authentication systems with multiple security layers
- Business rule validation in financial applications
- Configuration management systems
- Any system with complex conditional logic

### Future Enhancements

Potential improvements could include:
- Integration with automated testing frameworks
- Support for more complex decision tables (multi-valued conditions)
- Export functionality for test cases
- Performance metrics and test coverage analysis

The system serves as an excellent educational tool for understanding both decision tables and pairwise testing concepts while providing a practical, working implementation that can be extended for real-world applications.
