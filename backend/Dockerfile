FROM node:26.10-alpine3.24
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . . 
EXPOSE 5000
CMD ["node","server.js"]
