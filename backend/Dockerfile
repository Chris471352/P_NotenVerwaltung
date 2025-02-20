# backend/Dockerfile

# Node.js-Image, z.B. 18 LTS
FROM node:18-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# package.json und package-lock.json kopieren
COPY package*.json ./

# Dependencies installieren
RUN npm install

# Restlichen Code kopieren
COPY . .

# Port 8081 ist der Port, den unser Express-Server verwendet
EXPOSE 8081

# Startbefehl
CMD ["node", "server.js"]
