// Simple browser test for PersiaBot
const puppeteer = require('puppeteer');

async function testBrowser() {
    console.log('🧪 Testing browser launch...');

    try {
        // Strategy 1: Try minimal launch
        console.log('🔍 Trying minimal configuration...');
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        console.log('✅ Browser launched successfully!');
        const page = await browser.newPage();
        await page.goto('https://www.google.com');
        console.log('✅ Page navigation successful!');

        await browser.close();
        console.log('✅ Browser closed successfully!');
        console.log('🎉 All tests passed! PersiaBot should work now.');

    } catch (error) {
        console.error('❌ Browser test failed:', error.message);
        console.error('🔧 Please follow the troubleshooting steps above.');
        process.exit(1);
    }
}

testBrowser();
