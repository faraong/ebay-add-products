var {Then, When, Given} = require('cucumber');
var {By, until, Key} = require('selenium-webdriver');
var url = require('url');
var assert = require('assert');

Given(/^I have opened the Ebay site in "([^"]*)"$/, {timeout: 200 * 1000}, async function(browser) {
    //console.log('Opening the Ebay site');

    if (browser === 'FireFox') {
        this.driver = await this.firefox();
    } else {
        this.driver = await this.chrome();
    }

    await this.driver.get('https://www.ebay.com.au/');
});

When(/^I can search Ebay for a product "([^"]*)"$/, {timeout: 100 * 1000}, async function(searchQuery) {
    // console.log('Searching for the product');

    var query = await this.driver.wait(until.elementLocated(By.id('gh-ac')));
    await query.sendKeys(searchQuery, Key.ENTER);
    await this.driver.wait(until.titleIs(searchQuery + " | eBay"), 5000);
});


Then(/^I can select a random product from the list$/, async function () {
    // console.log('Selecting a product');

    // give it time to load
    await this.driver.sleep(1000);

    var elements = await this.driver.findElements(By.className("s-item__link"));
    var rnd = Math.floor(Math.random() * (elements.length - 1));
    await elements[rnd].click();
    await this.driver.wait(until.titleContains('| eBay'));
});

Then(/^I can add the selected product to a shopping cart$/, async function () {
    // console.log("Adding Product to a shopping cart");

    // Get the item for comparison with the final value
    var urlValue = await this.driver.getCurrentUrl();
    var q = url.parse(urlValue, true);
    var itemValue = q.pathname.split('/');
    this.itemList.push(itemValue[3]);

    // Find the Add to Cart Button
    const element = By.id('atcRedesignId_btn');
    await this.driver.wait(until.elementLocated(element), 8000);

    // Click on the Add to Cart Button
    var button = await this.driver.findElement(element);
    await button.click();
});

Then(/^product has been added to the cart and go back to search$/, {timeout: 60 * 1000}, async function () {
    // console.log("Continue search");

    const element = By.className('clzBtn');
    await this.driver.wait(until.elementLocated(element));

    // Give it a bit of time to complete rendering
    await this.driver.sleep(1000);

    var button = await this.driver.findElement(element);
    await button.click();
});

Then(/^product has been added to the cart and go to checkout$/, {timeout: 60 * 1000}, async function () {
    // console.log("Checking products in the cart");
    const element = By.xpath("//a[contains(@class, 'btn btn-scnd vi-VR-btnWdth-XL')]");
    await this.driver.wait(until.elementLocated(element));
    var button = await this.driver.findElement(element);
    await button.click();
});

Then(/^validate the added products are on the cart$/, async function () {
    await this.driver.wait(until.titleIs('Your eBay Shopping Cart'), 5000);

    var elements = await this.driver.findElements(By.className('imganchor'));
    for (var i = 0; i < elements.length; i++) {
        var link = await elements[i].getAttribute('href');
        var pieces = link.toString().split('/');
        var itemWithQuery = pieces[pieces.length-1].split('?');
        var item = itemWithQuery[0];
        assert(this.itemList.indexOf(item) > -1, "Unexpected " + item + " found!  Valid values are: " + this.itemList.join(" "));
    }
    await this.driver.close();
});
