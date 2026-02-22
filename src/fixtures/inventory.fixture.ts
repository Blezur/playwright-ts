import { test as base } from '@fixtures/login.fixture';
import { CartPage } from '@pages/checkout/cart.page';
import { CheckoutCompletePage } from '@pages/checkout/checkout-complete.page';
import { StepOnePage } from '@pages/checkout/step-one.page';
import { StepTwoPage } from '@pages/checkout/step-two.page';
import { InventoryListPage } from '@pages/inventory/inventory-list.page';

type InventoryFixtures = {
  inventoryListPage: InventoryListPage;
  checkout: {
    cartPage: CartPage;
    stepOnePage: StepOnePage;
    stepTwoPage: StepTwoPage;
    checkoutCompletePage: CheckoutCompletePage;
  };
};

export const test = base.extend<InventoryFixtures>({
  inventoryListPage: async ({ page }, use) => {
    await use(new InventoryListPage(page));
  },
  checkout: async ({ page }, use) => {
    await use({
      cartPage: new CartPage(page),
      stepOnePage: new StepOnePage(page),
      stepTwoPage: new StepTwoPage(page),
      checkoutCompletePage: new CheckoutCompletePage(page),
    });
  },
});

export { expect } from '@playwright/test';