import { Page, expect } from '@playwright/test';
import type { TestUser } from '@models/testuser.model';

export class LoginPage {
  constructor(readonly page: Page) {}

  get usernameInput() {
    return this.page.getByTestId('username');
  }

  get passwordInput() {
    return this.page.getByTestId('password');
  }

  get loginButton() {
    return this.page.getByTestId('login-button');
  }

  getErrorMessage() {
    return this.page.getByTestId('error');
  }

  async expectErrorState(message: string) {
    const errorMessage = this.getErrorMessage();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(message);
    await expect(this.usernameInput).toHaveClass(/input_error/);
    await expect(
      this.usernameInput.locator('..').locator('.error_icon'),
    ).toBeVisible();
    await expect(this.passwordInput).toHaveClass(/input_error/);
    await expect(
      this.passwordInput.locator('..').locator('.error_icon'),
    ).toBeVisible();
  }

  async login(user: TestUser) {
    await this.page.goto('/');
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }
}
