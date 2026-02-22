import { test, expect } from '@fixtures/login.fixture';

test.describe('Access Restriction Tests', () => {
  const restrictedPaths = [
    'inventory-item.html?id=1',
    'inventory.html',
    'cart.html',
    'checkout-step-one.html',
    'checkout-step-two.html',
    'checkout-complete.html',
  ];
  for (const path of restrictedPaths) {
    test(`should restrict access to ${path} for unauthenticated users`, async ({
      loginPage,
    }) => {
      //Clear query params for error message
      const cleanPath = path.split('?')[0];
      await loginPage.page.goto(`/${path}`);
      await loginPage.expectErrorState(
        `Epic sadface: You can only access '/${cleanPath}' when you are logged in.`,
      );
    });
  }
});
