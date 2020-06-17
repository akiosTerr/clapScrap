//WARNING: NEVER console.log the whole HTML BODY unless you know its a very small body 
function getHTMLBody(page) {
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    return bodyHTML;
}