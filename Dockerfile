FROM node:12

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm i --quiet
COPY . .
RUN npm run build

EXPOSE 3002

CMD npm start
