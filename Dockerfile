FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ts*.json ./
COPY public ./public
COPY src ./src

ENV NODE_PATH ./src
ENV DEBUG rpgen

EXPOSE 3000

CMD ["npm", "start"]
