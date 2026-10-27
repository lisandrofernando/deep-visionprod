# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund
COPY public ./public
COPY src ./src
RUN npm run build

# ---- runtime stage ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000 \
    ALLOWED_ORIGINS=https://www.deep-vison.com,https://deep-vison.com
RUN npm init -y >/dev/null && npm install --omit=dev --no-audit --no-fund nodemailer@^8.0.1 && npm cache clean --force
COPY --from=build /app/build ./build
COPY api ./api
COPY server.js ./
USER node
EXPOSE 3000
HEALTHCHECK CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "server.js"]
