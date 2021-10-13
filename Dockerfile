FROM node:latest

WORKDIR /opt/app/src

RUN  apt-get update && apt-get install -y redis-server

COPY package.json ./

COPY yarn.lock ./

RUN yarn

RUN npm install --no-optional && npm cache clean --force
RUN npm i -g nodemon

COPY . . 

EXPOSE 6379

EXPOSE 5000

CMD ["sh", "-c", "redis-server > /dev/null 2>&1 & npm start"]