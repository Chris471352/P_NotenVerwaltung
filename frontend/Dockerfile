# Stufe 1: Bauen
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
ARG REACT_APP_API_URL=http://localhost:8081  # Ändern Sie dies
ENV REACT_APP_API_URL=$REACT_APP_API_URL
COPY . .
RUN npm run build

# Stufe 2: Server (Nginx)
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]