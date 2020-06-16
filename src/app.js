const puppeter = require('puppeteer');

async function launchBot(url, wait = false) {
	const browser = await puppeter.launch();
	const page = await browser.newPage();
	await Promise.all([
		page.goto(url),
		// page.waitForNavigation({ waitUntil: 'networkidle0' }),
	]);

	return page;
}

async function getImageURL(page, xpath) {
	const [el] = await page.$x(xpath);
	const src = await el.getProperty('src');
	const srcTxt = await src.jsonValue();

	return srcTxt;
}

async function getText(page, handler) {
	const text = await page.$eval(handler, (e) => e.innerText);
	return text;
}

async function evalXpath(page, xpath) {
	await page.waitForXPath(xpath);
	const [elHandle] = await page.$x(xpath);
	const property = await page.evaluate((el) => el.textContent, elHandle);
	return property;
}

async function main() {
	const page = await launchBot('https://tim.blog/');

	// const url = await getImageURL(page, '//*[@id="post-51490"]/div/figure/img');
	// console.log(url);

	// const text = await getText(page, '//*[@id="post-51490"]/header/h3/a');
	// console.log(text);

	const prop = await evalXpath(page, '//*[@id="post-51490"]/div/p[1]/span[3]');
	console.log(prop);
}

main();
