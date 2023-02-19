FROM node:18-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm i -f
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
