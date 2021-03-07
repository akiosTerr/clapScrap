const puppeter = require('puppeteer')
require('dotenv').config()


function Cl4pScr4p() {
	this.UA = process.env.UA
	this.current_page = null
	this.browser = null
}

Cl4pScr4p.prototype = {
	launchBot: async (url, headless = true) => {
		console.log('processing request...');
		const browser = await puppeter.launch({
			headless: headless,
			args: [`--user-agent=${this.UA}`, '--start-maximized'],
		})
		this.browser = browser
		const pages = await browser.pages()
		this.current_page = pages[0]
		await this.current_page.setViewport({ width: 1366, height: 768 })
		const response = await this.current_page.goto(url)
		return response
	},
	closeBrowser: async () => {
		const browser = this.browser
		if (browser == null) {
			throw new Error('No browser is currently running')
		}
		await browser.close()
	},
	wait: async (time) => {
		const page = this.current_page
		await page.waitForTimeout(time)
	},
	getValueByElement: async (element, selector) => {
		const page = this.current_page
		const eh = await element.$(selector)
		const value = await page.evaluate(x => x.textContent, eh)
		return value
	},
	getValuesFromElements: async (elements, selector) => {
		const page = this.current_page
		const values = elements.map(async(eh) => {
			const elem = await eh.$(selector)
			const value = await page.evaluate(x => x.textContent, elem)
			return value
		})
		return values
	},
	getAttFromElements: async (elements, selector) => {
		const page = this.current_page
		const values = elements.map(async(eh) => {
			const elem = await eh.$(selector)
			const value = await page.evaluate(x => x.getAttribute('src'), elem)
			return value
		})
		return values
	},
	getPropFromElements: async (elements, selector) => {
		const values = elements.map(async(eh) => {
			const elem = await eh.$(selector)
			const value = elem.getProperty('src')
			return value.jsonValue()
		})
		return values
	},
	collectByClass: async (className) => {
		const page = this.current_page
		const getThemAll = await page.$$(`.${className}`)
		return getThemAll
	},
	pressInput: async (id) => {
		const page = this.current_page
		await page.$eval(`#${id}`, elem => elem.click())
	},
	getValueById: async (id) => {
		const page = this.current_page
		const element = await page.$(`#${id}`)
		const value = await page.evaluate(x => x.value, element)
		return value
	},
	setInputValue: async (id, newInputValue) => {
		const page = this.current_page
		await page.$eval(`input[name=${id}]`, (el, value) => el.value = value, newInputValue)
	},
}

module.exports = Cl4pScr4p