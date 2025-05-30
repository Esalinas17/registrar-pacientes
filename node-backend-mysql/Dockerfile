# c:\Users\Alejandro\Documents\GitHub\productos_app\registrar-pacientes\node-backend-mysql\Dockerfile

# Usa una imagen base de Node.js (elige una versión LTS)
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Si tu proyecto es TypeScript y necesita compilación:
# Copia el tsconfig.json
COPY tsconfig.json ./
# Copia el resto de los archivos fuente
COPY src ./src
# Compila el TypeScript a JavaScript (asegúrate que tu script "build" en package.json haga esto)
RUN npm run build

# Si tu proyecto es JavaScript puro o ya compilaste, solo copia los archivos:
# COPY . .

# Expone el puerto en el que tu aplicación corre dentro del contenedor
# Esta variable PORT es la que tu app usa internamente, definida en docker-compose.yml
# EXPOSE ${PORT} # No es estrictamente necesario si PORT es definido en docker-compose y usado por la app

# El comando para iniciar tu aplicación
# Asegúrate que la ruta al archivo de inicio (ej. dist/server.js) sea correcta después de la compilación
CMD [ "node", "dist/server.js" ]
