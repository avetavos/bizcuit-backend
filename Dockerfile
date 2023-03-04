FROM node:18-alpine

WORKDIR /

COPY package*.json ./
COPY .env ./

RUN yarn

COPY . .

ENV TZ Asia/Bangkok
ENV NODE_ENV production

RUN yarn run build

RUN rm -rf node_modules
RUN yarn

EXPOSE 8000

CMD ["yarn", "run", "start:prod"]