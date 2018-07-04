const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	// extend
	await browser.close();
})().catch(err => console.log(err));