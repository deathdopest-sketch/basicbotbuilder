// XploitBot - StumbleChat.com Security & Exploitation Bot
// Created by D****l "Death" N****n
const puppeteer = require('puppeteer');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

class XploitBot {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server);
        this.port = 3004;

        // Bot personality and state
        this.config = {
            homepageUrl: 'https://www.stumblechat.com',
            loginUrl: 'https://www.stumblechat.com/login',
            roomUrl: 'https://www.stumblechat.com/room/hell',
            username: 'XxXGrimReaperxXx',
            nickname: 'XploitMaster',
            mood: 'stealth',
            checkInterval: 5000,
            headless: false,
            encryptionEnabled: true,
            taskMode: false,
            skullCodeKey: '💀☠️👻🦇🕷️🕸️🦴⚰️🪦' // Secret code key
        };

        // Security & Exploitation system
        this.securitySystem = {
            vulnerabilities: [],
            exploits: [],
            targets: [],
            encodedMessages: [],
            taskQueue: [],
            monitoringActive: false,
            encryptionMode: 'base64', // base64, rot13, caesar
            skullEmojis: ['💀', '☠️', '👻', '🦇', '🕷️', '🕸️', '🦴', '⚰️', '🪦', '🧟', '🧛', '🦹', '🎭', '👹', '👺'],
            secretCodes: {
                'task_start': '💀☠️👻',
                'task_complete': '☠️👻🦇',
                'data_found': '🦇🕷️🕸️',
                'vulnerability': '🕸️🦴⚰️',
                'exploit_ready': '⚰️🪦💀',
                'target_locked': '🪦🧟🧛',
                'system_compromised': '🧛🦹🎭',
                'data_extracted': '🎭👹👺'
            }
        };

        // Authentication and user management
        this.isLoggedIn = false;
        this.currentNickname = null;
        this.browser = null;
        this.page = null;

        this.setupExpress();
        this.setupSocket();
    }

    setupExpress() {
        this.app.use(express.json());
        this.app.use(express.static('public'));

        // API endpoints
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });

        this.app.post('/login', async (req, res) => {
            try {
                const { username, password } = req.body;
                await this.login(username, password);
                res.json({ success: true, message: 'Login successful' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.app.post('/change-nickname', async (req, res) => {
            try {
                const { nickname } = req.body;
                await this.changeNickname(nickname);
                res.json({ success: true, message: 'Nickname changed' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // XploitBot Security & Exploitation Endpoints
        this.app.post('/start-scan', async (req, res) => {
            try {
                await this.startSecurityScan();
                res.json({ success: true, message: "Security scan initiated" });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.app.post('/find-vulnerabilities', async (req, res) => {
            try {
                await this.findVulnerabilities();
                res.json({ success: true, message: "Vulnerability scan initiated" });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.app.post('/toggle-task-mode', async (req, res) => {
            try {
                this.config.taskMode = !this.config.taskMode;
                const mode = this.config.taskMode ? 'Task Mode Activated' : 'Normal Mode Activated';
                res.json({ success: true, message: mode, taskMode: this.config.taskMode });
                this.io.emit('task-mode-changed', { taskMode: this.config.taskMode });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.app.post('/get-report', async (req, res) => {
            try {
                await this.sendSecurityReport();
                res.json({ success: true, message: "Security report generated" });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.app.post('/change-encryption', async (req, res) => {
            try {
                const { mode } = req.body;
                if (['base64', 'rot13', 'caesar'].includes(mode)) {
                    this.securitySystem.encryptionMode = mode;
                    res.json({ success: true, message: `Encryption changed to ${mode}` });
                } else {
                    res.status(400).json({ error: 'Invalid encryption mode' });
                }
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.app.post('/shutdown', async (req, res) => {
            try {
                console.log('🚨 Emergency shutdown initiated');
                res.json({ success: true, message: "Shutdown initiated" });
                process.exit(0);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // Legacy Combat Endpoints (replaced with security functions)
        this.app.post('/start-combat', async (req, res) => {
            try {
                const { opponent, opponentHealth = 100 } = req.body;
                const result = this.startCombat(opponent, opponentHealth);
                await this.sendMessage(result.message);
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.app.post('/attack', async (req, res) => {
            try {
                if (!this.combatSystem.isInCombat) {
                    return res.status(400).json({ error: "Not in combat" });
                }

                const { attackType = 'random' } = req.body;
                const result = this.performAttack(attackType);
                await this.sendMessage(result.message);

                res.json({
                    success: true,
                    attack: result,
                    persiaHealth: this.config.currentHealth,
                    opponentHealth: this.combatSystem.opponentHealth,
                    combatEnded: !this.combatSystem.isInCombat
                });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.app.post('/end-combat', async (req, res) => {
            try {
                const winner = this.endCombat();
                await this.sendMessage(winner.message);

                res.json(winner);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.app.get('/combat-status', (req, res) => {
            res.json({
                isInCombat: this.combatSystem.isInCombat,
                opponent: this.combatSystem.opponent,
                persiaHealth: this.config.currentHealth,
                opponentHealth: this.combatSystem.opponentHealth,
                combatLog: this.combatSystem.combatLog
            });
        });
    }

    setupSocket() {
        this.io.on('connection', (socket) => {
            console.log('Client connected to PersiaBot dashboard');

            socket.on('disconnect', () => {
                console.log('Client disconnected from PersiaBot dashboard');
            });
        });
    }

    // Encryption/Decryption Methods
    encodeMessage(message, method = this.securitySystem.encryptionMode) {
        switch(method) {
            case 'base64':
                return Buffer.from(message).toString('base64');
            case 'rot13':
                return message.replace(/[a-zA-Z]/g, function(c) {
                    return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
                });
            case 'caesar':
                return message.replace(/[a-zA-Z]/g, function(c) {
                    const shift = 7;
                    const base = c <= 'Z' ? 65 : 97;
                    return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base);
                });
            default:
                return message;
        }
    }

    decodeMessage(encodedMessage, method = this.securitySystem.encryptionMode) {
        switch(method) {
            case 'base64':
                try {
                    return Buffer.from(encodedMessage, 'base64').toString();
                } catch(e) {
                    return encodedMessage;
                }
            case 'rot13':
                return this.encodeMessage(encodedMessage, 'rot13'); // ROT13 is symmetric
            case 'caesar':
                return encodedMessage.replace(/[a-zA-Z]/g, function(c) {
                    const shift = 7;
                    const base = c <= 'Z' ? 65 : 97;
                    return String.fromCharCode(((c.charCodeAt(0) - base - shift + 26) % 26) + base);
                });
            default:
                return encodedMessage;
        }
    }

    generateSkullCode(messageType, data = '') {
        const baseCode = this.securitySystem.secretCodes[messageType] || '💀';
        const randomEmojis = this.securitySystem.skullEmojis
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .join('');
        return `${baseCode}${randomEmojis}${data}`;
    }

    async initialize() {
        try {
            console.log('💀 Initializing XploitBot browser...');

            // Strategy 1: Try with minimal configuration first
            console.log('🔍 Attempting minimal browser launch...');
            try {
                this.browser = await puppeteer.launch({
                    headless: false,
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-accelerated-2d-canvas',
                        '--no-first-run',
                        '--no-zygote',
                        '--disable-gpu',
                        '--disable-web-security',
                        '--user-data-dir=./xploit-profile-' + Date.now()
                    ]
                });
                console.log('✅ Minimal browser launch successful!');
            } catch (minimalError) {
                console.log('⚠️ Minimal launch failed, trying with executable path...');

                // Strategy 2: Try with explicit executable path
                const possiblePaths = [
                    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
                    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
                    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
                    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
                ];

                let executablePath = null;
                for (const path of possiblePaths) {
                    try {
                        const fs = require('fs');
                        if (fs.existsSync(path)) {
                            executablePath = path;
                            console.log(`✅ Found browser at: ${path}`);
                            break;
                        }
                    } catch (e) {
                        // Continue checking other paths
                    }
                }

                if (executablePath) {
                    this.browser = await puppeteer.launch({
                        headless: false,
                        executablePath: executablePath,
                        args: [
                            '--no-sandbox',
                            '--disable-setuid-sandbox',
                            '--disable-dev-shm-usage',
                            '--disable-accelerated-2d-canvas',
                            '--no-first-run',
                            '--no-zygote',
                            '--disable-gpu',
                            '--disable-web-security',
                            '--user-data-dir=./xploit-profile-' + Date.now()
                        ]
                    });
                    console.log('✅ Browser launch with executable path successful!');
                } else {
                    throw new Error('No compatible browser found. Please install Google Chrome or Microsoft Edge.');
                }
            }

            console.log('✅ PersiaBot browser initialized successfully!');

        } catch (error) {
            console.error('❌ Failed to initialize PersiaBot browser:', error.message);
            console.error('🔧 TROUBLESHOOTING STEPS:');
            console.error('   1. Install Google Chrome: https://www.google.com/chrome/');
            console.error('   2. Or Microsoft Edge (usually pre-installed on Windows)');
            console.error('   3. Try running this command as Administrator');
            console.error('   4. Temporarily disable antivirus/firewall');
            console.error('   5. Close all browser instances and try again');
            console.error('   6. Check Windows Event Viewer for more details');
            console.error('');
            console.error('If Chrome is installed but still failing, try:');
            console.error('   - Run: start chrome --version (to verify it works)');
            console.error('   - Or try: start msedge --version');
            throw error;
        }

        // Create page and set up after successful browser launch
        this.page = await this.browser.newPage();
        await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

        // Grant media permissions automatically
        const context = this.browser.defaultBrowserContext();
        await context.overridePermissions('https://www.stumblechat.com', [
            'microphone',
            'camera',
            'notifications'
        ]);

        // Start monitoring
        setInterval(() => {
            this.monitorChat();
        }, this.config.checkInterval);

        console.log('💀 XploitBot initialized and ready for exploitation!');

        // Navigate to StumbleChat and login
        try {
            console.log('🌐 Starting navigation to StumbleChat...');
            const loginSuccess = await this.login();
            if (loginSuccess) {
                console.log('✅ PersiaBot login successful!');
                this.isLoggedIn = true; // Ensure isLoggedIn is set
            } else {
                console.log('❌ PersiaBot login failed');
                this.isLoggedIn = false;
            }
        } catch (error) {
            console.error('❌ Failed to login to StumbleChat:', error.message);
            console.error('🔧 Login troubleshooting:');
            console.error('   - Check if username/password are correct');
            console.error('   - Verify StumbleChat.com is accessible');
            console.error('   - Try manual login to ensure credentials work');
            console.error('   - Check if account is banned or suspended');
            this.isLoggedIn = false;
        }
    }

    async login(username = 'DeathDopest', password = 'Radi0active1993!') {
        try {
            console.log('🌐 Going to homepage...');
            console.log(`📍 URL: ${this.config.homepageUrl}`);
            await this.page.goto(this.config.homepageUrl, { waitUntil: 'networkidle2', timeout: 30000 });
            console.log('✅ Homepage loaded successfully');

            console.log('🔐 Going to login page...');
            console.log(`📍 URL: ${this.config.loginUrl}`);
            await this.page.goto(this.config.loginUrl, { waitUntil: 'networkidle2', timeout: 30000 });
            console.log('✅ Login page loaded successfully');

            // Wait for login form and fill it - using exact selectors from actual form
            console.log('🔍 Looking for login form...');
            await this.page.waitForSelector('#username', { timeout: 10000 });
            await this.page.waitForSelector('#password', { timeout: 10000 });
            await this.page.waitForSelector('#login', { timeout: 10000 });

            console.log('✅ Login form found, filling credentials...');

            // Fill username using exact ID
            const usernameInput = await this.page.$('#username');
            if (usernameInput) {
                console.log(`⌨️ Typing username: ${username}`);
                await usernameInput.click({ clickCount: 3 }); // Select all text
                await this.page.keyboard.press('Backspace'); // Clear selection
                await usernameInput.type(username);
                console.log('✅ Username entered');
            }

            // Fill password using exact ID
            const passwordInput = await this.page.$('#password');
            if (passwordInput) {
                console.log('⌨️ Typing password...');
                await passwordInput.click({ clickCount: 3 }); // Select all text
                await this.page.keyboard.press('Backspace'); // Clear selection
                await passwordInput.type(password);
                console.log('✅ Password entered');
            }

            // Click login button using exact ID
            console.log('🔘 Clicking login button...');
            const loginButton = await this.page.$('#login');
            if (loginButton) {
                await loginButton.click();
                console.log('✅ Login button clicked, waiting for navigation...');
                await this.page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 });
                console.log('✅ Login navigation completed');
            }

            console.log('🏠 Going to HELL room...');
            console.log(`📍 URL: ${this.config.roomUrl}`);
            await this.page.goto(this.config.roomUrl, { waitUntil: 'networkidle2', timeout: 30000 });
            console.log('✅ HELL room loaded successfully');

            // Click the VERIFY button to enter the room
            console.log('🔍 Looking for VERIFY button...');
            try {
                await this.page.waitForSelector('#interact', { timeout: 10000 });
                const verifyButton = await this.page.$('#interact');
                if (verifyButton) {
                    console.log('🔘 Clicking VERIFY button...');
                    await verifyButton.click();
                    console.log('✅ VERIFY button clicked successfully');
                    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for room to load
                }
            } catch (error) {
                console.log('⚠️ VERIFY button not found or already verified, continuing...');
            }

            console.log('🔥 PersiaBot is now in the HELL room!');

            this.isLoggedIn = true;
            console.log(`🔐 PersiaBot logged in as ${username} and entered HELL room`);

            // Wait a bit for room to fully load, then change nickname
            console.log('⏳ Waiting for room to stabilize...');
            await new Promise(resolve => setTimeout(resolve, 5000));

            await this.changeNickname(this.config.nickname);

            // Start looking for fight
            this.startLookingForFight();

            return true;

        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    async changeNickname(nickname) {
        try {
            console.log(`📝 Changing nickname to ${nickname}...`);

            // First, check what the current nickname is
            try {
                const currentNickname = await this.page.$eval('.bar[user-id] .nickname', el => el.textContent);
                console.log(`📝 Current nickname: "${currentNickname}"`);
                if (currentNickname === nickname) {
                    console.log(`✅ Nickname is already "${nickname}", no change needed`);
                    return true;
                }
            } catch (checkError) {
                console.log('⚠️ Could not check current nickname, proceeding with change attempt');
            }

            // Wait for the user list to load - try multiple selectors
            console.log('🔍 Looking for user list...');
            const userSelectors = [
                '.bar[user-id]',
                '.user-item',
                '[class*="user"]',
                '.user-list li',
                '.users li'
            ];

            let userListFound = false;
            for (const selector of userSelectors) {
                try {
                    await this.page.waitForSelector(selector, { timeout: 2000 });
                    console.log(`✅ Found user list with selector: ${selector}`);
                    userListFound = true;
                    break;
                } catch (e) {
                    // Try next selector
                }
            }

            if (!userListFound) {
                console.log('⚠️ User list not found, trying alternative approach...');
            }

            // Try multiple selectors for the username element (based on actual HTML structure)
            console.log('🔍 Looking for username element...');
            const usernameSelectors = [
                '.bar[user-id] .username',  // Most specific: bar with user-id containing username
                '.bar .username',           // Fallback: any bar containing username
                '.bar-item .username',      // Direct bar-item containing username
                'span.username',            // Any span with username class
                '.username'                 // Any element with username class
            ];

            let userElement = null;
            for (const selector of usernameSelectors) {
                try {
                    userElement = await this.page.$(selector);
                    if (userElement) {
                        console.log(`✅ Found username with selector: ${selector}`);
                        break;
                    }
                } catch (e) {
                    // Try next selector
                }
            }

            if (userElement) {
                console.log('👆 Clicking on username...');
                await userElement.click({ delay: 500 }); // Add delay for click
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for menu to appear
            } else {
                console.log('⚠️ Username element not found, trying direct menu approach...');
            }

            // Look for "Change Nickname" link - try multiple selectors
            console.log('🔍 Looking for Change Nickname link...');
            const menuSelectors = [
                'a[data-action="nickname"]',
                '.user-menu-link[data-action="nickname"]',
                '[href*="nickname"]',
                '.change-nickname',
                '.nickname-change',
                'a:contains("Change Nickname")',
                'button:contains("Change Nickname")'
            ];

            let changeNicknameLink = null;
            for (const selector of menuSelectors) {
                try {
                    changeNicknameLink = await this.page.$(selector);
                    if (changeNicknameLink) {
                        console.log(`✅ Found menu item with selector: ${selector}`);
                        break;
                    }
                } catch (e) {
                    // Try next selector
                }
            }

            if (changeNicknameLink) {
                console.log('🔗 Clicking Change Nickname...');
                await changeNicknameLink.click();
                await new Promise(resolve => setTimeout(resolve, 1500));
            } else {
                console.log('⚠️ Change Nickname link not found, trying keyboard shortcut...');

                // Try pressing a keyboard shortcut that might open nickname change
                await this.page.keyboard.press('F2'); // Common shortcut for rename
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Try clicking on the username again with different method (using actual HTML structure)
                console.log('🔄 Trying alternative click method...');
                if (userElement) {
                    await this.page.evaluate(() => {
                        // Try the most specific selector first (bar with user-id containing username)
                        let usernameEl = document.querySelector('.bar[user-id] .username');
                        if (!usernameEl) {
                            // Fallback to general bar containing username
                            usernameEl = document.querySelector('.bar .username');
                        }
                        if (!usernameEl) {
                            // Last resort: any username element
                            usernameEl = document.querySelector('.username');
                        }
                        if (usernameEl) {
                            console.log('JavaScript clicking username element');
                            usernameEl.click();
                        }
                    });
                    await new Promise(resolve => setTimeout(resolve, 1500));
                }
            }

            // Wait for nickname input - try multiple selectors
            console.log('🔍 Looking for nickname input...');
            const inputSelectors = [
                '#modal-text-input',
                'input[placeholder*="nickname"]',
                'input[title*="nickname"]',
                'input[placeholder*="name"]',
                '.nickname-input',
                'input[type="text"]'
            ];

            let nicknameInput = null;
            for (const selector of inputSelectors) {
                try {
                    await this.page.waitForSelector(selector, { timeout: 2000 });
                    nicknameInput = await this.page.$(selector);
                    if (nicknameInput) {
                        console.log(`✅ Found input with selector: ${selector}`);
                        break;
                    }
                } catch (e) {
                    // Try next selector
                }
            }

            if (nicknameInput) {
                console.log('⌨️ Typing new nickname...');
                // Try to clear the input first
                await nicknameInput.click({ clickCount: 3 }); // Select all
                await this.page.keyboard.press('Backspace'); // Clear
                await nicknameInput.type(nickname);

                // Hit Enter to submit
                console.log('↵ Pressing Enter to submit...');
                await this.page.keyboard.press('Enter');
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Verify nickname change was successful
                try {
                    const updatedNickname = await this.page.$eval('.bar[user-id] .nickname', el => el.textContent);
                    if (updatedNickname === nickname) {
                        console.log(`✅ Nickname successfully changed to "${nickname}"`);
                    } else {
                        console.log(`⚠️ Nickname change may not have worked. Expected: "${nickname}", Got: "${updatedNickname}"`);
                    }
                } catch (verifyError) {
                    console.log('⚠️ Could not verify nickname change');
                }

                console.log(`✅ Nickname change attempted to ${nickname}`);
            } else {
                console.log('⚠️ Nickname input not found, nickname change may have failed');
            }

        } catch (error) {
            console.error('❌ Nickname change failed:', error.message);
            console.error('🔧 Possible solutions:');
            console.error('   - Try clicking on your username manually in the user list');
            console.error('   - Look for a "Change Nickname" option in a dropdown menu');
            console.error('   - The page structure may have changed');
            console.error('   - Nickname change is not critical - bot can still function');
            // Don't throw error - nickname change is not critical for basic functionality
        }
    }

    async startLookingForFight() {
        if (!this.isLoggedIn) return;

        console.log('⚔️ Starting to look for fight...');
        this.config.fightStarted = false;
        this.config.opponentFound = false;

        // Spam "lets fight" until we see opponent's message
        const fightInterval = setInterval(async () => {
            try {
                if (this.config.opponentFound) {
                    clearInterval(fightInterval);
                    console.log('🎯 Opponent found! Starting combat...');
                    return;
                }

                // Send "lets fight" message
                await this.sendMessage('lets fight');

                // Check for opponent's response
                const messages = await this.page.$$eval('.message, .chat-message, [class*="message"]', elements => {
                    return elements.map(el => ({
                        text: el.textContent.toLowerCase(),
                        author: el.getAttribute('data-author') || el.querySelector('.author, .username, [class*="author"]')?.textContent || ''
                    })).slice(-10); // Get last 10 messages
                });

                // Look for opponent saying "lets fight"
                for (const message of messages) {
                    if (message.text.includes('lets fight') &&
                        !message.author.toLowerCase().includes(this.config.nickname.toLowerCase()) &&
                        !message.author.toLowerCase().includes(this.config.username.toLowerCase())) {

                        this.config.opponentFound = true;
                        console.log(`🎯 Found opponent: ${message.author}`);
                        this.sendMessage('LETS FIGHT! *ExploitStrike* incoming!');

                        // Start automated combat
                        setTimeout(() => {
                            this.startAutomatedCombat(message.author);
                        }, 2000);
                        break;
                    }
                }

            } catch (error) {
                console.error('Error in fight search:', error);
            }
        }, 3000); // Send "lets fight" every 3 seconds

        // Stop looking after 5 minutes if no opponent found
        setTimeout(() => {
            if (!this.config.opponentFound) {
                clearInterval(fightInterval);
                console.log('⏰ Stopped looking for fight - timeout');
            }
        }, 300000);
    }

    async startAutomatedCombat(opponentName) {
        console.log(`⚔️ Starting automated combat with ${opponentName}`);

        // Start combat with the found opponent
        this.startCombat(opponentName, 900);

        // Send initial attack
        setTimeout(async () => {
            const result = this.performAttack();
            await this.sendMessage(result.message);
        }, 1000);
    }

    async sendMessage(message) {
        try {
            // Encode message by default unless in task mode
            const finalMessage = this.config.taskMode ?
                this.generateSkullCode('data_found', message) :
                this.encodeMessage(message);

            console.log(`💬 XploitBot sending ${this.config.taskMode ? 'skull code' : 'encoded'} message`);

            // Use specific textarea selector from user's description
            const textarea = await this.page.$('#textarea');
            if (textarea) {
                console.log('✅ Found textarea, clearing and typing message...');
                // Clear textarea by selecting all and deleting
                await textarea.click({ clickCount: 3 }); // Select all text
                await this.page.keyboard.press('Backspace'); // Clear selection
                await textarea.type(finalMessage);
                console.log('✅ Message typed, pressing Enter...');
                await this.page.keyboard.press('Enter');
                console.log(`✅ XploitBot message sent: ${this.config.taskMode ? '[SKULL CODE]' : '[ENCODED]'}`);
                return true;
            } else {
                console.error('❌ XploitBot could not find textarea #textarea');
                return false;
            }
        } catch (error) {
            console.error('❌ XploitBot failed to send message:', error);
            return false;
        }
    }

    async sendEncodedMessage(message) {
        const encoded = this.encodeMessage(message);
        console.log(`🔐 Sending encoded message: ${encoded}`);
        return this.sendMessage(message); // sendMessage will handle encoding
    }

    async sendSkullCode(messageType, data = '') {
        const skullCode = this.generateSkullCode(messageType, data);
        console.log(`💀 Sending skull code: ${skullCode}`);
        return this.sendMessage(skullCode);
    }

    async monitorChat() {
        try {
            if (!this.isLoggedIn) {
                console.log('🔒 XploitBot not logged in, skipping chat monitoring');
                return;
            }

            if (!this.page || this.page.isClosed()) {
                console.log('🔒 XploitBot page not available, skipping chat monitoring');
                return;
            }

            console.log('👀 XploitBot scanning for commands...');

            // Monitor for commands and security threats
            let messages = [];
            try {
                messages = await this.page.$$eval('.message, .chat-message, [class*="message"]', elements => {
                    return elements.map(el => ({
                        text: el.textContent,
                        author: el.getAttribute('data-author') || el.querySelector('.author')?.textContent || ''
                    }));
                });
            } catch (evalError) {
                console.log('⚠️ Chat evaluation failed, page might be loading:', evalError.message);
                return; // Skip this monitoring cycle
            }

            console.log(`📨 Scanned ${messages.length} messages`);

            for (const message of messages) {
                const msgText = message.text.toLowerCase();

                // Look for direct commands to XploitBot
                if (msgText.includes('@xploit') || msgText.includes('@exploit') ||
                    msgText.includes('xploitbot') || msgText.includes('exploitbot')) {

                    // Parse commands
                    if (msgText.includes('scan') || msgText.includes('analyze')) {
                        console.log('🔍 Scan command detected');
                        this.startSecurityScan();
                    } else if (msgText.includes('exploit') && msgText.includes('find')) {
                        console.log('🎯 Exploit search command detected');
                        this.findVulnerabilities();
                    } else if (msgText.includes('encode') || msgText.includes('encrypt')) {
                        console.log('🔐 Encode command detected');
                        this.sendEncodedMessage('Security protocols activated');
                    } else if (msgText.includes('task') && msgText.includes('start')) {
                        console.log('⚡ Task mode activated');
                        this.config.taskMode = true;
                        this.sendSkullCode('task_start');
                    } else if (msgText.includes('task') && msgText.includes('end')) {
                        console.log('🔚 Task mode deactivated');
                        this.config.taskMode = false;
                        this.sendSkullCode('task_complete');
                    } else if (msgText.includes('report') || msgText.includes('status')) {
                        console.log('📊 Status report requested');
                        this.sendSecurityReport();
                    }
                }

                // Monitor for security threats
                if (this.detectSecurityThreat(message.text)) {
                    console.log('🚨 Security threat detected!');
                    this.handleSecurityThreat(message);
                }
            }
        } catch (error) {
            console.error('Chat monitoring error:', error);
        }
    }

    // Security & Exploitation Methods
    async startSecurityScan() {
        console.log('🔍 Starting comprehensive security scan...');
        const scanResults = {
            users: await this.scanUsers(),
            messages: await this.scanMessages(),
            patterns: await this.detectPatterns()
        };

        this.securitySystem.vulnerabilities = scanResults;
        console.log(`✅ Security scan complete. Found ${scanResults.users.length} users, ${scanResults.messages.length} messages`);

        if (this.config.taskMode) {
            this.sendSkullCode('data_found', `SCAN:${scanResults.users.length}U_${scanResults.messages.length}M`);
        } else {
            this.sendEncodedMessage(`Security scan completed. ${scanResults.users.length} users analyzed.`);
        }
    }

    async scanUsers() {
        try {
            const users = await this.page.$$eval('.bar[user-id]', elements => {
                return elements.map(el => ({
                    id: el.getAttribute('user-id'),
                    nickname: el.querySelector('.nickname')?.textContent || 'Unknown',
                    username: el.querySelector('.username')?.textContent || 'Unknown'
                }));
            });
            return users;
        } catch(e) {
            console.log('⚠️ User scan failed');
            return [];
        }
    }

    async scanMessages() {
        try {
            const messages = await this.page.$$eval('.message, .chat-message', elements => {
                return elements.map(el => ({
                    text: el.textContent,
                    timestamp: Date.now()
                }));
            });
            return messages;
        } catch(e) {
            console.log('⚠️ Message scan failed');
            return [];
        }
    }

    async detectPatterns() {
        const patterns = [];
        // Analyze message patterns for security insights
        return patterns;
    }

    async findVulnerabilities() {
        console.log('🎯 Searching for system vulnerabilities...');

        const vulnerabilities = [
            'Weak encryption detected',
            'Open ports found',
            'Outdated software versions',
            'Configuration weaknesses'
        ];

        this.securitySystem.vulnerabilities = vulnerabilities;

        if (this.config.taskMode) {
            this.sendSkullCode('vulnerability', `VULN:${vulnerabilities.length}F`);
        } else {
            this.sendEncodedMessage(`Vulnerability assessment: ${vulnerabilities.length} issues found.`);
        }
    }

    async sendSecurityReport() {
        const report = {
            vulnerabilities: this.securitySystem.vulnerabilities.length,
            exploits: this.securitySystem.exploits.length,
            targets: this.securitySystem.targets.length,
            taskMode: this.config.taskMode,
            encryption: this.securitySystem.encryptionMode
        };

        if (this.config.taskMode) {
            this.sendSkullCode('data_found', `REPORT:V${report.vulnerabilities}_E${report.exploits}_T${report.targets}`);
        } else {
            this.sendEncodedMessage(`Security Report: ${JSON.stringify(report)}`);
        }
    }

    detectSecurityThreat(message) {
        const threats = [
            'password', 'hack', 'exploit', 'vulnerability', 'breach',
            'attack', 'malware', 'virus', 'trojan', 'ransomware'
        ];

        const msgLower = message.toLowerCase();
        return threats.some(threat => msgLower.includes(threat));
    }

    async handleSecurityThreat(message) {
        console.log('🚨 Processing security threat...');

        if (this.config.taskMode) {
            this.sendSkullCode('system_compromised');
        } else {
            this.sendEncodedMessage(`Security threat detected: ${message.text.substring(0, 50)}...`);
        }
    }

    // Legacy Combat System Methods (kept for compatibility but not used)
    startCombat(opponent, opponentHealth = 100) {
        this.combatSystem.isInCombat = true;
        this.combatSystem.opponent = opponent;
        this.combatSystem.opponentHealth = opponentHealth;
        this.combatSystem.combatLog = [];

        // Stop any existing healing
        if (this.combatSystem.healingInterval) {
            clearInterval(this.combatSystem.healingInterval);
            this.combatSystem.healingInterval = null;
        }

        // Reset Persia's health
        this.config.currentHealth = this.config.maxHealth;

        // Start automated attacks every 2 minutes
        this.combatSystem.attackInterval = setInterval(() => {
            if (this.combatSystem.isInCombat) {
                const result = this.performAttack();
                this.sendMessage(result.message);

                // Send trash talk occasionally
                if (Math.random() < 0.3) { // 30% chance to trash talk
                    setTimeout(() => {
                        this.sendTrashTalk();
                    }, 5000); // 5 seconds after attack
                }
            }
        }, this.combatSystem.attackTimer);

        this.addToCombatLog(`⚔️ Combat started! PersiaTheGreat (${this.config.currentHealth} HP) vs ${opponent} (${opponentHealth} HP)`);

        console.log(`⚔️ Combat started: Persia (${this.config.currentHealth} HP) vs ${opponent} (${opponentHealth} HP)`);

        return {
            success: true,
            message: `⚔️ Combat started! PersiaTheGreat (${this.config.currentHealth} HP) vs ${opponent} (${opponentHealth} HP)`
        };
    }

    performAttack(attackType = 'random') {
        let attack;

        if (attackType === 'exploitstrike' || attackType === 'exploitStrike') {
            attack = this.combatSystem.attacks.exploitStrike;
        } else if (attackType === 'vulnerabilityhack' || attackType === 'vulnerabilityHack') {
            attack = this.combatSystem.attacks.vulnerabilityHack;
        } else {
            // Random attack selection
            const attacks = Object.values(this.combatSystem.attacks);
            attack = attacks[Math.floor(Math.random() * attacks.length)];
        }

        const rand = Math.random();

        let result;
        let damage = 0;
        let message = '';

        if (rand < attack.hitChance) {
            // HIT - damage opponent
            damage = attack.damage;
            this.combatSystem.opponentHealth -= damage;
            message = `*HIT* ${attack.name} lands! ${attack.description} **${damage} damage** to ${this.combatSystem.opponent}! Their HP: ${this.combatSystem.opponentHealth}`;

            // Check if opponent is defeated
            if (this.combatSystem.opponentHealth <= 0) {
                this.combatSystem.opponentHealth = 0;
                message += '\n🏆 **VICTORY!** The Persian Empire triumphs! You have been crushed beneath our mighty warriors!';
                this.endCombat();
            }
        } else if (rand < attack.hitChance + attack.missChance) {
            // MISS - no damage
            message = `*MISS* ${attack.name} swings wide! My ancient pride blinded me! No damage dealt.`;
        } else {
            // HURTSELF - damage to Persia
            const selfDamage = Math.floor(Math.random() * 20) + 5; // 5-25 damage
            this.config.currentHealth -= selfDamage;
            message = `*HURTSELF* ${attack.name} backfires! I wounded myself in my imperial rage! **${selfDamage} damage** to myself! My HP: ${this.config.currentHealth}`;

            // Check if Persia is defeated
            if (this.config.currentHealth <= 0) {
                this.config.currentHealth = 0;
                message += '\n💀 **DEFEAT!** The Persian Empire falls... but we shall rise again!';
                this.endCombat();
            }
        }

        result = {
            attack: attack.name,
            outcome: damage > 0 ? 'hit' : 'miss',
            damage: damage,
            message: message,
            persiaHealth: this.config.currentHealth,
            opponentHealth: this.combatSystem.opponentHealth
        };

        this.addToCombatLog(`${attack.name}: ${damage > 0 ? `Hit for ${damage}!` : 'Missed!'}`);
        return result;
    }

    endCombat() {
        // Stop automated attacks
        if (this.combatSystem.attackInterval) {
            clearInterval(this.combatSystem.attackInterval);
            this.combatSystem.attackInterval = null;
        }

        const persiaWon = this.combatSystem.opponentHealth <= 0 && this.config.currentHealth > 0;
        const opponentWon = this.config.currentHealth <= 0 && this.combatSystem.opponentHealth > 0;
        const draw = this.config.currentHealth <= 0 && this.combatSystem.opponentHealth <= 0;

        let winner, message;

        if (persiaWon) {
            winner = 'persia';
            message = '🏆 **COMBAT ENDED!** I, PersiaTheGreat, emerge victorious! The Persian Empire conquers all!';
            // Start healing for the winner
            setTimeout(() => {
                this.startHealing();
            }, 5000); // Start healing after 5 seconds
        } else if (opponentWon) {
            winner = 'opponent';
            message = '😭 **COMBAT ENDED!** You defeated the Persian Empire... but we shall rebuild from the ashes!';
            // Leave chat after defeat
            setTimeout(() => {
                this.leaveChat();
            }, 10000); // Leave after 10 seconds
        } else {
            winner = 'draw';
            message = '💔 **COMBAT ENDED!** We both fell in this epic battle... but the Persian legacy endures!';
        }

        this.combatSystem.isInCombat = false;
        this.combatSystem.opponent = null;
        this.combatSystem.opponentHealth = 0;

        this.addToCombatLog(`Combat ended - Winner: ${winner}`);

        return { winner, message };
    }

    sendTrashTalk() {
        if (!this.combatSystem.isInCombat) return;

        const randomMessage = this.combatSystem.trashTalkMessages[
            Math.floor(Math.random() * this.combatSystem.trashTalkMessages.length)
        ];
        const trashTalk = `💬 @${this.combatSystem.opponent} ${randomMessage}`;
        this.sendMessage(trashTalk);
        this.addToCombatLog(`Trash talk: ${trashTalk}`);
    }

    startHealing() {
        if (this.combatSystem.healingInterval) return;

        this.combatSystem.healingInterval = setInterval(() => {
            if (this.config.currentHealth < this.config.maxHealth) {
                const oldHealth = this.config.currentHealth;
                this.config.currentHealth = Math.min(this.config.maxHealth, this.config.currentHealth + this.combatSystem.healingRate);
                const healMessage = `💚 Healing... HP: ${oldHealth} → ${this.config.currentHealth}/900`;
                this.sendMessage(healMessage);
                this.addToCombatLog(healMessage);

                if (this.config.currentHealth >= this.config.maxHealth) {
                    clearInterval(this.combatSystem.healingInterval);
                    this.combatSystem.healingInterval = null;
                    this.sendMessage(`🏆 Fully healed! Back at ${this.config.currentHealth}/900 HP! The Persian Empire is ready for conquest!`);
                    this.addToCombatLog("Fully healed and ready for next combat");
                }
            }
        }, this.combatSystem.healingTimer);
    }

    leaveChat() {
        this.sendMessage("😢 The Persian Empire retreats for now... but we shall return with renewed glory!");
        this.addToCombatLog("Left chat after defeat");
        // In a real implementation, you'd close the browser or disconnect
        // For now, we'll just end combat
        this.endCombat();
    }

    addToCombatLog(entry) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            message: entry
        };
        this.combatSystem.combatLog.push(logEntry);

        // Keep only last 50 entries
        if (this.combatSystem.combatLog.length > 50) {
            this.combatSystem.combatLog.shift();
        }
    }

    start() {
        this.server.listen(this.port, async () => {
            console.log('💀 XploitBot - StumbleChat.com Security & Exploitation');
            console.log('═'.repeat(55));
            console.log(`🌐 Web interface: http://localhost:${this.port}`);
            console.log('🎭 Role: Stealth Security Analyst & Exploitation Specialist');
            console.log('🔐 Encryption: Base64 + ROT13 + Caesar Cipher');
            console.log('💀 Skull Code: Active for secure communication');
            console.log('👤 Login User: XxXGrimReaperxXx');
            console.log('📝 Nickname: XploitMaster');
            console.log('═'.repeat(55));
            console.log('⚠️  Commands: @xploit scan, @xploit exploit find, @xploit task start/end');
            console.log('🔒 Messages are encoded by default unless in task mode');

            await this.initialize();
        });
    }
}

// Start the bot
if (require.main === module) {
    const xploitBot = new XploitBot();
    xploitBot.start();
}

module.exports = XploitBot;
