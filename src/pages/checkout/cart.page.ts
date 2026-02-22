import type { Page } from '@playwright/test';
import { StepPage } from './step.page';

export class CartPage extends StepPage {
  constructor(readonly page: Page) {
    super(page);
  }

  get checkoutButton() {
    return this.page.getByTestId('checkout');
  }
}
