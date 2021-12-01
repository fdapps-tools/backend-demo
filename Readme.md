# Backend - Demo - fdApps Ecosystem 🕸️

# Architecture

I'm working to separate responsabilities as modules, each repository has your group of responsibility:

  * [Node-Manager](https://github.com/fdapps-tools/node-manager) - main tool to inject features on backend application:
    * Communication between nodes (express route injection);
    * Node Manager - add, del and updates nodes;
    * Node Consenso;
    * Setup tunneling for allow external access and node communication
  * [Backend](https://github.com/fdapps-tools/backend-demo) - Just backend demo injecting fdapps tools
  * [Frontend](https://github.com/fdapps-tools/frontend-demo) - Just frontend demo

There are some things that I haven't started to worry about in the big picture yet, like how can applications be able to store and manage their own data in a decentralized way?

# Setup

To run this project, you can follow this steps:

## With Docker

```bash
# Create local image
docker build . -t fd-apps-backend

# Run container with image created
docker run -d --name fdapps-node-1 fd-apps-backend
```

For include your container inner some network, set the env `NETWORK_NODE_URL`:

```bash
docker run -d --name fdapps-node-2 fd-apps-backend -e NETWORK_NODE_URL=https://myTunnelLink
```

## Without Docker - Pure NodeJS

```bash
cd app

# first node
npm install 
npm run start

# second node
export NODE_LIST_FILENAME=nodes.node2;\
export REQUEST_LIST_FILENAME=requests.node2;\
export NETWORK_NODE_URL=https://myTunnelLink;\
export PORT=61637;\
npm run start
```
