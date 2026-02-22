import { TEST_USERS } from '../src/config';
import { test, expect } from '../src/fixtures/login.fixture';

test('should login as standard user and land on inventory page', async ({
  page,
  loginAs,
}) => {
  await loginAs(TEST_USERS.standard_user);
  await expect(page.getByTestId('inventory-container')).toBeVisible();
});
