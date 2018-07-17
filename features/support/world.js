var {setWorldConstructor, setDefaultTimeout} = require('cucumber');
var seleniumWebdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path
var {setDefaultTimeout} = require('cucumber');

function CustomWorld() {
    this.driver = new seleniumWebdriver.Builder()
        .withCapabilities(seleniumWebdriver.Capabilities.chrome())
        .build();

    // Returns a promise that resolves to the element
    this.waitForElement = function(locator) {
        var condition = seleniumWebdriver.until.elementLocated(locator);
        return this.driver.wait(condition)
    }

    this.itemList = [];
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60 * 1000);