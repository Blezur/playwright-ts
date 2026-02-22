import { TEST_USERS } from '@config';
import { test, expect } from '@fixtures/inventory.fixture';

test.describe('Inventory List', () => {
  test.beforeEach(async ({ loginAs }) => {
    await loginAs(TEST_USERS.standard_user);
  });

  test('should display inventory items after successful login', async ({
    inventoryListPage,
  }) => {
    // Verify that the inventory list is displayed
    const inventoryItems = inventoryListPage.inventoryItems;
    await expect(inventoryItems).toHaveCount(6);
  });

  test('should display correct cart count after adding and removing items to cart', async ({
    inventoryListPage,
  }) => {
    await expect(inventoryListPage.navigation.shoppingCartBadge).toBeHidden();

    // First item from the list
    const firstItemButton = inventoryListPage.inventoryItems
      .first()
      .locator('button');

    await expect(firstItemButton).toHaveText('Add to cart');
    await firstItemButton.click();
    await expect(firstItemButton).toHaveText('Remove');
    await expect(inventoryListPage.navigation.shoppingCartBadge).toHaveText(
      '1',
    );
    await firstItemButton.click();
    await expect(firstItemButton).toHaveText('Add to cart');
    await expect(inventoryListPage.navigation.shoppingCartBadge).toBeHidden();
  });
});
