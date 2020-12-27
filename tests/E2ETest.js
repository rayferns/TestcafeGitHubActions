import { ClientFunction } from 'testcafe';
import homepage from '../pages/HomePage';
import registerpage from '../pages/RegisterPage';
import searchresults from '../pages/SearchResultPage';
import productdetails from '../pages/ProductDetailsPage';
import cartpage from '../pages/CartPage';
import checkoutpage from '../pages/CheckoutPage';
import myorderpage from '../pages/MyOrdersPage';

const URL = 'https://demo.nopcommerce.com/';
const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000);
var userEmail = 'ray'+randomNumber+'@gmail.com';

fixture `E2E Fixture`
    .page(URL);
 
test('Assert home page', async t => {
    await t
    .expect(getURL()).eql(URL)
    .takeScreenshot()
    .expect(homepage.subtitleHeader.exists).ok()
});

test("Place Order E2E Tests", async (t) => {
    await t
    .maximizeWindow()
    .click(homepage.RegisterLink)
    .expect(getURL()).contains('register')
    .click(registerpage.GenderOption)
    .typeText(registerpage.FirstName,'Ray')
    .typeText(registerpage.LastName,'Fernandes')
    .typeText(registerpage.Email,userEmail)
    .typeText(registerpage.Password,'123456')
    .typeText(registerpage.ConfirmPassword,'123456')
    .click(registerpage.RegisterButton)
    .expect(registerpage.SuccessfullMessage.exists).ok();

    await homepage.search("Apple MacBook Pro 13-inch");
    await t

    //search results
    .click(searchresults.productTitle)
    .expect(getURL()).contains('apple-macbook-pro-13-inch')

    //product details
    .expect(productdetails.productPrice.exists).ok()
    .selectText(productdetails.productQuantity).pressKey("delete")
    .typeText(productdetails.productQuantity, '3')
    .click(productdetails.addToCart)
    .expect(productdetails.successMessage.exists).ok()
    .wait(3000)

    //cart and Checkout
    .click(homepage.CartLink)
    .click(cartpage.termsLabel)
    .click(cartpage.checkoutBtn)
    .expect(getURL()).contains('checkout');

    //Place Order
    await checkoutpage.selectCountry('United Kingdom');
    await t
    .takeScreenshot()
    .typeText(checkoutpage.cityTxt,'London')
    .typeText(checkoutpage.addressTxt,'4 City Road')
    .typeText(checkoutpage.zipTxt,'EC1Y 2AA')
    .typeText(checkoutpage.phoneTxt,'02074561239')
    .click(checkoutpage.continueBtn)
    .click(checkoutpage.nextDayOption)
    .click(checkoutpage.nextShippingBtn)
    .click(checkoutpage.nextPaymentBtn)
    .click(checkoutpage.nextConfirmBtn)
    .click(checkoutpage.confirmOrderBtn)
    .expect(checkoutpage.orderConfirmationMessage.exists).ok()
    .click(checkoutpage.viewOrderDetailsLink)

    //My Account
    .click(homepage.MyAccountLink)
    .click(myorderpage.orders);
});

test("Change Currency Test", async (t) => {
    await homepage.changeCurrency('Euro');
})