import { NavigationComponent } from '@components/navigation.component';
import type { Page } from '@playwright/test';

export class InventoryListPage {
  readonly navigation: NavigationComponent;

  constructor(readonly page: Page) {
    this.navigation = new NavigationComponent(page);
  }

  get inventoryItems() {
    return this.page.getByTestId('inventory-item');
  }
}
