FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install --include=dev
RUN npm install @eslint/js@latest eslint-plugin-prettier@latest globals@latest --save-dev
COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]