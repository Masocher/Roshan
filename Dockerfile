# build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --registry="https://mirror-npm.runflare.com" express

COPY . .

RUN npm run build

# production
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
