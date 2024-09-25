# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS build

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos necesarios para instalar las dependencias
COPY pnpm-lock.yaml ./
COPY package.json ./

# Instalar las dependencias con pnpm
RUN pnpm install

# Copiar el resto de la aplicación al contenedor
COPY . .

# Construir la aplicación Nuxt 3
RUN pnpm build

# Etapa 2: Imagen ligera para producción
FROM node:18-alpine AS production

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo las dependencias y archivos de producción
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.output ./output

# Definir la variable de entorno para producción
ENV NODE_ENV=production

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para correr la aplicación Nuxt3
CMD ["node", "./output/server/index.mjs"]
