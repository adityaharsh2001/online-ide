FROM node:latest
WORKDIR /opt/app/src

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . . 

EXPOSE 3000

CMD ["sh", "-c", "npm start"]