import { NavigationComponent } from '@components/navigation.component';
import type { Page } from '@playwright/test';

export class StepPage {
  readonly navigation: NavigationComponent;

  constructor(readonly page: Page) {
    this.navigation = new NavigationComponent(page);
  }

  get title() {
    return this.page.getByTestId('title');
  }
}
