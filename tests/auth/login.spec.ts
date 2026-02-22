import { TEST_USERS } from '@config';
import { test, expect } from '@fixtures/login.fixture';

test.describe('Login Tests', () => {
  test('should login as standard user and land on inventory page', async ({
    loginAs,
    page,
  }) => {
    await loginAs(TEST_USERS.standard_user);
    await expect(page.getByTestId('inventory-container')).toBeVisible();
  });

  test('should show error message when logging in with locked out user', async ({
    loginPage,
  }) => {
    await loginPage.login(TEST_USERS.locked_out_user);
    await loginPage.expectErrorState(
      'Epic sadface: Sorry, this user has been locked out.',
    );
  });

  test('should show error message when logging in with invalid credentials', async ({
    loginPage,
  }) => {
    await loginPage.login({
      username: 'invalid_user',
      password: 'invalid_pass',
    });
    await loginPage.expectErrorState(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });

  test('should show error message when username field is empty', async ({
    loginPage,
  }) => {
    await loginPage.login({
      username: '',
      password: 'secret_sauce',
    });
    await loginPage.expectErrorState('Epic sadface: Username is required');
  });

  test('should show error message when username and password fields are empty', async ({
    loginPage,
  }) => {
    await loginPage.login({
      username: '',
      password: '',
    });
    await loginPage.expectErrorState('Epic sadface: Username is required');
  });

  test('should show error message when password field is empty', async ({
    loginPage,
  }) => {
    await loginPage.login({
      username: 'standard_user',
      password: '',
    });
    await loginPage.expectErrorState('Epic sadface: Password is required');
  });
});
