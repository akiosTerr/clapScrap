const puppeter = require('puppeteer');

function ClapScrap(UA) {
	this.UA = UA;
}

ClapScrap.prototype = {
	launchBot: async (url, headless = true) => {
		const browser = await puppeter.launch({
			headless: headless,
			args: [`--user-agent=${this.UA}`],
		});
		this.browser = browser;
		const page = await browser.newPage();
		const response = await page.goto(url);

		return { page, response };
	},
	closeBrowser: async () => {
		const browser = this.browser;
		if (browser === undefined) {
			throw new Error('No browser is currently running');
		}
		await browser.close();
	},
	getImageURL: async (page, xpath) => {
		const [el] = await page.$x(xpath);
		const src = await el.getProperty('src');
		const srcTxt = await src.jsonValue();
		return srcTxt;
	},
	evalXpath: async (page, xpath) => {
		await page.waitForXPath(xpath);
		const [elHandle] = await page.$x(xpath);
		const property = await page.evaluate((el) => el.textContent, elHandle);
		return property;
	},
	getText: async (page, handler) => {
		const text = page
			.$eval(handler, (e) => e.innerText)
			.then((data) => {
				return { status: 1, payload: data };
			})
			.catch((err) => {
				console.log(err);
				return { status: 0, payload: err };
			});
		return text;
	},
	getTexts: async (page, handlers) => {
		let texts = [];
		handlers.map(async (handler) => {
			const text = await page.$eval(handler, (e) => e.innerText);
			texts.push(text);
		});
		return texts;
	},
};

module.exports = ClapScrap;
