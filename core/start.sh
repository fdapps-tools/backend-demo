#!/bin/bash

##
## Este arquivo realiza a build do frontend do projeto e da play no backend
## Talvez possamos manter as regras do diretório _frontend e no futuro remover ele do repositório
## Assim funcionará o 'deploy' do mesmo jeito para qualquer aplicação
##

echo "Iniciando build do frontend"
cd ../_frontend
npm install
npm run build
cd ..

echo "Iniciando build do backend"
cd backend
npm install
npm start
