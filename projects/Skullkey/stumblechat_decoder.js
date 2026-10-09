// Skullkey - StumbleChat Decoder Bot
// Created by D****l "Death" N****n
const puppeteer = require('puppeteer');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

class SkullkeyDecoder {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server);
        this.port = 3005; // Different port from XploitBot (3004)

        // Bot personality and state
        this.config = {
            homepageUrl: 'https://www.stumblechat.com',
            loginUrl: 'https://www.stumblechat.com/login',
            roomUrl: 'https://www.stumblechat.com/room/hell',
            username: 'XxXGrimReaperxXx', // Same account as XploitBot for testing
            nickname: 'SkullkeyDecoder',
            mood: 'mysterious',
            checkInterval: 3000, // Check more frequently for decoding
            headless: false,
            encryptionEnabled: true
        };

        // Decoding system
        this.decoderSystem = {
            decodedMessages: [],
            skullCodeMappings: {
                '💀☠️👻': 'task_start',
                '☠️👻🦇': 'task_complete',
                '🦇🕷️🕸️': 'data_found',
                '🕸️🦴⚰️': 'vulnerability',
                '⚰️🪦💀': 'exploit_ready',
                '🪦🧟🧛': 'target_locked',
                '🧛🦹🎭': 'system_compromised',
                '🎭👹👺': 'data_extracted'
            },
            encryptionModes: ['base64', 'rot13', 'caesar'],
            activeMode: 'base64'
        };

        this.isLoggedIn = false;
        this.browser = null;
        this.page = null;

        this.setupExpress();
    }

    setupExpress() {
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, 'public')));

        // Socket.IO connection
        this.io.on('connection', (socket) => {
            console.log('🦴 Decoder client connected');
            socket.on('disconnect', () => {
                console.log('🦴 Decoder client disconnected');
            });
        });

        // API endpoints
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });

        this.app.post('/decode-message', async (req, res) => {
            try {
                const { message } = req.body;
                const decoded = this.decodeMessage(message);
                res.json({ original: message, decoded: decoded });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.app.post('/decode-skull-code', async (req, res) => {
            try {
                const { skullCode } = req.body;
                const decoded = this.decodeSkullCode(skullCode);
                res.json({ skullCode: skullCode, decoded: decoded });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.app.get('/decoded-messages', (req, res) => {
            res.json({ messages: this.decoderSystem.decodedMessages.slice(-20) });
        });
    }

    // Encryption/Decryption Methods (same as XploitBot)
    decodeMessage(encodedMessage, method = this.decoderSystem.activeMode) {
        switch(method) {
            case 'base64':
                try {
                    return Buffer.from(encodedMessage, 'base64').toString();
                } catch(e) {
                    return this.tryAllDecodings(encodedMessage);
                }
            case 'rot13':
                return encodedMessage.replace(/[a-zA-Z]/g, function(c) {
                    return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
                });
            case 'caesar':
                return encodedMessage.replace(/[a-zA-Z]/g, function(c) {
                    const shift = 7;
                    const base = c <= 'Z' ? 65 : 97;
                    return String.fromCharCode(((c.charCodeAt(0) - base - shift + 26) % 26) + base);
                });
            default:
                return this.tryAllDecodings(encodedMessage);
        }
    }

    tryAllDecodings(message) {
        // Try all encryption methods to find readable text
        const methods = ['base64', 'rot13', 'caesar'];
        for (const method of methods) {
            try {
                const decoded = this.decodeMessage(message, method);
                // Check if decoded text looks like English (simple heuristic)
                if (this.isLikelyEnglish(decoded)) {
                    return `${method.toUpperCase()}: ${decoded}`;
                }
            } catch(e) {
                continue;
            }
        }
        return message; // Return original if nothing decoded properly
    }

    isLikelyEnglish(text) {
        // Simple heuristic: check for common English patterns
        const englishPatterns = /\b(the|and|or|but|in|on|at|to|for|of|with|by)\b/i;
        const wordCount = text.split(' ').length;
        return englishPatterns.test(text) || wordCount > 3;
    }

    decodeSkullCode(skullCode) {
        // Look for skull code patterns
        for (const [code, meaning] of Object.entries(this.decoderSystem.skullCodeMappings)) {
            if (skullCode.includes(code)) {
                return meaning.replace(/_/g, ' ').toUpperCase();
            }
        }

        // If no exact match, try to decode partial patterns
        const skulls = skullCode.match(/💀|☠️|👻|🦇|🕷️|🕸️|🦴|⚰️|🪦|🧟|🧛|🦹|🎭|👹|👺/g);
        if (skulls && skulls.length >= 3) {
            return `SKULL CODE DETECTED: ${skulls.length} emojis - ${skulls.join('')}`;
        }

        return skullCode; // Return original if no decoding possible
    }

    async initialize() {
        try {
            console.log('🦴 Initializing Skullkey Decoder...');

            // Browser launch with unique profile
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
                    '--user-data-dir=./skullkey-profile-' + Date.now()
                ]
            });

            console.log('✅ Skullkey browser initialized successfully!');

            this.page = await this.browser.newPage();
            await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

            // Grant media permissions
            const context = this.browser.defaultBrowserContext();
            await context.overridePermissions('https://www.stumblechat.com', [
                'microphone',
                'camera',
                'notifications'
            ]);

            // Start monitoring
            setInterval(() => {
                this.monitorAndDecode();
            }, this.config.checkInterval);

            console.log('🦴 Skullkey decoder initialized and ready for decryption!');

            // Navigate to StumbleChat and login
            try {
                console.log('🌐 Starting navigation to StumbleChat...');
                await this.loginToStumbleChat();
            } catch (error) {
                console.error('❌ Failed to login to StumbleChat:', error.message);
                console.error('🔧 Login troubleshooting:');
                console.error('   - Check if username/password are correct');
                console.error('   - Verify StumbleChat.com is accessible');
                console.error('   - Try manual login to ensure credentials work');
                console.error('   - Check if account is banned or suspended');
                this.isLoggedIn = false;
            }

        } catch (error) {
            console.error('❌ Failed to initialize Skullkey browser:', error.message);
            throw error;
        }
    }

    async loginToStumbleChat(username = this.config.username, password = 'Radi0active1993!') {
        try {
            console.log('🌐 Going to homepage...');
            await this.page.goto(this.config.homepageUrl, { waitUntil: 'networkidle2', timeout: 30000 });
            console.log('✅ Homepage loaded successfully');

            console.log('🔐 Going to login page...');
            await this.page.goto(this.config.loginUrl, { waitUntil: 'networkidle2', timeout: 30000 });
            console.log('✅ Login page loaded successfully');

            // Wait for login form
            await this.page.waitForSelector('#username', { timeout: 10000 });
            await this.page.waitForSelector('#password', { timeout: 10000 });
            await this.page.waitForSelector('#login', { timeout: 10000 });

            console.log('✅ Login form found, filling credentials...');

            // Fill credentials
            const usernameInput = await this.page.$('#username');
            if (usernameInput) {
                await usernameInput.click({ clickCount: 3 });
                await this.page.keyboard.press('Backspace');
                await usernameInput.type(username);
                console.log('✅ Username entered');
            }

            const passwordInput = await this.page.$('#password');
            if (passwordInput) {
                await passwordInput.click({ clickCount: 3 });
                await this.page.keyboard.press('Backspace');
                await passwordInput.type(password);
                console.log('✅ Password entered');
            }

            // Click login
            const loginButton = await this.page.$('#login');
            if (loginButton) {
                await loginButton.click();
                await this.page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 });
                console.log('✅ Login navigation completed');
            }

            console.log('🏠 Going to HELL room...');
            await this.page.goto(this.config.roomUrl, { waitUntil: 'networkidle2', timeout: 30000 });

            // Look for VERIFY button
            try {
                await this.page.waitForSelector('#interact', { timeout: 10000 });
                const verifyButton = await this.page.$('#interact');
                if (verifyButton) {
                    await verifyButton.click();
                    console.log('✅ VERIFY button clicked');
                }
            } catch (error) {
                console.log('⚠️ VERIFY button not found or already verified');
            }

            console.log('🔥 Skullkey is now in the HELL room!');

            this.isLoggedIn = true;
            console.log(`🔐 Skullkey logged in as ${username} and entered HELL room`);

            // Change nickname
            await this.changeNickname(this.config.nickname);

            return true;

        } catch (error) {
            console.error('❌ Login failed:', error.message);
            throw error;
        }
    }

    async changeNickname(nickname) {
        try {
            console.log(`📝 Changing nickname to ${nickname}...`);

            // Wait for user list
            await this.page.waitForSelector('.bar[user-id]', { timeout: 10000 });

            // Find username element
            const userElement = await this.page.$('.bar[user-id] .username');
            if (userElement) {
                await userElement.click({ delay: 500 });
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            // Look for Change Nickname link
            const menuSelectors = [
                'a[data-action="nickname"]',
                '.user-menu-link[data-action="nickname"]',
                '[href*="nickname"]'
            ];

            for (const selector of menuSelectors) {
                const changeLink = await this.page.$(selector);
                if (changeLink) {
                    await changeLink.click();
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    break;
                }
            }

            // Wait for input and type
            const inputSelectors = [
                '#modal-text-input',
                'input[placeholder*="nickname"]',
                'input[title*="nickname"]'
            ];

            for (const selector of inputSelectors) {
                const nicknameInput = await this.page.$(selector);
                if (nicknameInput) {
                    await nicknameInput.click({ clickCount: 3 });
                    await this.page.keyboard.press('Backspace');
                    await nicknameInput.type(nickname);
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    await this.page.keyboard.press('Enter');
                    console.log(`✅ Nickname changed to ${nickname}`);
                    return true;
                }
            }

            console.log('⚠️ Nickname input not found');
            return false;

        } catch (error) {
            console.error('❌ Nickname change failed:', error.message);
            return false;
        }
    }

    async monitorAndDecode() {
        try {
            if (!this.isLoggedIn || !this.page || this.page.isClosed()) {
                return;
            }

            console.log('👀 Skullkey scanning for XploitBot messages...');

            // Look for messages from XploitBot (by nickname)
            const messages = await this.page.$$eval('.message, .chat-message, [class*="message"]', elements => {
                return elements.map(el => ({
                    text: el.textContent,
                    author: el.getAttribute('data-author') || el.querySelector('.author')?.textContent || '',
                    timestamp: Date.now()
                }));
            });

            for (const message of messages) {
                if (message.author.includes('Xploit') || message.author.includes('xploit') ||
                    message.author.includes('DeathDopest')) {

                    const decodedInfo = this.analyzeMessage(message.text);
                    if (decodedInfo.isDecoded) {
                        console.log(`🔓 DECODED: ${decodedInfo.original} → ${decodedInfo.decoded}`);

                        // Store decoded message
                        this.decoderSystem.decodedMessages.push({
                            original: message.text,
                            decoded: decodedInfo.decoded,
                            type: decodedInfo.type,
                            timestamp: message.timestamp,
                            author: message.author
                        });

                        // Emit to web interface
                        this.io.emit('message-decoded', {
                            original: message.text,
                            decoded: decodedInfo.decoded,
                            type: decodedInfo.type
                        });
                    }
                }
            }

        } catch (error) {
            console.error('Chat monitoring error:', error);
        }
    }

    analyzeMessage(message) {
        // Check if it's a skull code
        if (this.isSkullCode(message)) {
            const decoded = this.decodeSkullCode(message);
            return {
                isDecoded: true,
                original: message,
                decoded: decoded,
                type: 'skull_code'
            };
        }

        // Check if it's encrypted text
        if (this.isEncrypted(message)) {
            const decoded = this.decodeMessage(message);
            if (decoded !== message) { // Only if actually decoded
                return {
                    isDecoded: true,
                    original: message,
                    decoded: decoded,
                    type: 'encrypted'
                };
            }
        }

        return { isDecoded: false };
    }

    isSkullCode(message) {
        const skullEmojis = /💀|☠️|👻|🦇|🕷️|🕸️|🦴|⚰️|🪦|🧟|🧛|🦹|🎭|👹|👺/;
        const skullCount = (message.match(skullEmojis) || []).length;
        return skullCount >= 3; // At least 3 skull emojis
    }

    isEncrypted(message) {
        // Check for base64 pattern (ends with = or ==)
        if (message.endsWith('=') || message.endsWith('==')) {
            return true;
        }

        // Check for other encryption patterns
        const hasSymbols = /[^a-zA-Z0-9\s]/.test(message);
        const wordCount = message.split(' ').length;

        return hasSymbols && wordCount <= 3; // Likely encrypted if short and has symbols
    }

    async sendMessage(message) {
        try {
            console.log(`💬 Skullkey sending decoded message: ${message}`);

            const textarea = await this.page.$('#textarea');
            if (textarea) {
                await textarea.click({ clickCount: 3 });
                await this.page.keyboard.press('Backspace');
                await textarea.type(message);
                await this.page.keyboard.press('Enter');
                console.log(`✅ Skullkey message sent: ${message}`);
                return true;
            } else {
                console.error('❌ Skullkey could not find textarea');
                return false;
            }
        } catch (error) {
            console.error('❌ Skullkey failed to send message:', error);
            return false;
        }
    }

    start() {
        this.server.listen(this.port, async () => {
            console.log('🦴 Skullkey - StumbleChat Decoder Bot');
            console.log('═'.repeat(50));
            console.log(`🌐 Web interface: http://localhost:${this.port}`);
            console.log('🎭 Role: Mysterious Decoder & Interpreter');
            console.log('🔐 Decodes: Base64, ROT13, Caesar, Skull Codes');
            console.log('💀 Twin Brother: Works with XploitBot');
            console.log('👤 Login User: XxXGrimReaperxXx');
            console.log('📝 Nickname: SkullkeyDecoder');
            console.log('═'.repeat(50));
            console.log('🔓 Automatically decodes XploitBot messages');
            console.log('💀 Interprets skull code communications');

            await this.initialize();
        });
    }
}

// Start the bot
if (require.main === module) {
    const skullkey = new SkullkeyDecoder();
    skullkey.start();
}

module.exports = SkullkeyDecoder;
