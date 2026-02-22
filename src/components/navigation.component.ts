import type { Page } from '@playwright/test';

export class NavigationComponent {
  constructor(private readonly page: Page) {}

  get menuOpenButton() {
    return this.page.locator('#react-burger-menu-btn');
  }

  get menuCloseButton() {
    return this.page.locator('#react-burger-cross-btn');
  }

  get allItemsLink() {
    return this.page.getByTestId('inventory-sidebar-link');
  }

  get aboutLink() {
    return this.page.getByTestId('about-sidebar-link');
  }

  get logoutLink() {
    return this.page.getByTestId('logout-sidebar-link');
  }

  get shoppingCartLink() {
    return this.page.getByTestId('shopping-cart-link');
  }

  get shoppingCartBadge() {
    return this.page.getByTestId('shopping-cart-badge');
  }

  get socialTwitterLink() {
    return this.page.getByTestId('social-twitter');
  }

  get socialFacebookLink() {
    return this.page.getByTestId('social-facebook');
  }

  get socialLinkedInLink() {
    return this.page.getByTestId('social-linkedin');
  }

  get footerCopyright() {
    return this.page.getByTestId('footer-copy');
  }
}
