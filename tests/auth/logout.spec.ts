import { test, expect } from '@fixtures/login.fixture';
import { NavigationComponent } from '@components/navigation.component';
import { TEST_USERS } from '@config';

test.describe('Logout Functionality', () => {
  test('should user be logged out after logging out from inventory page', async ({
    loginAs,
    loginPage,
    page,
  }) => {
    await loginAs(TEST_USERS.standard_user);
    const navigation = new NavigationComponent(page);
    await navigation.menuOpenButton.click();
    await navigation.logoutLink.click();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
