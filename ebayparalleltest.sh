# To run the ebay Add Cart Test in Chrome and IE at the same time
./node_modules/cucumber/bin/cucumber-js --tags=@addCart --tags=@addCartChrome | ./node_modules/cucumber/bin/cucumber-js --tags=@addCart --tags=@addCartFireFox
