FROM node:22-alpine AS builder
WORKDIR /app

# 1. Copia os arquivos de dependência
COPY package*.json ./

# 2. Instala TODAS as dependências (incluindo devDependencies)
RUN npm install --include=dev

# 3. Copia o resto do código
COPY . .

# 4. Executa o build
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80