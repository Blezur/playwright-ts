import { Locator, Page, expect } from '@playwright/test';
import { TestUser } from '@config';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
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
