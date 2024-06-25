FROM node:22.3.0

RUN mkdir -p /home/app

WORKDIR /home/app

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
