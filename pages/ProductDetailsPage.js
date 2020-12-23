import { Selector } from 'testcafe';

class ProductDetailsPage {
    constructor() {
        this.productPrice = Selector("span[id='price-value-4']").withText('$1,800.00')
            this.productQuantity = Selector("input[id='product_enteredQuantity_4']")
            this.addToCart = Selector("input[id='add-to-cart-button-4']")
            this.successMessage = Selector ("div.bar-notification.success");
    }
}
export default new ProductDetailsPage();