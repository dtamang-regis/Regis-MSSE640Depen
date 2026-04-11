// Decision Table Login System
class LoginSystem {
    constructor() {
        this.validCredentials = {
            username: 'admin',
            password: 'password123'
        };
        
        this.initializeEventListeners();
        this.displayDecisionTable();
    }

    initializeEventListeners() {
        // Form submission
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Test buttons
        document.getElementById('runAllTests').addEventListener('click', () => {
            this.runAllTests();
        });

        document.getElementById('runSunnyTests').addEventListener('click', () => {
            this.runSunnyTests();
        });

        document.getElementById('runRainyTests').addEventListener('click', () => {
            this.runRainyTests();
        });

        // Show/hide 2FA code field based on 2FA status
        document.getElementById('twoFactorEnabled').addEventListener('change', (e) => {
            const twoFactorCodeGroup = document.getElementById('twoFactorCode').closest('.form-group');
            twoFactorCodeGroup.style.display = e.target.value === 'true' ? 'block' : 'none';
        });
    }

    // Decision Table Logic
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

    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const accountLocked = document.getElementById('accountLocked').value;
        const twoFactorEnabled = document.getElementById('twoFactorEnabled').value;
        const twoFactorCode = document.getElementById('twoFactorCode').value;

        const result = this.validateLogin(username, password, accountLocked, twoFactorEnabled, twoFactorCode);
        this.displayMessage(result.success, result.message);
    }

    displayMessage(success, message) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = message;
        messageDiv.className = `message ${success ? 'success' : 'error'}`;
        messageDiv.style.display = 'block';
    }

    // Decision Table Display
    displayDecisionTable() {
        const tableContainer = document.getElementById('decisionTable');
        const table = this.createDecisionTable();
        tableContainer.innerHTML = table;
    }

    createDecisionTable() {
        const combinations = this.generateAllCombinations();
        
        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Rule #</th>
                        <th>Username Valid</th>
                        <th>Password Valid</th>
                        <th>Account Locked</th>
                        <th>2FA Enabled</th>
                        <th>2FA Valid</th>
                        <th>Result</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
        `;

        combinations.forEach((combo, index) => {
            const result = this.validateLogin(
                combo.username,
                combo.password,
                combo.accountLocked,
                combo.twoFactorEnabled,
                combo.twoFactorCode
            );

            tableHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${combo.validUsername ? '✓' : '✗'}</td>
                    <td>${combo.validPassword ? '✓' : '✗'}</td>
                    <td>${combo.accountLocked === 'true' ? '✓' : '✗'}</td>
                    <td>${combo.twoFactorEnabled === 'true' ? '✓' : '✗'}</td>
                    <td>${combo.twoFactorCode === '123456' ? '✓' : '✗'}</td>
                    <td>${result.success ? '✓ Success' : '✗ Fail'}</td>
                    <td>${result.message}</td>
                </tr>
            `;
        });

        tableHTML += '</tbody></table>';
        return tableHTML;
    }

    generateAllCombinations() {
        const combinations = [];
        const usernames = ['admin', 'user'];
        const passwords = ['password123', 'wrongpass'];
        const accountLocks = ['false', 'true'];
        const twoFactorEnables = ['false', 'true'];
        const twoFactorCodes = ['', '123456', 'wrongcode'];

        for (const username of usernames) {
            for (const password of passwords) {
                for (const accountLocked of accountLocks) {
                    for (const twoFactorEnabled of twoFactorEnables) {
                        for (const twoFactorCode of twoFactorCodes) {
                            // Skip invalid combinations (2FA code provided when 2FA disabled)
                            if (twoFactorEnabled === 'false' && twoFactorCode !== '') continue;
                            // Skip combinations where 2FA is enabled but no code provided
                            if (twoFactorEnabled === 'true' && twoFactorCode === '') continue;
                            
                            combinations.push({
                                username,
                                password,
                                accountLocked,
                                twoFactorEnabled,
                                twoFactorCode,
                                validUsername: username === 'admin',
                                validPassword: password === 'password123'
                            });
                        }
                    }
                }
            }
        }

        return combinations;
    }

    // Test Cases
    runAllTests() {
        const testCases = this.generateAllCombinations();
        this.runTestSuite(testCases, 'All Test Cases');
    }

    runSunnyTests() {
        const sunnyTests = [
            {
                name: 'Valid login without 2FA',
                username: 'admin',
                password: 'password123',
                accountLocked: 'false',
                twoFactorEnabled: 'false',
                twoFactorCode: '',
                expected: true
            },
            {
                name: 'Valid login with 2FA',
                username: 'admin',
                password: 'password123',
                accountLocked: 'false',
                twoFactorEnabled: 'true',
                twoFactorCode: '123456',
                expected: true
            }
        ];
        this.runTestSuite(sunnyTests, 'Sunny Day Tests');
    }

    runRainyTests() {
        const rainyTests = [
            {
                name: 'Invalid username',
                username: 'wronguser',
                password: 'password123',
                accountLocked: 'false',
                twoFactorEnabled: 'false',
                twoFactorCode: '',
                expected: false
            },
            {
                name: 'Invalid password',
                username: 'admin',
                password: 'wrongpass',
                accountLocked: 'false',
                twoFactorEnabled: 'false',
                twoFactorCode: '',
                expected: false
            },
            {
                name: 'Account locked',
                username: 'admin',
                password: 'password123',
                accountLocked: 'true',
                twoFactorEnabled: 'false',
                twoFactorCode: '',
                expected: false
            },
            {
                name: 'Invalid 2FA code',
                username: 'admin',
                password: 'password123',
                accountLocked: 'false',
                twoFactorEnabled: 'true',
                twoFactorCode: 'wrongcode',
                expected: false
            }
        ];
        this.runTestSuite(rainyTests, 'Rainy Day Tests');
    }

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

        // Summary
        const summaryDiv = document.createElement('div');
        summaryDiv.innerHTML = `
            <h4>Test Summary: ${passCount} passed, ${failCount} failed</h4>
        `;
        resultsDiv.appendChild(summaryDiv);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new LoginSystem();
});
