FROM node:12-alpine

WORKDIR /frontend
COPY frontend/. .

ENV REACT_APP_BASE_URL=https://climbinvest.herokuapp.com/

RUN npm install
RUN npm start

