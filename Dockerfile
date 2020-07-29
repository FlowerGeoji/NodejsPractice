FROM node:12

WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install

COPY ./build/js/bundle.js .
EXPOSE 3000

CMD [ "node", "bundle.js"]