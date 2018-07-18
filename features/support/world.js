var {setWorldConstructor, setDefaultTimeout} = require('cucumber');
var seleniumWebdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var firefox = require('selenium-webdriver/firefox');
var chromepath = require('chromedriver').path;
var firefoxpath = require('geckodriver').path;
var {setDefaultTimeout} = require('cucumber');

function CustomWorld() {
    this.driver = null;

    // START: Firefox Configuration
    var firefoxOptions = new firefox.Options();
    firefoxOptions.addArguments('-private');

    this.firefox = new seleniumWebdriver.Builder()
        .withCapabilities(firefoxOptions.toCapabilities())
        .build();

    // Returns a promise that resolves to the element
    this.waitForElement = function(locator) {
        var condition = seleniumWebdriver.until.elementLocated(locator);
        return this.firefox.wait(condition)
    }
    // END: Firefox Configuration

    // START: Chrome Configuration
    var options = new chrome.Options();

    // option to disable image - not in use due to missing X after adding product to cart
    // options.setUserPreferences({'profile.default_content_setting_values.notifications': 2});

    options.addArguments('--incognito');

    this.chrome = new seleniumWebdriver.Builder()
        .withCapabilities(options.toCapabilities())
        .build();

    this.waitForElement = function(locator) {
        var condition = seleniumWebdriver.until.elementLocated(locator);
        return this.chrome.wait(condition)
    }
    // END: Chrome Configuration

    this.itemList = [];
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60 * 1000);