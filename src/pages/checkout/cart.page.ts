import type { Page } from '@playwright/test';
import { StepPage } from './step.page';

export class CartPage extends StepPage {
  constructor(page: Page) {
    super(page);
  }

  get checkoutButton() {
    return this.page.getByTestId('checkout');
  }
}
