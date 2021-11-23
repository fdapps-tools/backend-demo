# Backend - Main Project - fdApps Ecosystem

## Warning - This is a proof of concept project, is not can be usage yet! 👨‍💻 👨‍💻

The project goal is allow full projects run in own network nodes as P2P application on easly mode, (like framework) to make your fully decentralized modern application as peer to peer (without center server needed)

My main tech motivation is improve myself about decentralization concepts and limitations, and can to use my other knowledges, like networks, linux and development skills.

I want that any developer can be insert this tools on your application and done! Your application can be decentralized.

Has some limitations about this goal, I understand. But I'm solving this with alternatives and doing documentation for improving each part. Is probably that on the future, our limitations about network there are smaller, I'll learning more and who know any genius guy can be help us.

# Premises

  - Application fully run on *P2P enviroment* - Offile just if last Node to down;
  - It must be possible that any *modern frontend* (VueJS, React, Angular, etc) can be delivery;
  - The components are modularized, as tools for easy maintable and not language blocked;
  - Need *automatized tests* for all;
  - Remove all that's possible about centralized resources;

# Architecture

I'm working to separate responsabilities as modules, each repository has your group of responsibility:

  * [Node-Manager](https://github.com/fdapps-tools/node-manager) - main tool to inject features on backend application:
    * Communication between nodes (express route injection);
    * Node Manager - add, del and updates nodes;
    * Node Consenso;
  * [Tunneling](https://github.com/fdapps-tools/tunneling):
    * Setup tunneling for allow external access and node communication
  * [Backend](https://github.com/fdapps-tools/backend) - Just backend demo injecting fdapps tools
  * [Frontend](https://github.com/fdapps-tools/frontend-demo) - Just frontend demo

There are some things that I haven't started to worry about in the big picture yet, like how can applications be able to store and manage their own data in a decentralized way?

I think we can try to do something using blockchain like BSC or ethereum in the future. But for now, I'm more concerned with making the starter tools very functional and secure.

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
# first node
npm install 
npm run start

# second node
export NODE_LIST_FILENAME=nodes.node2;\
export REQUEST_LIST_FILENAME=requests.node2;\
export NETWORK_NODE_URL=https://myTunnelLink;\
npm run start
```


# How to contribute
If you fell here out of nowhere but liked something you've read, I'm counting on your help for the project to grow, after all, despite starting from me, it's not for me, but for everyone.

There are many ways to contribute, because everything we have is here and there is little, documentation, design, tests, ideas, dissemination... Everything is important.

Even your questioning about how it works will help me to be even more clear on my goals, as well as your extra ideas on how to make the project better, so feel free to contribute as you like.

# Video log - Portuguese 🇧🇷 only

* [O que é o projeto](https://youtu.be/-lsOf4jt0uU)
* [Organização em módulos](https://youtu.be/MfGx5LEpkV4)

## Histórico de vídeos (qualidade inferior)

* 03/08/2021: [Vídeo Introdutório ](https://youtu.be/qupPVPxfx34)
* 11/08/2021: [LocalTunnel no Node ](https://youtu.be/8i_8c3OMiSU)
* 12/08/2021: [Join e Lista de Nós ](https://youtu.be/maxyYvEmpqQ)
* 12/08/2021: [Up com Docker ](https://youtu.be/kbGJeM2LErU)
* 13/08/2021: [Join do nó e reflexões sobre a arquitetura do core ](https://youtu.be/f_Uc025QrHc)
* 16/08/2021: [Remoção do gist, sync do Join e reflexões sobre concenso ](https://www.youtube.com/watch?v=H25itj5PEYU)
* 18/08/2021: [Organizando libs ](https://www.youtube.com/watch?v=eMCw0at0txc)
* 23/08/2021: [Video sem Descrição](https://www.youtube.com/watch?v=OlcZiBX3NIQ)
