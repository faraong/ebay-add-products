var {setWorldConstructor, setDefaultTimeout} = require('cucumber');
var seleniumWebdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var firefox = require('selenium-webdriver/firefox');

// add drivers to path
require('chromedriver').path;
require('geckodriver').path;

function CustomWorld() {

    this.driver = null;

    // START: Firefox Configuration
    var firefoxOptions = new firefox.Options();
    firefoxOptions.addArguments('-private');

    this.firefox = function() {
        return new seleniumWebdriver.Builder()
            .withCapabilities(firefoxOptions.toCapabilities())
            .build();
    };
    // END: Firefox Configuration

    // START: Chrome Configuration
    var options = new chrome.Options();

    // option to disable image - not in use due to missing X after adding product to cart
    // options.setUserPreferences({'profile.default_content_setting_values.notifications': 2});

    options.addArguments('--incognito');

    this.chrome = function () {
        return new seleniumWebdriver.Builder()
            .withCapabilities(options.toCapabilities())
            .build();
    };
    // END: Chrome Configuration

    this.itemList = [];
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60 * 1000);