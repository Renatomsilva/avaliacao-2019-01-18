FROM node:10.15.0-jessie

RUN mkdir /opt/avaliacao

WORKDIR /opt/avaliacao

COPY package.json .

RUN npm install

COPY ./app ./app

ENV NODE_ENV=development
ENV DB_HOST=mysql
ENV DB_USER=root
ENV DB_PASS=mysql
ENV DB_NAME=avaliacao
ENV PORT=4000
ENV DB_CONNECTION_LIMIT=10

EXPOSE 4000

EXPOSE 5858

CMD ["node", "--inspect=5858","./app/server.js"]
