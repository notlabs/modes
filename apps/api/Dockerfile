FROM node:20-slim

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

EXPOSE 3000
CMD ["pnpm", "nx", "run", "api:serve", "--configuration=production"]
