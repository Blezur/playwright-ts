import type { Page } from '@playwright/test';
import { StepPage } from './step.page';

export class CheckoutCompletePage extends StepPage {
  constructor(readonly page: Page) {
    super(page);
  }

  get completeHeader() {
    return this.page.getByTestId('complete-header');
  }

  get completeText() {
    return this.page.getByTestId('complete-text');
  }

  get backHomeButton() {
    return this.page.getByTestId('back-to-products');
  }
}
