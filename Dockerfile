FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /app

# Enable pnpm via corepack (matches packageManager in package.json)
RUN corepack enable && corepack prepare pnpm@10.26.1 --activate

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and test files
COPY playwright.config.ts tsconfig.json eslint.config.ts ./
COPY src/ ./src/
COPY tests/ ./tests/

# CI mode
ENV CI=true

CMD ["pnpm", "exec", "playwright", "test"]
