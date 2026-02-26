import type { TestUser } from '@models/testuser.model';
import { LoginPage } from '@pages/login.page';
import { test as base } from '@playwright/test';

type LoginFixtures = {
  loginPage: LoginPage;
  loginAs: (user: TestUser) => Promise<void>;
};

export const test = base.extend<LoginFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  loginAs: async ({ loginPage }, use) => {
    await use(async (user: TestUser) => {
      await loginPage.login(user);
    });
  },
});

export { expect } from '@playwright/test';