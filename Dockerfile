FROM node:8.9.0-alpine

WORKDIR /usr/src

# Install packages first,
# this will make best use of cache
COPY package.json .
RUN npm install

COPY . .

ARG port
EXPOSE $port

ENV NODE_ENV production

CMD ["npm", "run", "start:docker"]