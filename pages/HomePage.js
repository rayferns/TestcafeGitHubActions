import {Selector, t} from 'testcafe';

class HomePage{
    constructor(){
        this.subtitleHeader = Selector('h2')
        .withText('Welcome to our store')
        this.RegisterLink = Selector('a').withText('Register')
        this.LoginLink = Selector('a').withText('Log in')
        this.CartLink = Selector('a').withText('Shopping cart')
        this.currencyList = Selector('select#customerCurrency')
        this.MyAccountLink = Selector('a').withText('My account')
        this.LogoutLink = Selector('a').withText('Log out'); 
    }
    get productSearch(){
        return Selector("input[id='small-searchterms']");
    }    

    async search(product){
        await t
        .typeText(this.productSearch, product)
        .wait(3000)
        .pressKey('enter')
    }       
    
    async changeCurrency(currency)
    {
        await t
        .click(this.currencyList)
        .click(Selector('option', {text: currency}))
    }
}
export default new HomePage();
