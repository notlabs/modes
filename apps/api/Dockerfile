FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY nx.json ./
COPY tsconfig*.json ./
COPY eslint.config.js ./

RUN pnpm install --frozen-lockfile

COPY apps/api ./apps/api

EXPOSE 80

CMD ["pnpm", "nx", "run", "api:serve", "--configuration=production"]
