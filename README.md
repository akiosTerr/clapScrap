# ClapScrap

## A web scraping node library 

A simple library based on puppeteer for scraping data from the web



### Hello World:
```javascript
const ClapScrap = require('ClapScrap');


const URL = 'https://coolurl.com'; //the url to scrap
const userAgent = 'your user agent string'; //the User Agent String

const CS = new ClapScrap(userAgent);

//Launch the bot and opens a new page with the URL
const { page, response } = await CS.launchBot(URL);

const headers = response.headers();

//tells if the HTTP request succeded
console.log(headers.status);

//ID or Class of all text elements
const handlers = ['#elementID', '.elementClass'];

//Xpath of a image element
const imageXPATH = '//*[@id="image-element-id"]';

//Returns Array with the text content of the elements
const texts = await CS.getTexts(page, handlers);

//Returns the SRC URL of the image
const imageURL = await CS.getImageURL(page, imageXPATH);

//finally, displays the data
console.log(texts);
console.log(imageURL);


```

### Debug 
disable headless mode for debugging by passing false as second argument to launchBot
```javascript
 CS.launchBot("URL", false)
```

## License
[MIT](https://choosealicense.com/licenses/mit/)



