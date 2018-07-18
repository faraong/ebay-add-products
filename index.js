var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    jsonFile: './report/cucumber_report.json',
    output: './report/cucumber_report.html',
    reportSuiteAsScenarios: true,
    launchReport: true,
    name: "Ebay Add Cart Test",
    metadata: {
        "App Version":"1.0.0",
        "Platform": "MacOS",
        "Parallel": "Scenarios",
        "Executed": "Remote"
    }
};


reporter.generate(options);
