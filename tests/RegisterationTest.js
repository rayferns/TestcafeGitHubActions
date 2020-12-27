import { ClientFunction, clientFunction } from 'testcafe';
import homepage from '../pages/HomePage';
import registerpage from '../pages/RegisterPage';
import loginpage from '../pages/LoginPage';
import custmerpage from '../pages/CustomerPage';

const dataSet = require('../data/data.json');
const URl = 'https://demo.nopcommerce.com/';
const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000);
var userEmail = 'Ray' + randomNumber + '@test.com'
var password = '123456'

fixture("Registration Fixture")
    .page(URl);

test('Assert Home Page Test', async t => {
    await t
        .expect(getURL()).eql(URl)
        .takeScreenshot()
        .expect(homepage.subtitleHeader.exists).ok();

});

dataSet.forEach(data => {
    test('User Registration and Login Test', async t => {
        await t
            .click(homepage.RegisterLink)
            .expect(getURL()).contains('register')
            .click(registerpage.GenderOption)
            .typeText(registerpage.FirstName, data.firstname)
            .typeText(registerpage.LastName, data.lastname)

        await registerpage.selectDay(data.birthday);
        await registerpage.selectMonth(data.birthmonth);
        await registerpage.selectYear(data.birthyear);
        await t
            .typeText(registerpage.Email, data.email+randomNumber+'@test.com')
            .typeText(registerpage.Password, data.password)
            .typeText(registerpage.ConfirmPassword, data.password)
            .click(registerpage.RegisterButton)
            .expect(registerpage.SuccessfullMessage.exists).ok()

            //Logout
            .click(homepage.LogoutLink)

            //login with registered account
            .click(homepage.LoginLink)
            .expect(loginpage.accountHeader.exists).ok()
            .typeText(loginpage.emailInput, data.email+randomNumber+'@test.com')
            .typeText(loginpage.PasswordInput, data.password)
            .click(loginpage.submitButton)

            //Goto my account
            .click(homepage.MyAccountLink)

            //Check Orders is displayed
            .expect(custmerpage.ordersLink.exists).ok()
            .click(custmerpage.ordersLink)
            .expect(custmerpage.noOrdersLabel.exists).ok()
            .takeScreenshot();
    })
});