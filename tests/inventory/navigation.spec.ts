import { test, expect } from '@fixtures/inventory.fixture';
import { TEST_USERS, URLS } from '@config';

const { standard_user } = TEST_USERS;

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ loginAs }) => {
    await loginAs(standard_user);
  });

  test('should open and close navigation menu', async ({
    inventoryListPage,
  }) => {
    const navigationComponent = inventoryListPage.navigation;
    await expect(navigationComponent.menuCloseButton).toBeHidden();
    await inventoryListPage.navigation.menuOpenButton.click();
    await expect(navigationComponent.menuCloseButton).toBeVisible();
    await navigationComponent.menuCloseButton.click();
    await expect(navigationComponent.menuCloseButton).toBeHidden();
    await expect(navigationComponent.menuOpenButton).toBeVisible();
  });

  test('should social media links have correct href attributes', async ({
    inventoryListPage,
  }) => {
    const navigationComponent = inventoryListPage.navigation;
    await expect(navigationComponent.socialTwitterLink).toHaveAttribute(
      'href',
      URLS.TWITTER_URL,
    );
    await expect(navigationComponent.socialFacebookLink).toHaveAttribute(
      'href',
      URLS.FACEBOOK_URL,
    );
    await expect(navigationComponent.socialLinkedInLink).toHaveAttribute(
      'href',
      URLS.LINKEDIN_URL,
    );
  });

  test('should display correct footer copyright text', async ({
    inventoryListPage,
  }) => {
    const currentYear = new Date().getFullYear();
    await expect(inventoryListPage.navigation.footerCopyright).toContainText(
      `© ${currentYear} Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy`,
    );
  });

  test('should navigate to about page when clicking about link', async ({
    inventoryListPage,
  }) => {
    const navigationComponent = inventoryListPage.navigation;
    await navigationComponent.menuOpenButton.click();
    await navigationComponent.aboutLink.click();
    await expect(inventoryListPage.page).toHaveURL(URLS.ABOUT_US_URL);
  });
});
