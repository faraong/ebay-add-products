var {Then, When, Given} = require('cucumber');
var {By, until, Key} = require('selenium-webdriver');
var url = require('url');
var assert = require('assert');

Given(/^I have opened the Ebay site in "([^"]*)"$/, {timeout: 200 * 1000}, function(browser, callback) {

    if (browser == 'IE') {
        this.driver = this.ie;
    } else {
        this.driver = this.chrome;
    }
    this.driver.get('https://www.ebay.com.au/').then( () => {
       callback();
    });
});

When(/^I can search Ebay for a product "([^"]*)"$/, {timeout: 100 * 1000}, function(searchQuery, callback) {
    this.driver.findElement(By.id('gh-ac')).sendKeys(searchQuery, Key.ENTER);
    this.driver.wait(until.titleIs(searchQuery + " | eBay"), 1000);
    callback();
});


Then(/^I can select a random product from the list$/, function (callback) {
    var world = this;

    this.driver.findElements(By.className("s-item__link")).then(function(elements) {

        var rnd = Math.floor(Math.random() * (elements.length - 1));

        elements[rnd].click().then(function() { callback(); });
    });

});

Then(/^I can add the selected product to a shopping cart$/, function (callback) {
    // console.log("Add Product to a shopping cart");

    var world = this;
    const element = By.id("atcRedesignId_btn");
    this.driver.wait(until.elementLocated(element));
    const whatElement = this.driver.findElement(element);

    this.driver.wait(until.elementIsVisible(whatElement), 8000).then(function(elem){
        world.driver.getCurrentUrl().then(function(urlValue) {
            var q = url.parse(urlValue, true);
            var itemValue = q.pathname.split('/');
            world.itemList.push(itemValue[3]);
        });

        world.driver.findElement(element).click();
        callback();
    });
});

Then(/^product has been added to the cart and go back to search$/, {timeout: 60 * 1000}, function (callback) {
    // console.log("Product has been added to the cart");

    var world = this;

    var closeButton = this.driver.wait(until.elementLocated(By.className('clzBtn')));

    closeButton.click();
    callback();
});

Then(/^product has been added to the cart and go to checkout$/, {timeout: 60 * 1000}, function (callback) {
    var world = this;
    const element = By.xpath("//a[contains(@class, 'btn btn-scnd vi-VR-btnWdth-XL')]");
    this.driver.wait(until.elementLocated(element)).then(() => {
        world.driver.findElement(element).click();

        callback();
    });
});

Then(/^validate the added products are on the cart$/, function (callback) {

    var world = this;

    this.driver.wait(until.titleIs('Your eBay Shopping Cart'), 1000);

    this.driver.findElements(By.className('imganchor')).then(async function (elements) {
        for (var i = 0; i < elements.length; i++) {
            var link = await elements[i].getAttribute('href');
            var pieces = link.toString().split('/');
            var itemWithQuery = pieces[pieces.length-1].split('?');
            var item = itemWithQuery[0];
            assert(world.itemList.indexOf(item) > -1, "Unexpected " + item + " found!  Valid values are: " + world.itemList.join(" "));
        }

        world.driver.close();

        callback();
    });


});