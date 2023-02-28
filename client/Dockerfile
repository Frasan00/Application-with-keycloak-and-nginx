FROM node:latest
WORKDIR /app
COPY *.json .
RUN npm ci
COPY /src ./src
COPY /public ./public
EXPOSE 3000
CMD ["npm", "run", "start"]