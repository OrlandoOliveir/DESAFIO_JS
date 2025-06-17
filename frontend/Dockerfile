FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./

# Instala dependências incluindo as de desenvolvimento para o build
RUN npm install --include=dev

COPY . .

# Executa o build
RUN npm run build

FROM nginx:alpine

# Copia os arquivos construídos
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuração customizada do nginx se necessário
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]