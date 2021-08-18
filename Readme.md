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
 - `GET /nodes` - retorna todos os nós online

Privadas (disponíveis somente para o host):
 - `GET /sync` - executa o worker de sincronia dos nós
 - `POST /join` - incluir se como novo nó da rede

Uma ideia de como podem ser estruturados os diretórios:
```
 /
 /core/start.sh
 /front/
       /index.html
       /app.js
       /style.css
 /api/
    /app.js
```

O diretório /front deve conter os arquivos estáticos do frontend, pois só serão entregues pelo servidor local. Não acho que seja uma boa ideia colocar a responsabilidade da build para este projeto, em vista de que as builds dos próprios frameworks já resolvem isso como maestria.

O diretório /api conterá o servidor local proprimente dito, com as rotas do negócio a ser construído, assim como a entrega do frontend.

O diretório /core conterá os arquivos responsáveis por todo o fluxo de funcionamento, sendo algo como:
 - Start do servidor web publico;
 - Start do servidor web privado com rotas da gestão local;
 - Start do worker de sincronia da rede;

Por hora, o /core contém um simples script que faz a build do frontend e dá play no backend, tornando online o site básico.

Existem algumas coisas (muitas) que fogem do meu conhecimento ainda, por exemplo, como armazenaremos os dados de forma escalável? Talvez utilizando algum modelo de blockchain próprio ou até mesmo algum contrato ethereum?
Para inicio, estou considerando armazenar as informações da rede em gists publicos, somente para validar a ideia inicial, com o tempo evoluiremos isso, até por que não se tratará apenas dos dados do core.

É importante que a execução seja simples, apenas um binário que sobe todos os serviços e torna o nó online. Rust ganha pontos aqui, mas deve ser possível fazer o mesmo com Node.

### Tunelamento 

Isso foi um desafio no primeiro momento, vou descrever o que compreendi até o momento, posso estar errado mas resolvi temporariamente.

Quando batemos em uma porta de IP publico de um provedor de internet, o roteador não possui rotas para saber para ondem redirecionar o acesso, além de possuir portas fechadas.

Não quero incluir a complexidade do usuário ter que fazer configuração em seu equipamento, a solução que encontrei foi com tuneis. Pelo que entendi, o serviço mantém uma conexão como uma VPN com um servidor que faz o proxy do acesso direto pra ele. Isso parece resolver, mas coloca um ponto crítico que é ter a necessidade desse servidor fazer o proxy, tirando parte da descentralização completa, que é meu objetivo.

Uma alternativa funcional por hora, é utilizar um desses serviços (ngrok, localtunnel, etc) de forma escalada, ou seja, ter um conjunto de possibilidades e alternar entre elas.

No momento isso está sendo feito com o localtunnel apenas e funciona, pretendo melhorar essa implementação e modelar para que fique flexível alternar.

De certa forma isso esta 'resolvendo' o DNS também, mas é importante retomar o tópico de DNS no futuro.

### O estado - State

Remover do gist fez eu perceber que cada nó precisa de uma cópia dos dados da rede, como um estado global.
Por agora, estou guardando jsons no diretório localDB e farei um esquema de broadcast para que todos mantenham-se iguais.
Acredito que isso vá elovuir para uma classe mais completa e posso aproveitar conhecimentos da arquitetura flux de frontend.
Uma classe responsável por entregar os dados do estado global, inserir, remover e atualizar. De forma abstraida para que a mudança de arquivos texto para algum banco de dados sejam menos dolorosa no futuro.

E o detalhe é que só estamos falando do estado da rede em sí, da consistência e confiança dos nós, nada sobre os dados descentralizados para a aplicação de fato.

### Concenso distribuido e garantia entre nós

Como garantir que os nós sejam confiáveis entre sí?

Não estou pensando nos dados ainda, apenas na distribuição da aplicação. O que fará um novo nó ser confiável perante a rede?
Pensando nisso, por que não armazenar às informações de nós localmente em cada nó e, a cada mudança, haja um broadcast para que todos tenham os dados dentro de sí mesmo?

Estou considerando fazer algo neste sentido:

Primeiro nó possui apenas sí próprio na rede.
Quando outro host quiser se tornar um nó, ele vai enviar um pedido de subscrição para o primeiro nó (N1).
N1 recebe o pedido de subscrição assinado com a chave publica do futuro N2 e um hash do seu código atual.
Após a validação (que na próxima vez não pode depender somente do N1), o N1 enviará ao N2 que tudo bem, ele pode ser um nó.
N1 também fará um broadcast para todos com a atualição do novo nó, pois ele é um nó confiável e pode fazer isso.

Somente um nó já validado poderá fazer o broadcast. Broadcast este conterá o registro de aceites dos demais % da rede.

Quando um novo host que vier do código fonte original e não de um nó, quiser entrar para uma rede? Basta ele inicializar-se com o link de algum nó valido. Inclusive isso permitirá até manter um unico nó com um IP fixo para que a rede sempre possa ser reconstituida caso os nós livres saiam.

Esta bem modelado na minha cabeça, parece ser possível com as informações atuais que tenho mas ainda preciso aprender mais para poder simplificar o processo.

Seria legal ter algum esquema de filas tipo zeroMQ, sqs, redis para esse processamento do concenso.


Caso 1: Primeiro nó da rede, não há outro para se referenciar. Começa do zero, se auto define como nó.
Caso 2: Há rede para referenciar definida no ambiente como `NETWORK_NODE_URL`, começa o processo de pedido para ser nó.

* Faz uma requisição para o nó informado;
* Nó inclui a requisição em uma lista para ser validado;
* Cron do nó atribui sua verificação no nó;
* Nó faz broadcast com outros nós para ter mais aprovações;
* Último nó a aprovar, inclui o novo host como nó e informa para os outros.

### Atualização entre nós

Caso seja necessário lançar um bugfix na rede ou alguma nova versão, como isso aconteceria?
### Processamento remunerado

É importante pensar nisso mas ainda não sei como um nó pode ter remuneração para manter-se um nó. 

## TODO

Para a entrega dos recursos iniciais, vou utilizar um frontend básico que listará os nós, entregará o pacote binário para novos nós e, supostamente, validará a base dos recursos paralelos.

Frontend: VueJs
Backend e Core: NodeJs

Deixando claro que meu objetivo pós-MVP é fazer o core ser Rust e somente o backend ser Node para simplificar a expansão do projeto, pois acredito ser melhor permitir que as pessoas disponibilizem seus sistemas em Node do que em Rust, em vista de que há muito mais gente programando em Node atualmente.

Obviamente a organização de tudo se dará com o tempo, inicialmente vou manter tudo em um unico repositório para simplificar meu trabalho, mas no futuro acredito que será melhor separar, até mesmo para contar com ajuda de outros profissionais.

Atualmente, o pacote do frontend está em _frontend, sendo um diretório temporário só de exemplo. Ao fazer a build, ele popula o diretório frontend correto.

- [x] Frontend Inicial de exemplo
- [x] Backend Entrega do frontend
- [x] Backend criando tunnel + Rota /stats
- [x] Backend rota /join para tornar-se um nó
- [x] Backend rota /nodes para listar os nós
- [x] Provisionar com Docker
- [x] Backend rota /sync para validar os nós
- [x] Repensar sistema de nós sem utilização do gist
- [x] Finalizar syncJoinRequests
- [ ] Broadcast para a rede?
- [ ] Escrever tests
- [ ] Planejar validações com chaves publicas e privadas dos nós
- [ ] Melhorar setup para trabalho local
- [ ] Como o core pode ficar avulso à aplicação?
- [ ] Revogar meu token gitHub antes de tornar projeto publico
- [ ] Atualizar Readme

## Setup

Para rodar o projeto você pode executar o start.sh dentro de core ou rodar com o docker:

```
## Cria a imagem
docker build . -t p2p-toolkit

## Cria o container com a imagem
docker run -d --name myp2pdemo p2p-demo

## Verifica os logs
docker logs myp2pdemo --tail 5 -f
```

Caso queira dar join em uma rede, é necessário informar o host através da variável de ambiente `NETWORK_NODE_URL`:

```
docker run -d --name myp2pdemo p2p-demo -e NETWORK_NODE_URL=linkdotuneldoNó
```

Ou, se for com o node:

```
export NETWORK_NODE_URL=linkdotuneldoNó; npm run start
```

## Como contribuir

Se você caiu aqui do nada mas gostou de algo que leu, eu conto com sua ajuda para que projeto cresce, afinal, apesar de partir de mim, não é para mim e sim para todos. 

Há muitas formas de contribuir, pois tudo que temos está aqui e é pouco, documentação, design, testes, ideias, divulgação... Tudo é importante.

Até mesmo seu questionamento sobre o funcionamento me ajudará a ter mais clareza ainda nos meus objetivos, assim como suas ideias extras a fim de tornar o projeto melhor, então sinta-se livre para contribuir como tiver vontade.

## Registros em vídeo

03/08/2021: Vídeo Introdutório https://youtu.be/qupPVPxfx34

11/08/2021: LocalTunnel no Node https://youtu.be/8i_8c3OMiSU

12/08/2021: Join e Lista de Nós https://youtu.be/maxyYvEmpqQ

12/08/2021: Up com Docker https://youtu.be/kbGJeM2LErU

13/08/2021: Join do nó e reflexões sobre a arquitetura do core https://youtu.be/f_Uc025QrHc

16/08/2021: Remoção do gist, sync do Join e reflexões sobre concenso

18/08/2021: Organizando libs https://youtu.be/H25itj5PEYU