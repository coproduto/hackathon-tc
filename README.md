# NaLama

Programa criado para o Hackathon dos Tribunais de Contas da União.

---

O NaLama é um aplicativo web criado para incentivar a auditoria cidadã da política, especificamente no que tange às doações de campanha.

O aplicativo cruza dados do Tribunal de Contas da União, dos Tribunais de Contas dos Estados, e da ONG Transparência Brasil para criar uma figura geral das doações de campanha de cada candidato, relacionar essas informações com licitações concedidas a pessoas (físicas ou jurídicas) que tenham feito contribuições às campanhas, e apresentar esses dados de forma facilmente compreensível. 
Adicionalmente, o aplicativo torna possível determinar se o candidato recebeu doações de pessoas determinadas como inidôneas pelo Tribunal de Contas.

---

#Documentação para desenvolvedores

O NaLama é um programa Open Source. Encorajamos que qualquer cidadão interessado use, modifique, melhore ou se baseie no código do NaLama para criar seu próprio aplicativo.

##Requisitos

O NaLama é construído sobre a plataforma Node.JS. Para instruções de como instalar o Node.JS, veja [neste link](http://nodebr.com/instalando-node-js-atraves-do-gerenciador-de-pacotes/).

Com o Node instalado, copie o código do NaLama a partir deste repositório, e dentro da pasta do código, rode o seguinte comando:

`npm install`

As dependências do NaLama serão instaladas. A partir daí, você pode iniciar o servidor do NaLama usando o comando:

`npm start`

##Modificando o código

O NaLama utiliza o framework [express.js](http://expressjs.com/en/index.html). É necessário ter um conhecimento básico da estrutura de uma aplicação construída com esse framework para modificar o código do NaLama.

Em geral, para modificar o NaLama, é necessário criar uma nova rota (no express.js, rotas são sequências de operações a serem executadas pelo servidor) e criar novas operações associadas a essa rota no front-end. As rotas são definidas na pasta `routes`, e o front-end na pasta `views`. Para modificar os arquivos contidos nessas pastas, observe o padrão seguido pelos arquivos já existentes e siga as orientações dos comentários nesses artigos.

Em caso de dúvidas, você também pode me contatar no email [cstl.px@gmail.com](mailto://cstl.px@gmail.com).

Happy hacking!