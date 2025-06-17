FROM node:22-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN if [ "$NODE_ENV" = "test" ]; then \
      npm install --include=dev; \
    else \
      npm install; \
    fi

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]