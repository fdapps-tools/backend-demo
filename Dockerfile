FROM node:16

WORKDIR /app

RUN git clone https://github.com/fdapps-tools/frontend-demo.git _frontend
RUN cd _frontend && npm install
RUN cd _frontend && npm run build

WORKDIR /app

COPY . .
RUN cd /app/backend && npm install

WORKDIR /app/backend
EXPOSE 61635
ENTRYPOINT ["npm", "run", "start"]
