FROM node:16

WORKDIR /app
COPY . .

RUN cd _frontend && npm install
RUN cd _frontend && npm run build

RUN cd backend && npm install

WORKDIR /app/backend
EXPOSE 61635
ENTRYPOINT ["npm", "run", "start"]
