# Використовуємо лише node alpine для швидкості та розміру
FROM node:18-alpine as builder

WORKDIR /app

# Копіюємо файли залежностей
COPY package*.json ./
COPY prisma ./prisma/

# Встановлюємо залежності
RUN npm ci

# Копіюємо всі сирці (виправлено з COPY . .)
COPY . .

# Генеруємо Prisma Client та збираємо проект
RUN npx prisma generate
RUN npm run build

# Stage для запуску
FROM node:18-alpine as runner
WORKDIR /app

# Створюємо безпечного користувача
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 sveltekit

# Копіюємо тільки необхідне з builder
COPY --from=builder --chown=sveltekit:nodejs /app/build build/
COPY --from=builder --chown=sveltekit:nodejs /app/node_modules node_modules/
COPY --from=builder --chown=sveltekit:nodejs /app/package.json package.json
COPY --from=builder --chown=sveltekit:nodejs /app/prisma prisma/

USER sveltekit
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "build"]