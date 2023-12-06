const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  await page.goto('https://e0b9-80-47-132-127.ngrok-free.app', { waitUntil: 'networkidle2' });

  const symbolDispose = Symbol('dispose');
  Symbol.dispose = Symbol.dispose || symbolDispose;

  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();