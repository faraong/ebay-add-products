# addcart.feature

Feature: Ebay End to End Testing
  I should be able to go to an Ebay website
  and search for 2 different products
  and add in the shopping cart
  and validate the shopping cart

  Scenario: Add products to Ebay cart
    Given I have opened the Ebay site
    When I search Ebay for "junior chef book old no cover"
    Then I can select the product
    Then I can add product to a shopping cart
    Then product has been added to the cart and close popup
    Then I search Ebay for "mini yellow paper bag"
    Then I can select the product
    Then I can add product to a shopping cart
    Then product has been added to the cart and go to checkout
    Then validate the prices
