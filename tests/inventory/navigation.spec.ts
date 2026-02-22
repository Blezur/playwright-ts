import { test, expect } from '@fixtures/login.fixture';
import { NavigationComponent } from '@components/navigation.component';
import { TEST_USERS } from '@config';

const { standard_user } = TEST_USERS;

test.describe('Navigation Tests', () => {
  let navigationComponent: NavigationComponent;

  test.beforeEach(async ({ loginAs, loginPage }) => {
    await loginAs(standard_user);
    navigationComponent = new NavigationComponent(loginPage.page);
  });

  test('should open and close navigation menu', async ({ loginPage }) => {
    await expect(navigationComponent.menuCloseButton).toBeHidden();
    await navigationComponent.menuOpenButton.click();
    await expect(navigationComponent.menuCloseButton).toBeVisible();
    await navigationComponent.menuCloseButton.click();
    await expect(navigationComponent.menuCloseButton).toBeHidden();
    await expect(navigationComponent.menuOpenButton).toBeVisible();
  });

  test('should social media links have correct href attributes', async () => {
    await expect(navigationComponent.socialTwitterLink).toHaveAttribute(
      'href',
      'https://twitter.com/saucelabs',
    );
    await expect(navigationComponent.socialFacebookLink).toHaveAttribute(
      'href',
      'https://www.facebook.com/saucelabs',
    );
    await expect(navigationComponent.socialLinkedInLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/sauce-labs/',
    );
  });

  test('should display correct footer copyright text', async () => {
    const currentYear = new Date().getFullYear();
    await expect(navigationComponent.footerCopyright).toContainText(
      `© ${currentYear} Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy`,
    );
  });

  test('should navigate to about page when clicking about link', async ({ page }) => {
    await navigationComponent.menuOpenButton.click();
    await navigationComponent.aboutLink.click();
    await expect(page).toHaveURL('https://saucelabs.com/');
  });
});
