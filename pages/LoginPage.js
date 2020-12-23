import {Selector, t} from 'testcafe';

class LoginPage{
    constructor(){
        this.emailInput = Selector('#Email')
        this.PasswordInput = Selector('#Password')
        this.submitButton = Selector("input.button-1.login-button")
        this.accountHeader = Selector("strong").withText("Returning Customer");
    }
}
export default new LoginPage();