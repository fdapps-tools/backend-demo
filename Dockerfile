## Building frontend
FROM node:16 as build-stage

WORKDIR /app
RUN git clone https://github.com/fdapps-tools/frontend-demo.git .
RUN npm install
RUN npm run build

## Building backend 
FROM node:16
WORKDIR /app
COPY --from=build-stage /app/dist /app/frontend

COPY ./app/* ./
RUN npm install

EXPOSE 61635
ENTRYPOINT ["npm", "run", "start"]
