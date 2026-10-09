// Debug script to test StumbleChat login form detection
const puppeteer = require('puppeteer');

async function debugLogin() {
    console.log('🔍 Debugging StumbleChat login form...');

    try {
        console.log('🚀 Launching browser...');
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        console.log('✅ Browser launched successfully');

        console.log('🌐 Going to login page...');
        await page.goto('https://www.stumblechat.com/login', { waitUntil: 'networkidle2', timeout: 30000 });
        console.log('✅ Login page loaded');

        console.log('🔍 Looking for form elements...');

        // Check if elements exist
        const usernameExists = await page.$('#username') !== null;
        const passwordExists = await page.$('#password') !== null;
        const loginExists = await page.$('#login') !== null;

        console.log(`📝 Username field (#username): ${usernameExists ? '✅ FOUND' : '❌ NOT FOUND'}`);
        console.log(`🔒 Password field (#password): ${passwordExists ? '✅ FOUND' : '❌ NOT FOUND'}`);
        console.log(`🔘 Login button (#login): ${loginExists ? '✅ FOUND' : '❌ NOT FOUND'}`);

        if (usernameExists && passwordExists && loginExists) {
            console.log('🎉 Login form elements found! Testing room entry...');

            // Test room navigation
            console.log('🏠 Testing HELL room navigation...');
            await page.goto('https://www.stumblechat.com/room/hell', { waitUntil: 'networkidle2', timeout: 30000 });
            console.log('✅ HELL room loaded');

            // Check for VERIFY button
            const verifyExists = await page.$('#interact') !== null;
            console.log(`🔘 VERIFY button (#interact): ${verifyExists ? '✅ FOUND' : '❌ NOT FOUND'}`);

            if (verifyExists) {
                console.log('🎯 VERIFY button found! Room entry test successful.');
            } else {
                console.log('⚠️ VERIFY button not found. Might already be verified or different room structure.');
            }
        } else {
            console.log('⚠️ Some form elements missing. Checking alternatives...');

            // Get page HTML for debugging
            const html = await page.evaluate(() => document.body.innerHTML);
            console.log('📄 Page HTML (first 500 chars):', html.substring(0, 500));

            // Try to find alternative selectors
            const allInputs = await page.$$eval('input', inputs =>
                inputs.map(input => ({
                    type: input.type,
                    name: input.name,
                    id: input.id,
                    placeholder: input.placeholder
                }))
            );

            console.log('📋 All input elements found:', allInputs);
        }

        console.log('⏳ Keeping browser open for 30 seconds for manual inspection...');
        await new Promise(resolve => setTimeout(resolve, 30000));

        await browser.close();
        console.log('✅ Debug complete');

    } catch (error) {
        console.error('❌ Debug failed:', error.message);
    }
}

debugLogin();
