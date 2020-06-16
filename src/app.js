const puppeter = require('puppeteer');
const links = require('../data/americanas.json').products;

async function launchBot(url) {
	const browser = await puppeter.launch({
		headless: true,
		args: [],
	});
	const page = await browser.newPage();
	const response = await page.goto(url);

	return { page, response };
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
	const { page, response } = await launchBot(links[0]);
	const bodyHTML = await page.evaluate(() => document.body.innerHTML);
	const headers = response.headers();

	console.log(bodyHTML);
	console.log(headers.status);

	//const response = await getText(page, '.kjGSBk');

	// const url = await getImageURL(page, '//*[@id="post-51490"]/div/figure/img');
	// console.log(url);

	// const prop = await evalXpath(
	// 	page,
	// 	'//*[@id="content"]/div/div/div[2]/div/section/div/div/div[2]/div/div[2]/div/div[3]/div[1]/div/div/span'
	// );
	// console.log(prop);
}

main();
