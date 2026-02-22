import { TEST_USERS } from '@config';
import { test, expect } from '@fixtures/inventory.fixture';

test.describe('Buy Flow', () => {
  test.beforeEach(async ({ loginAs }) => {
    await loginAs(TEST_USERS.standard_user);
  });
  
  test('should complete the buy flow successfully', async ({
    inventoryListPage,
    checkout,
  }) => {
    // Add first item to cart
    const firstItemButton = inventoryListPage.inventoryItems
      .first()
      .locator('button');
    await firstItemButton.click();
    await expect(inventoryListPage.navigation.shoppingCartBadge).toHaveText('1');

    // Navigate to cart and proceed to checkout
    const checkoutPage = checkout.cartPage;
    await inventoryListPage.navigation.shoppingCartLink.click();
    await expect(checkoutPage.title).toHaveText('Your Cart');
    await checkoutPage.checkoutButton.click();

    // Fill in checkout information
    const stepOnePage = checkout.stepOnePage;
    await expect(stepOnePage.title).toHaveText('Checkout: Your Information');
    await stepOnePage.firstNameInput.fill('John');
    await stepOnePage.lastNameInput.fill('Doe');
    await stepOnePage.postalCodeInput.fill('12345');
    await stepOnePage.continueButton.click();

    // Verify order summary and complete purchase
    const stepTwoPage = checkout.stepTwoPage;
    await expect(stepTwoPage.title).toHaveText('Checkout: Overview');
    await expect(stepTwoPage.paymentInfoValue).toHaveText('SauceCard #31337');
    await expect(stepTwoPage.shippingInfoValue).toHaveText('Free Pony Express Delivery!');
    await expect(stepTwoPage.subtotalLabel).toHaveText('Item total: $29.99');
    await expect(stepTwoPage.taxLabel).toHaveText('Tax: $2.40');
    await expect(stepTwoPage.totalLabel).toHaveText('Total: $32.39');
    await stepTwoPage.finishButton.click();

    // Verify order completion
    const checkoutCompletePage = checkout.checkoutCompletePage;
    await expect(checkoutCompletePage.title).toHaveText('Checkout: Complete!');
    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutCompletePage.completeText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    await expect(checkoutCompletePage.navigation.shoppingCartBadge).toBeHidden();
    await checkoutCompletePage.backHomeButton.click();
    await expect(inventoryListPage.page).toHaveURL(/.*inventory\.html/);
  });
});
