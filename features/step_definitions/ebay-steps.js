var {Then, When, Given} = require('cucumber');
var {By, until, Key} = require('selenium-webdriver');
var url = require('url');
var assert = require('assert');

const expect = require('chai').expect;
global.cartSubTotal = 0;
global.shippingTotal = 0;
global.itemList = [];

Given(/^I have opened the Ebay site$/, {timeout: 200 * 1000}, function(callback) {
    this.driver.get('https://www.ebay.com.au/').then( () => {
       callback();
    });
});

When(/^I search Ebay for "([^"]*)"$/, {timeout: 100 * 1000}, function(searchQuery, callback) {
    this.driver.findElement(By.id('gh-ac')).sendKeys(searchQuery, Key.ENTER);
    this.driver.wait(until.titleIs(searchQuery + " | eBay"), 1000);
    callback();
});


Then(/^I can select the product$/, function (callback) {
    var world = this;

    this.driver.findElements(By.className("s-item__link")).then(function(elements) {

        var rnd = Math.floor(Math.random() * (elements.length - 1));
        console.log("Select #: " + rnd);

        elements[rnd].click().then(function() { callback(); });
    });

});

Then(/^I can add product to a shopping cart$/, function (callback) {
    console.log("Add Product to a shopping cart");

    var world = this;
    const ELEM_BY = By.id("atcRedesignId_btn");
    this.driver.wait(until.elementLocated(ELEM_BY));
    const whatElement = this.driver.findElement(ELEM_BY);

    this.driver.wait(until.elementIsVisible(whatElement), 8000).then(function(elem){
        world.driver.getCurrentUrl().then(function(urlValue) {
            console.log("Url value = " + urlValue);
            var q = url.parse(urlValue, true);
            var itemValue = q.pathname.split('/');
            console.log("Item = " + itemValue[3]);
            itemList.push(itemValue[3]);
        });


        world.driver.findElement(By.id("prcIsum")).getText().then(function (valueLocalCurrency) {
            var valueOnly = valueLocalCurrency.replace(/[^0-9\.-]+/g,"");
            console.log("Price = " + valueOnly);
            cartSubTotal = cartSubTotal + Number(valueOnly);

        });

        world.driver.findElement(By.id("fshippingCost")).getText().then(function (postageValue) {
            console.log("Shipping cost = " + postageValue);
            if (postageValue.toString() != 'FREE') {
                var postValue = postageValue.replace(/[^0-9\.-]+/g,"");

                shippingTotal = shippingTotal + Number(postValue);
                console.log("Converted postage cost = " + Number(postValue));
            }
        });

        world.driver.findElement(ELEM_BY).click();
        callback();
    });
});

Then(/^product has been added to the cart and close popup$/, {timeout: 60 * 1000}, function (callback) {
    console.log("Product has been added to the cart");

    var world = this;

    var closeButton = this.driver.wait(until.elementLocated(By.className('clzBtn')));

    closeButton.click();
    callback();
});

Then(/^product has been added to the cart and go to checkout$/, {timeout: 60 * 1000}, function (callback) {
    var world = this;
    const ELEM_BY = By.xpath("//a[contains(@class, 'btn btn-scnd vi-VR-btnWdth-XL')]");
    this.driver.wait(until.elementLocated(ELEM_BY)).then(() => {
        world.driver.findElement(ELEM_BY).click();

        callback();
    });
});

Then(/^validate the prices$/, function (callback) {

    this.driver.wait(until.titleIs('Your eBay Shopping Cart'), 1000);

    this.driver.findElements(By.className('imganchor')).then(async function (elements) {
        for (var i = 0; i < elements.length; i++) {
            var link = await elements[i].getAttribute('href');
            var pieces = link.toString().split('/');
            var itemWithQuery = pieces[pieces.length-1].split('?');
            var item = itemWithQuery[0];
            assert(itemList.indexOf(item) > -1, "Unexpected " + item + " found!  Valid values are: " + itemList.join(" "));
        }
    });

    callback();
});