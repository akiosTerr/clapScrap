const ClapScrap = require('../src/app');

const URL = 'https://coolurl.com'; //the url to scrap
const userAgent = 'your user agent string'; //the User Agent String

const CS = new ClapScrap(userAgent);

const { page, response } = await CS.launchBot(productURL);

const headers = response.headers();

//tells if the HTTP request succeded
console.log(headers.status);

//ID or Class of all text elements
const handlers = ['#yourID', '.yourClass'];

//Xpath of a image element
const imageXPATH = '//*[@id="image-element-id"]';

//Returns Array with the text content of the elements
const texts = await CS.getTexts(page, handlers);

//Returns the SRC URL of the image
const imageURL = await CS.getImageURL(page, imageXPATH);

//finally, displays the data
console.log(texts);
console.log(imageURL);
