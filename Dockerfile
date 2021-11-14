FROM node:alpine

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

# USER ide-geek

RUN useradd -u 8877 ide-geek

COPY . . 

EXPOSE 6379

EXPOSE 8000

CMD ["sh", "-c", "redis-server > /dev/null 2>&1 & npm start"]