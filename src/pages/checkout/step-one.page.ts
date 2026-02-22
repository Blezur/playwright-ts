import type { Page } from "@playwright/test";
import { StepPage } from "./step.page";

export class StepOnePage extends StepPage {
  constructor(readonly page: Page) {
    super(page);
  }

  get firstNameInput() {
    return this.page.getByTestId('firstName');
  }
  
  get lastNameInput() {
    return this.page.getByTestId('lastName');
  }

  get postalCodeInput() {
    return this.page.getByTestId('postalCode');
  }
  
  get continueButton() {
    return this.page.getByTestId('continue');
  }
}