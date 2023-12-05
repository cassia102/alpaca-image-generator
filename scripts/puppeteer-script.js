const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://8ae9-80-47-132-127.ngrok.io', { waitUntil: 'networkidle2' });

  const symbolDispose = Symbol('dispose');
  Symbol.dispose = Symbol.dispose || symbolDispose;

  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();