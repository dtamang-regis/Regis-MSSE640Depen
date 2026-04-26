// State Transition Testing Login System
// States: Logged Out, Logged In, Failed, Locked, 2FA Pending
// Testing: State Transition, Control Flow, Data Flow

class StateTransitionLoginSystem {
    constructor() {
        this.validCredentials = {
            username: 'admin',
            password: 'password123'
        };
        
        // State Management
        this.states = {
            LOGGED_OUT: 'Logged Out',
            LOGGED_IN: 'Logged In',
            FAILED: 'Failed',
            LOCKED: 'Locked',
            TWO_FA_PENDING: '2FA Pending'
        };
        
        this.currentState = this.states.LOGGED_OUT;
        this.failedAttempts = 0;
        this.maxFailedAttempts = 3;
        
        this.initializeEventListeners();
        this.displayStateTransitionTable();
        this.displayControlFlowPaths();
        this.displayDataFlowAnalysis();
        this.updateStateDisplay();
        this.initializeTabs();
    }

    initializeEventListeners() {
        // Form submission
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Test buttons
        document.getElementById('runStateTests').addEventListener('click', () => {
            this.runStateTests();
        });

        document.getElementById('runControlFlowTests').addEventListener('click', () => {
            this.runControlFlowTests();
        });

        document.getElementById('runDataFlowTests').addEventListener('click', () => {
            this.runDataFlowTests();
        });

        document.getElementById('runSunnyTests').addEventListener('click', () => {
            this.runSunnyTests();
        });

        document.getElementById('runRainyTests').addEventListener('click', () => {
            this.runRainyTests();
        });

        // Show/hide 2FA code field based on 2FA status
        document.getElementById('twoFactorEnabled').addEventListener('change', (e) => {
            const twoFactorCodeGroup = document.getElementById('twoFactorCodeGroup');
            twoFactorCodeGroup.style.display = e.target.value === 'true' ? 'block' : 'none';
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetState();
        });

        // Real-time validation
        const inputs = document.querySelectorAll('#loginForm input, #loginForm select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateField(input);
            });
            
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    initializeTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    validateField(field) {
        const errorElement = document.getElementById(field.id + 'Error');
        let isValid = true;
        let errorMessage = '';

        // Clear previous error
        if (errorElement) {
            errorElement.textContent = '';
        }

        // Field-specific validation
        switch(field.id) {
            case 'username':
                if (!field.value.trim()) {
                    isValid = false;
                    errorMessage = 'Username is required';
                }
                break;
            case 'password':
                if (!field.value.trim()) {
                    isValid = false;
                    errorMessage = 'Password is required';
                }
                break;
            case 'twoFactorCode':
                if (document.getElementById('twoFactorEnabled').value === 'true' && !field.value.trim()) {
                    isValid = false;
                    errorMessage = '2FA code is required when 2FA is enabled';
                } else if (field.value && field.value.length !== 6) {
                    isValid = false;
                    errorMessage = '2FA code must be 6 digits';
                }
                break;
        }

        // Display error if validation fails
        if (!isValid && errorElement) {
            errorElement.textContent = errorMessage;
            field.style.borderColor = '#e53e3e';
        } else if (errorElement) {
            field.style.borderColor = '#e2e8f0';
        }

        return isValid;
    }

    // Login validation logic
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

        // Validate all fields first
        const isFormValid = this.validateForm();
        if (!isFormValid) {
            this.displayMessage(false, 'Please correct the errors in the form.');
            return;
        }

        const result = this.validateLogin(username, password, accountLocked, twoFactorEnabled, twoFactorCode);
        this.processStateTransition(result, accountLocked, twoFactorEnabled, twoFactorCode);
        this.displayMessage(result.success, result.message);
        this.updateStateDisplay();
        this.displayResults(result);
    }

    validateForm() {
        const inputs = document.querySelectorAll('#loginForm input[required], #loginForm select');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    processStateTransition(result, accountLocked, twoFactorEnabled, twoFactorCode) {
        const previousState = this.currentState;
        
        // State transition logic
        if (accountLocked === 'true') {
            this.currentState = this.states.LOCKED;
        } else if (result.success) {
            if (twoFactorEnabled === 'true' && twoFactorCode !== '') {
                this.currentState = this.states.LOGGED_IN;
            } else if (twoFactorEnabled === 'true' && twoFactorCode === '') {
                this.currentState = this.states.TWO_FA_PENDING;
            } else {
                this.currentState = this.states.LOGGED_IN;
            }
            this.failedAttempts = 0; // Reset failed attempts on successful login
        } else {
            this.failedAttempts++;
            if (this.failedAttempts >= this.maxFailedAttempts) {
                this.currentState = this.states.LOCKED;
            } else {
                this.currentState = this.states.FAILED;
            }
        }
        
        console.log(`State transition: ${previousState} -> ${this.currentState}`);
    }

    updateStateDisplay() {
        const stateDisplay = document.getElementById('stateDisplay');
        const stateColors = {
            [this.states.LOGGED_OUT]: '#e2e8f0',
            [this.states.LOGGED_IN]: '#c6f6d5',
            [this.states.FAILED]: '#fed7d7',
            [this.states.LOCKED]: '#fbb6ce',
            [this.states.TWO_FA_PENDING]: '#feebc8'
        };
        
        stateDisplay.innerHTML = `
            <div class="state-info">
                <strong>Current State:</strong> 
                <span class="state-badge" style="background-color: ${stateColors[this.currentState]}">
                    ${this.currentState}
                </span>
                <br>
                <small>Failed Attempts: ${this.failedAttempts}/${this.maxFailedAttempts}</small>
            </div>
        `;
    }

    displayResults(result) {
        const resultsSection = document.getElementById('resultsSection');
        const loginStatus = document.getElementById('loginStatus');
        const stateInfo = document.getElementById('stateInfo');
        const validationSummary = document.getElementById('validationSummary');

        resultsSection.style.display = 'block';
        
        loginStatus.textContent = result.success ? '✓ Success' : '✗ Failed';
        loginStatus.style.color = result.success ? '#48bb78' : '#f56565';
        
        stateInfo.textContent = `State: ${this.currentState}`;
        
        validationSummary.innerHTML = `
            <strong>Validation Rule:</strong> ${result.rule}<br>
            <strong>Message:</strong> ${result.message}<br>
            <strong>Failed Attempts:</strong> ${this.failedAttempts}
        `;
    }

    resetState() {
        this.currentState = this.states.LOGGED_OUT;
        this.failedAttempts = 0;
        this.updateStateDisplay();
        document.getElementById('loginForm').reset();
        document.getElementById('message').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'none';
        document.getElementById('twoFactorCodeGroup').style.display = 'none';
        
        // Clear all error messages
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        // Reset input borders
        const inputs = document.querySelectorAll('#loginForm input, #loginForm select');
        inputs.forEach(input => {
            input.style.borderColor = '#e2e8f0';
        });
    }

    displayMessage(success, message) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = message;
        messageDiv.className = `message ${success ? 'success' : 'error'}`;
        messageDiv.style.display = 'block';
    }

    // State Transition Diagram
    displayStateTransitionTable() {
        const tableContainer = document.getElementById('stateTransitionTable');
        const transitions = [
            { from: 'Logged Out', to: 'Logged In', trigger: 'Valid credentials', condition: 'No 2FA or valid 2FA' },
            { from: 'Logged Out', to: '2FA Pending', trigger: 'Valid credentials', condition: '2FA enabled, no code' },
            { from: 'Logged Out', to: 'Failed', trigger: 'Invalid credentials', condition: 'Failed attempts < 3' },
            { from: 'Logged Out', to: 'Locked', trigger: 'Account locked', condition: 'Account locked or 3 failed attempts' },
            { from: '2FA Pending', to: 'Logged In', trigger: 'Valid 2FA code', condition: 'Correct 6-digit code' },
            { from: '2FA Pending', to: 'Failed', trigger: 'Invalid 2FA code', condition: 'Failed attempts < 3' },
            { from: 'Failed', to: 'Logged Out', trigger: 'Reset', condition: 'Manual reset or timeout' },
            { from: 'Failed', to: 'Locked', trigger: 'Max failures', condition: '3 failed attempts' },
            { from: 'Logged In', to: 'Logged Out', trigger: 'Logout', condition: 'User action or timeout' },
            { from: 'Locked', to: 'Logged Out', trigger: 'Admin unlock', condition: 'Administrator intervention' }
        ];

        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>From State</th>
                        <th>To State</th>
                        <th>Trigger</th>
                        <th>Condition</th>
                    </tr>
                </thead>
                <tbody>
        `;

        transitions.forEach(transition => {
            tableHTML += `
                <tr>
                    <td>${transition.from}</td>
                    <td>${transition.to}</td>
                    <td>${transition.trigger}</td>
                    <td>${transition.condition}</td>
                </tr>
            `;
        });

        tableHTML += '</tbody></table>';
        tableContainer.innerHTML = tableHTML;
    }

    // Control Flow Analysis
    displayControlFlowPaths() {
        const pathsContainer = document.getElementById('controlFlowPaths');
        const paths = [
            {
                path: 'Path 1: Account Locked',
                flow: 'validateLogin() \n  ↓\nisAccountLocked check (true) \n  ↓\nReturn locked message'
            },
            {
                path: 'Path 2: Invalid Username & Password',
                flow: 'validateLogin() \n  ↓\nisAccountLocked check (false) \n  ↓\n!isUsernameValid && !isPasswordValid (true) \n  ↓\nReturn invalid credentials'
            },
            {
                path: 'Path 3: Invalid Username Only',
                flow: 'validateLogin() \n  ↓\nisAccountLocked check (false) \n  ↓\n!isUsernameValid && !isPasswordValid (false) \n  ↓\n!isUsernameValid (true) \n  ↓\nReturn invalid username'
            },
            {
                path: 'Path 4: Invalid Password Only',
                flow: 'validateLogin() \n  ↓\nisAccountLocked check (false) \n  ↓\n!isUsernameValid && !isPasswordValid (false) \n  ↓\n!isUsernameValid (false) \n  ↓\n!isPasswordValid (true) \n  ↓\nReturn invalid password'
            },
            {
                path: 'Path 5: 2FA Enabled - Invalid Code',
                flow: 'validateLogin() \n  ↓\nPrevious validations pass \n  ↓\nisTwoFactorEnabled (true) && !isTwoFactorValid (true) \n  ↓\nReturn invalid 2FA'
            },
            {
                path: 'Path 6: 2FA Enabled - Valid Code',
                flow: 'validateLogin() \n  ↓\nPrevious validations pass \n  ↓\nisTwoFactorEnabled (true) && isTwoFactorValid (true) \n  ↓\nReturn success with 2FA'
            },
            {
                path: 'Path 7: Success Without 2FA',
                flow: 'validateLogin() \n  ↓\nAll validations pass \n  ↓\nisTwoFactorEnabled (false) \n  ↓\nReturn success without 2FA'
            }
        ];

        let pathsHTML = '<div class="flow-diagram">';
        paths.forEach(path => {
            pathsHTML += `
                <div style="margin-bottom: 20px; padding: 15px; background: white; border-radius: 6px; border-left: 4px solid #667eea;">
                    <strong style="color: #4a5568;">${path.path}</strong>
                    <div style="color: #667eea; margin-top: 8px; font-size: 14px;">${path.flow}</div>
                </div>
            `;
        });
        pathsHTML += '</div>';
        
        pathsContainer.innerHTML = pathsHTML;
    }

    // Data Flow Analysis
    displayDataFlowAnalysis() {
        const analysisContainer = document.getElementById('dataFlowAnalysis');
        const variables = [
            {
                variable: 'username',
                definition: 'Input field value extraction',
                uses: ['Validation against validCredentials.username', 'State transition logic'],
                validation: 'Equality check with stored valid username'
            },
            {
                variable: 'password',
                definition: 'Input field value extraction',
                uses: ['Validation against validCredentials.password', 'State transition logic'],
                validation: 'Equality check with stored valid password'
            },
            {
                variable: 'accountLocked',
                definition: 'Select field value extraction',
                uses: ['Account lock validation', 'State transition logic'],
                validation: 'String comparison with "true"'
            },
            {
                variable: 'twoFactorEnabled',
                definition: 'Select field value extraction',
                uses: ['2FA requirement check', 'State transition logic', 'UI visibility control'],
                validation: 'String comparison with "true"'
            },
            {
                variable: 'twoFactorCode',
                definition: 'Input field value extraction',
                uses: ['2FA validation', 'State transition logic'],
                validation: 'Equality check with "123456"'
            },
            {
                variable: 'failedAttempts',
                definition: 'Initialize to 0 in constructor',
                uses: ['Lockout determination', 'State transition logic', 'Display counter'],
                validation: 'Comparison with maxFailedAttempts (3)'
            },
            {
                variable: 'currentState',
                definition: 'Initialize to LOGGED_OUT in constructor',
                uses: ['State display', 'Transition logic', 'UI feedback'],
                validation: 'Enum validation against defined states'
            }
        ];

        let analysisHTML = '';
        variables.forEach(variable => {
            analysisHTML += `
                <div class="data-flow-item">
                    <h4>${variable.variable}</h4>
                    <p><strong>Definition:</strong> ${variable.definition}</p>
                    <p><strong>Uses:</strong> ${variable.uses.join(', ')}</p>
                    <p><strong>Validation:</strong> ${variable.validation}</p>
                </div>
            `;
        });
        
        analysisContainer.innerHTML = analysisHTML;
    }

    // Test Cases
    runStateTests() {
        const stateTests = [
            {
                name: 'Logged Out -> Logged In (valid credentials)',
                username: 'admin',
                password: 'password123',
                accountLocked: 'false',
                twoFactorEnabled: 'false',
                twoFactorCode: '',
                expectedState: this.states.LOGGED_IN,
                description: 'Valid login without 2FA'
            },
            {
                name: 'Logged Out -> 2FA Pending (valid credentials, 2FA enabled)',
                username: 'admin',
                password: 'password123',
                accountLocked: 'false',
                twoFactorEnabled: 'true',
                twoFactorCode: '',
                expectedState: this.states.TWO_FA_PENDING,
                description: 'Valid credentials but 2FA code required'
            },
            {
                name: 'Logged Out -> Failed (invalid credentials)',
                username: 'wronguser',
                password: 'wrongpass',
                accountLocked: 'false',
                twoFactorEnabled: 'false',
                twoFactorCode: '',
                expectedState: this.states.FAILED,
                description: 'Invalid username and password'
            },
            {
                name: 'Logged Out -> Locked (account locked)',
                username: 'admin',
                password: 'password123',
                accountLocked: 'true',
                twoFactorEnabled: 'false',
                twoFactorCode: '',
                expectedState: this.states.LOCKED,
                description: 'Account is locked'
            }
        ];

        this.runTestSuite(stateTests, 'State Transition Tests');
    }

    runControlFlowTests() {
        const controlFlowTests = [
            {
                name: 'Account Locked Path',
                username: 'admin',
                password: 'password123',
                accountLocked: 'true',
                twoFactorEnabled: 'false',
                twoFactorCode: '',
                expectedPath: 'Account Locked',
                description: 'Tests account lock check path'
            },
            {
                name: 'Invalid Username Path',
                username: 'wronguser',
                password: 'password123',
                accountLocked: 'false',
                twoFactorEnabled: 'false',
                twoFactorCode: '',
                expectedPath: 'Invalid Username',
                description: 'Tests username validation path'
            },
            {
                name: 'Invalid Password Path',
                username: 'admin',
                password: 'wrongpass',
                accountLocked: 'false',
                twoFactorEnabled: 'false',
                twoFactorCode: '',
                expectedPath: 'Invalid Password',
                description: 'Tests password validation path'
            },
            {
                name: '2FA Validation Path',
                username: 'admin',
                password: 'password123',
                accountLocked: 'false',
                twoFactorEnabled: 'true',
                twoFactorCode: 'wrongcode',
                expectedPath: 'Invalid 2FA',
                description: 'Tests 2FA validation path'
            }
        ];

        this.runControlFlowTestSuite(controlFlowTests, 'Control Flow Tests');
    }

    runDataFlowTests() {
        const dataFlowTests = [
            {
                name: 'Username Variable Flow',
                test: () => {
                    const username = 'admin';
                    const isValid = username === this.validCredentials.username;
                    return { variable: 'username', defined: true, used: true, validated: isValid };
                }
            },
            {
                name: 'Password Variable Flow',
                test: () => {
                    const password = 'password123';
                    const isValid = password === this.validCredentials.password;
                    return { variable: 'password', defined: true, used: true, validated: isValid };
                }
            },
            {
                name: 'AccountLocked Variable Flow',
                test: () => {
                    const accountLocked = 'false';
                    const isLocked = accountLocked === 'true';
                    return { variable: 'accountLocked', defined: true, used: true, validated: !isLocked };
                }
            },
            {
                name: 'FailedAttempts Counter Flow',
                test: () => {
                    const initialAttempts = this.failedAttempts;
                    this.failedAttempts++;
                    const incremented = this.failedAttempts === initialAttempts + 1;
                    this.failedAttempts = initialAttempts; // Reset
                    return { variable: 'failedAttempts', defined: true, used: true, validated: incremented };
                }
            }
        ];

        this.runDataFlowTestSuite(dataFlowTests, 'Data Flow Tests');
    }

    runSunnyTests() {
        const sunnyTests = [
            {
                name: 'Perfect login without 2FA',
                username: 'admin',
                password: 'password123',
                accountLocked: 'false',
                twoFactorEnabled: 'false',
                twoFactorCode: '',
                expected: true,
                description: 'All conditions perfect'
            },
            {
                name: 'Perfect login with 2FA',
                username: 'admin',
                password: 'password123',
                accountLocked: 'false',
                twoFactorEnabled: 'true',
                twoFactorCode: '123456',
                expected: true,
                description: 'All conditions perfect with 2FA'
            }
        ];

        this.runTestSuite(sunnyTests, 'Sunny Day Tests');
    }

    runRainyTests() {
        const rainyTests = [
            {
                name: 'Wrong username',
                username: 'wronguser',
                password: 'password123',
                accountLocked: 'false',
                twoFactorEnabled: 'false',
                twoFactorCode: '',
                expected: false,
                description: 'Invalid username'
            },
            {
                name: 'Wrong password',
                username: 'admin',
                password: 'wrongpass',
                accountLocked: 'false',
                twoFactorEnabled: 'false',
                twoFactorCode: '',
                expected: false,
                description: 'Invalid password'
            },
            {
                name: 'Account locked',
                username: 'admin',
                password: 'password123',
                accountLocked: 'true',
                twoFactorEnabled: 'false',
                twoFactorCode: '',
                expected: false,
                description: 'Account is locked'
            },
            {
                name: 'Wrong 2FA code',
                username: 'admin',
                password: 'password123',
                accountLocked: 'false',
                twoFactorEnabled: 'true',
                twoFactorCode: 'wrongcode',
                expected: false,
                description: 'Invalid 2FA code'
            },
            {
                name: 'Missing 2FA code',
                username: 'admin',
                password: 'password123',
                accountLocked: 'false',
                twoFactorEnabled: 'true',
                twoFactorCode: '',
                expected: false,
                description: '2FA enabled but no code provided'
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
                ${testCase.description ? `<em>${testCase.description}</em><br>` : ''}
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

    runControlFlowTestSuite(testCases, suiteName) {
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

            const passed = result.rule === testCase.expectedPath;
            if (passed) {
                passCount++;
            } else {
                failCount++;
            }

            const testResultDiv = document.createElement('div');
            testResultDiv.className = `test-case ${passed ? 'pass' : 'fail'}`;
            testResultDiv.innerHTML = `
                <strong>Test ${index + 1}: ${testCase.name}</strong><br>
                ${testCase.description ? `<em>${testCase.description}</em><br>` : ''}
                Input: Username="${testCase.username}", Password="${testCase.password}", 
                Locked=${testCase.accountLocked}, 2FA=${testCase.twoFactorEnabled}<br>
                Expected Path: ${testCase.expectedPath}, 
                Actual Path: ${result.rule}<br>
                Message: ${result.message}
            `;
            resultsDiv.appendChild(testResultDiv);
        });

        const summaryDiv = document.createElement('div');
        summaryDiv.innerHTML = `
            <h4>Test Summary: ${passCount} passed, ${failCount} failed</h4>
        `;
        resultsDiv.appendChild(summaryDiv);
    }

    runDataFlowTestSuite(testCases, suiteName) {
        const resultsDiv = document.getElementById('testResults');
        resultsDiv.innerHTML = `<h3>${suiteName}</h3>`;

        let passCount = 0;
        let failCount = 0;

        testCases.forEach((testCase, index) => {
            try {
                const result = testCase.test();
                const passed = result.defined && result.used && result.validated;
                
                if (passed) {
                    passCount++;
                } else {
                    failCount++;
                }

                const testResultDiv = document.createElement('div');
                testResultDiv.className = `test-case ${passed ? 'pass' : 'fail'}`;
                testResultDiv.innerHTML = `
                    <strong>Test ${index + 1}: ${testCase.name}</strong><br>
                    Variable: ${result.variable}<br>
                    Defined: ${result.defined ? '✓' : '✗'}, 
                    Used: ${result.used ? '✓' : '✗'}, 
                    Validated: ${result.validated ? '✓' : '✗'}<br>
                    Status: ${passed ? 'PASS' : 'FAIL'}
                `;
                resultsDiv.appendChild(testResultDiv);
            } catch (error) {
                failCount++;
                const testResultDiv = document.createElement('div');
                testResultDiv.className = `test-case fail`;
                testResultDiv.innerHTML = `
                    <strong>Test ${index + 1}: ${testCase.name}</strong><br>
                    Error: ${error.message}<br>
                    Status: FAIL
                `;
                resultsDiv.appendChild(testResultDiv);
            }
        });

        const summaryDiv = document.createElement('div');
        summaryDiv.innerHTML = `
            <h4>Test Summary: ${passCount} passed, ${failCount} failed</h4>
        `;
        resultsDiv.appendChild(summaryDiv);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new StateTransitionLoginSystem();
});
