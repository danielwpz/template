FROM node:8-alpine

WORKDIR /usr/src

# Install packages first,
# this will make best use of cache
COPY package.json .
RUN npm install
RUN npm install -g pm2

COPY . .

ARG port
EXPOSE $port

CMD ["pm2-docker", "app.js"]