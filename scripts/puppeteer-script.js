const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0');

  await page.setExtraHTTPHeaders({
    'ngrok-skip-browser-warning': 'true',
  });

  await page.goto('https://e0b9-80-47-132-127.ngrok-free.app', { waitUntil: 'networkidle2' });

  const symbolDispose = Symbol('dispose');
  Symbol.dispose = Symbol.dispose || symbolDispose;

  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();