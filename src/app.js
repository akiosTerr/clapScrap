const puppeter = require('puppeteer');
const data = require('../data/americanas.json');
const UAstrings = require('../data/UAstrings.json');

const links = data.links;

async function launchBot(url) {
	const browser = await puppeter.launch({
		headless: true,
		args: [`--user-agent=${UAstrings['Samsung-Galaxy-S7']}`],
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

async function getTexts(handlers, page) {
	const texts = handlers.map(async (handler) => {
		const text = await getText(page, handler);
		return text;
	});
	return texts;
}

async function evalXpath(page, xpath) {
	await page.waitForXPath(xpath);
	const [elHandle] = await page.$x(xpath);
	const property = await page.evaluate((el) => el.textContent, elHandle);
	return property;
}

async function main() {
	const { page, response } = await launchBot(data.products[0]);
	const headers = response.headers();
	console.log(headers.status);

	const handlers = [data.price, data.title];
	const texts = await getTexts(handlers, page);

	setTimeout(() => {
		console.log(texts);
	}, 100);

	// const url = await getImageURL(page, '//*[@id="post-51490"]/div/figure/img');
	// console.log(url);

	// const text = await getText(page, '.kjGSBk');
	// console.log(text);

	// const prop = await evalXpath(
	// 	page,
	// 	'//*[@id="content"]/div/div/div[2]/div/section/div/div/div[2]/div/div[2]/div/div[3]/div[1]/div/div/span'
	// );
	// console.log(prop);
}

main();
