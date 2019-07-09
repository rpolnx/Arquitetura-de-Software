FROM node:11-alpine
MAINTAINER rodrigorpogo@gmail.com

WORKDIR /usr/app
COPY package.json ./
COPY yarn.lock ./

RUN npm install yarn -g 
RUN yarn install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]