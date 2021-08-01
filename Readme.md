# Full Stack - Decentralized toolkit

Este repositório servirá como apoio para prova de conceito de uma tese pessoal sobre a distribuição P2P de uma aplicação full stack moderna.

O projeto persiste em disponibilizar uma forma simples de criar, distribuir e manter qualquer aplicação arquitetada como web (backend + frontend) em ambiente P2P, ou seja, sem necessidade de um servidor central.

Minha principal motivação técnica é melhorar minha capacidade de pensar de forma descentralizada, validar meus conhecimentos de redes e programação em um projeto diferente e menos comum. Além de dar um passo em direção a democracia, pois acredito que será bom para a humanidade ter uma forma *simples, gratuita e segura* de distribuir suas ideias sem dependencias diretas a cooporações, tornando a dependencia algo opcional e não obrigatório.

De forma bem simples, quando o projeto estiver completo, quero que qualquer programador seja capaz de desenvolver seu próprio projeto P2P de forma simples. Ou seja, em um exemplo talvez não usual, você poderá desenvolver seu blog e mandar para um amigo que também poderá se tornar um nó.

Eu entendo que o blockchain funciona pois há motivação em manter-se como um nó, pois enquanto se trabalha para a rede, há retornos financeiros. Estou ciente de que minhas ideias até o momento não contemplam isso, pois acredito que isso fará mais sentido quando a primeira etapa for finalizada e a questão de armazenamento de dados entrar em vigor. À propósito, não tenho o intuito de prever todas os problemas e necessidades, meu objetivo também é aprender com o processo, então de fato estou aberto a sempre realizar às remodelagens necessarias afim de atingir o objetivo com maestria.
## Premissas

  - A aplicação deve ser construída para execução em *ambiente P2P*;
  - Deve ser possível que qualquer *frontend moderno* seja entregue, sendo que a entrega será dos *arquivos estáticos* (VueJS, React, Angular, etc);
  - Inicialmente o backend deverá ser construído na linguagem ainda a ser decidida, talvez Node ou Rust;
  - A modelagem do backend deve ser *simples e fácil para implementação de regras de negócio* específicas, desacoplado do core;
  - Todo o core deve possuir *testes automatizados*;

## Arquitetura

O Core do projeto fará a composição das regras básicas do funcionamento distribuido, por hora, suponho que as etapas abaixo contemplem a POC.

Backend fornecendo rotas publicas e privadas:

Públicas (disponíveis para o host e para a rede):

 - `GET /` -  Retorna o frontend 
 - `GET /download` - disponibiliza o pacote de distribuição - importante ser um binário unico completo
 - `GET /ip`-list - retorna todos os nós online

Privadas (disponíveis somente para o host):
 - `GET /sync` - executa o worker de sincronia dos nós
 - `POST /join` - incluir se como novo nó da rede

Uma ideia de como podem ser estruturados os diretórios:
```
 /
 /core
 /front/
       /index.html
       /app.js
       /style.css
 /api/
    /api.js
```

O diretório /front deve conter os arquivos estáticos do frontend, pois só serão entregues pelo servidor local. Não acho que seja uma boa ideia colocar a responsabilidade da build para este projeto, em vista de que as builds dos próprios frameworks já resolvem isso como maestria.

O diretório /api conterá o servidor local proprimente dito, com as rotas do negócio a ser construído.

O diretório /core conterá os arquivos responsáveis por todo o fluxo de funcionamento, sendo algo como:
 - Start do servidor web publico;
 - Start do servidor web privado com rotas da gestão local;
 - Start do worker de sincronia da rede;

Existem algumas coisas (muitas) que fogem do meu conhecimento ainda, por exemplo, como armazenaremos os dados de forma escalável? Talvez utilizando algum modelo de blockchain próprio ou até mesmo algum contrato ethereum?
Para inicio, estou considerando armazenar as informações da rede em gists publicos, somente para validar a ideia inicial, com o tempo evoluiremos isso, até por que não se tratará apenas dos dados do core.

Também acredito que será legal encontrarmos uma forma de rodar alguma serviço de DNS interno para resolução dos nós de forma 'amigável', não sei se é possível de forma descentralizada, em breve pesquisarei sobre.

Suponho que também possa ser um desafio a política de bloqueios de portas dos provedores de internet, mas sei que há formas de resolver isso, um belo exemplo de algo que faz isso é o ngrok.com, que 'converte' seu servidor local para um servidor com dns resolvido deles. Não me refiro aqui sobre o DNS dele, mas sim, por que realmente funciona sem restrições de portas dos provedores? Será que se eu abrir uma porta alta com um serviço web vai funcionar em qualquer lugar? Não há mesmo restrição por parte dos provedores de internet residencial? Talvez seja importante ter um recurso que teste a porta aberta e possa tentar outras portas de forma automática em caso de não funcionamento.

É importante que a execução seja simples, apenas um binário que sobe todos os serviços e torna o nó online. Rust ganha pontos aqui, mas deve ser possível fazer o mesmo com Node.

## TODO

Para a entrega dos recursos iniciais, vou utilizar um frontend básico que listará os nós, entregará o pacote binário para novos nós e, supostamente, validará a base dos recursos paralelos.

Frontend: VueJs
Backend e Core: NodeJs

Deixando claro que meu objetivo pós-MVP é fazer o core ser Rust e somente o backend ser Node para simplificar a expansão do projeto, pois acredito ser melhor permitir que as pessoas disponibilizem seus sistemas em Node do que em Rust, em vista de que há muito mais gente programando em Node atualmente.

Obviamente a organização de tudo se dará com o tempo, inicialmente vou manter tudo em um unico repositório para simplificar meu trabalho, mas no futuro acredito que será melhor separar, até mesmo para contar com ajuda de outros profissionais.

Atualmente, o pacote do frontend está em _frontend, sendo um diretório temporário só de exemplo. Ao fazer a build, ele popula o diretório frontend correto.

- [ ] Frontend Inicial de exemplo
- [ ] Backend Rotas publicas
- [ ] Modelagem do core

## Como contribuir

Se você caiu aqui do nada mas gostou de algo que leu, eu conto com sua ajuda para que projeto cresce, afinal, apesar de partir de mim, não é para mim e sim para todos. 

Há muitas formas de contribuir, pois tudo que temos está aqui e é pouco, documentação, design, testes, ideias, divulgação... Tudo é importante.

Até mesmo seu questionamento sobre o funcionamento me ajudará a ter mais clareza ainda nos meus objetivos, assim como suas ideias extras a fim de tornar o projeto melhor, então sinta-se livre para contribuir como tiver vontade.