export interface TestUser {
  username: string;
  password: string;
}

const DEFAULT_PASSWORD = 'secret_sauce';

export const TEST_USERS: Record<string, TestUser> = {
  standard_user: {
    username: 'standard_user',
    password: DEFAULT_PASSWORD,
  },
  locked_out_user: {
    username: 'locked_out_user',
    password: DEFAULT_PASSWORD,
  },
  problem_user: {
    username: 'problem_user',
    password: DEFAULT_PASSWORD,
  },
  performance_glitch_user: {
    username: 'performance_glitch_user',
    password: DEFAULT_PASSWORD,
  },
  error_user: {
    username: 'error_user',
    password: DEFAULT_PASSWORD,
  },
  visual_user: {
    username: 'visual_user',
    password: DEFAULT_PASSWORD,
  },
} as const;

export const URLS = {
  ABOUT_US_URL: 'https://saucelabs.com/',
  TWITTER_URL: 'https://twitter.com/saucelabs',
  FACEBOOK_URL: 'https://www.facebook.com/saucelabs',
  LINKEDIN_URL: 'https://www.linkedin.com/company/sauce-labs/',
} as const;