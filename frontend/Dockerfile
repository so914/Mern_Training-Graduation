FROM node:26.10-alpine3.24 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build 


FROM gcr.io/distroless/nodejs26-debian13
WORKDIR /app
COPY --from=builder /app/dist .
COPY server.js .
USER nonroot:nonroot
EXPOSE 8080
CMD ["server.js"]

