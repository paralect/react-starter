FROM node:10.16.3

EXPOSE 3002
COPY ["./package.json", "./package-lock.json", "./.eslintrc.js", "./.eslintignore", "./.babelrc", "./browserslist", "./.stylelintrc", "/app/"]

WORKDIR /app

RUN npm i --quiet

COPY ./src /app/src

RUN npm run build-client

CMD npm start
