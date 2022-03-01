FROM node:lts-slim as base

WORKDIR /usr/app

COPY package.json ./

RUN npm install


FROM base as dev

EXPOSE 3000

CMD ["npm", "start"]
