var {setWorldConstructor, setDefaultTimeout} = require('cucumber');
var seleniumWebdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var ie = require('selenium-webdriver/ie');
var chromepath = require('chromedriver').path;
var iepath = require('iedriver').path;
var {setDefaultTimeout} = require('cucumber');

function CustomWorld() {
    this.driver = null;

    this.ie = new seleniumWebdriver.Builder()
        .withCapabilities(seleniumWebdriver.Capabilities.ie())
        .build();

    this.chrome = new seleniumWebdriver.Builder()
        .withCapabilities(seleniumWebdriver.Capabilities.chrome())
        .build();

    // Returns a promise that resolves to the element
    this.waitForElement = function(locator) {
        var condition = seleniumWebdriver.until.elementLocated(locator);
        return this.ie.wait(condition)
    }
    // Returns a promise that resolves to the element
    this.waitForElement = function(locator) {
        var condition = seleniumWebdriver.until.elementLocated(locator);
        return this.chrome.wait(condition)
    }

    this.itemList = [];
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60 * 1000);