import type { Page } from '@playwright/test';
import { StepPage } from './step.page';

export class StepTwoPage extends StepPage {
  constructor(readonly page: Page) {
    super(page);
  }

  get paymentInfoValue(){
    return this.page.getByTestId('payment-info-value');
  }

  get shippingInfoValue() {
    return this.page.getByTestId('shipping-info-value');
  }

  get subtotalLabel() {
    return this.page.getByTestId('subtotal-label');
  }

  get taxLabel() {
    return this.page.getByTestId('tax-label');
  }

  get totalLabel() {
    return this.page.getByTestId('total-label');
  }

  get finishButton() {
    return this.page.getByTestId('finish');
  }
}
