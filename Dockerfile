FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN apk add --update --no-cache make gcc g++ python3 && \
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python3
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]