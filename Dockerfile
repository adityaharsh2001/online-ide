FROM node:latest

WORKDIR /opt/app/src



# RUN groupadd --gid 5000 ide-geek \
#     && useradd --home-dir /home/ide-geek --create-home --uid 5000 \
#     --gid 5000 --shell /bin/sh --skel /dev/null ide-geek

# RUN mkdir /app
# RUN chown -R ide-geek:ide-geek /app


RUN  apt-get update && apt-get install -y redis-server

COPY package.json ./

COPY yarn.lock ./

RUN yarn

RUN npm install --no-optional && npm cache clean --force
RUN npm i -g nodemon

# USER ide-geek

COPY . . 

EXPOSE 6379

EXPOSE 5000

CMD ["sh", "-c", "redis-server > /dev/null 2>&1 & npm start"]