FROM node:18

WORKDIR /distributed-queue-system

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD npm install react-icons react-router-dom styled-components; npm start
