# playwright-ts

> End-to-end test suite for [SauceDemo](https://www.saucedemo.com/) built with Playwright and TypeScript.

[![Playwright Tests](https://github.com/Blezur/playwright-ts/actions/workflows/playwright.yml/badge.svg)](https://github.com/Blezur/playwright-ts/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-1.58-45ba4b?logo=playwright)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![pnpm](https://img.shields.io/badge/pnpm-10-f69220?logo=pnpm)](https://pnpm.io)

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation and test runner |
| [TypeScript](https://www.typescriptlang.org) | Strict typing across the entire suite |
| [ESLint](https://eslint.org) + [eslint-plugin-playwright](https://github.com/playwright-community/eslint-plugin-playwright) | Code quality and Playwright-specific linting |
| [Docker](https://www.docker.com) | Reproducible, containerized test execution |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline with report publishing |

---

## Project Structure

```
├── src/
│   ├── config.ts               # Test user definitions
│   ├── fixtures/
│   │   └── login.fixture.ts    # Custom Playwright fixtures
│   └── pages/
│       └── login.page.ts       # Page Object Model — Login
├── tests/
│   └── auth/
│       └── login.spec.ts       # Login test scenarios
├── .github/
│   └── workflows/
│       └── playwright.yml      # CI/CD pipeline
├── Dockerfile                  # Containerized test runner
└── playwright.config.ts        # Global Playwright configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) LTS
- [pnpm](https://pnpm.io) `>= 10`

### Installation

```bash
pnpm install
pnpm exec playwright install
```

### Running Tests

| Command | Description |
|---|---|
| `pnpm test` | Run all tests headlessly |
| `pnpm test:headed` | Run with browser visible |
| `pnpm test:ui` | Open Playwright UI mode |
| `pnpm test:debug` | Run in debug mode with inspector |
| `pnpm report` | Open the last HTML report |
| `pnpm lint` | Lint the codebase |

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `BASE_URL` | `https://www.saucedemo.com/` | Target application URL |
| `CI` | — | Set to any value to enable headless mode and strict CI behaviour |

---

## Running in Docker

```bash
docker build -t playwright-ts .
docker run --rm playwright-ts
```

The image is based on the official `mcr.microsoft.com/playwright` image with all browsers pre-installed. `CI=true` is set automatically inside the container.

---

## Architecture

### Page Object Model

Each page of the application is represented by a class in `src/pages/`. Page objects encapsulate locators and interactions, keeping tests free from implementation details.

```ts
const loginPage = new LoginPage(page);
await loginPage.login(TEST_USERS.standard_user);
await loginPage.expectErrorState('Epic sadface: Sorry, this user has been locked out.');
```

### Fixtures

Custom fixtures in `src/fixtures/` extend Playwright's base `test` with reusable setup:

```ts
// Use pre-configured page objects and helpers directly in tests
test('example', async ({ loginPage, loginAs }) => {
  await loginAs(TEST_USERS.standard_user);
});
```

### Test ID Strategy

`page.getByTestId()` is used exclusively for element selection, backed by the `data-test` HTML attributes present on SauceDemo. This is configured globally:

```ts
// playwright.config.ts
testIdAttribute: 'data-test'
```

---

## CI/CD

The GitHub Actions pipeline runs on every push and pull request to `main`. It can also be triggered manually via `workflow_dispatch` with selectable suite and browser.

### Pipeline Steps

1. Install dependencies (with pnpm cache)
2. Install Playwright browsers (with browser cache)
3. Run tests across Chromium, Firefox, and WebKit
4. Upload HTML report as a build artifact
5. Deploy report to [GitHub Pages](https://Blezur.github.io/playwright-ts/)
6. Post a report link as a comment on the PR

### Test Reports

| Trigger | Report URL |
|---|---|
| Push to `main` | `https://Blezur.github.io/playwright-ts/` |
| Pull request | `https://Blezur.github.io/playwright-ts/pr-{number}/` |
| Manual run | `https://Blezur.github.io/playwright-ts/manual-{run_id}/` |
