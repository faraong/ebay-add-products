# features/addcart.feature

Feature: Ebay End to End Testing
  I should be able to go to an Ebay website
  and search for 2 different products
  and add in the shopping cart
  and validate the shopping cart

  Scenario: Add products to Ebay cart
    Given I have opened the Ebay site in "FireFox"
    When I can search Ebay for a product "superhero cutter"
    Then I can select a random product from the list
    Then I can add the selected product to a shopping cart
    Then product has been added to the cart and go back to search
    Then I can search Ebay for a product "mini yellow paper bag"
    Then I can select a random product from the list
    Then I can add the selected product to a shopping cart
    Then product has been added to the cart and go to checkout
    Then validate the added products are on the cart

#  @addCart
#  Scenario Outline: Add products to Ebay cart
#    Given I have opened the Ebay site in "<browser>"
#    When I can search Ebay for a product "superhero cutter"
#    Then I can select a random product from the list
#    Then I can add the selected product to a shopping cart
#    Then product has been added to the cart and go back to search
#    Then I can search Ebay for a product "mini yellow paper bag"
#    Then I can select a random product from the list
#    Then I can add the selected product to a shopping cart
#    Then product has been added to the cart and go to checkout
#    Then validate the added products are on the cart
#
#    @addCartChrome
#    Scenarios:
#      | browser |
#      | Chrome  |
#
#    @addCartFireFox
#    Scenarios:
#      | browser |
#      | FireFox |
