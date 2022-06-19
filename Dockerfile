FROM node:16
WORKDIR /opt/app/src
ENV NODE_ENV=production


# RUN groupadd --gid 5000 ide-geek \
#     && useradd --home-dir /home/ide-geek --create-home --uid 5000 \
#     --gid 5000 --shell /bin/sh --skel /dev/null ide-geek

# RUN mkdir /app
# RUN chown -R ide-geek:ide-geek /app


RUN  apt-get update && apt-get install -y redis-server

COPY package.json ./

RUN npm install --no-optional && npm cache clean --force

# USER ide-geek

COPY . . 

EXPOSE $NODE_LOCAL_PORT

EXPOSE $NODE_DOCKER_PORT

CMD ["sh", "-c", "redis-server > /dev/null 2>&1 & npm start"]