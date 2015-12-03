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

---

#Documentação do cliente

Para consultar a API REST implementada pelo servidor do NaLama, existem 2 métodos:

A partir de agora, considere que [servidor] refere-se ao endereço do servidor.

*Formato da requisição*: [servidor]/método?param1=valor&param2=valor&param3...

##Método "Candidatos"

**Pedido**: HTTP GET '[servidor]/candidatos'

**Parâmetros**: 
  **estado**: sigla da UF do candidato desejado. Exemplos: PE, RJ, SP
  **cargo**: cargo ao qual o candidato se candidatou:
    1 = presidente,
    2 = vice-presidente,
    3 = governador,
    4 = vice-governador,
    5 = senador,
    6 = deputado federal,
    7 = deputado estadual,
    8 = deputado distrital
    **ano**: ano da eleição
    
 **Retorno**:
  ```
   { "candidato" : 
     { "id" : string,
       "nome" : string,
       "numero" : string,
       "titulo" : string,
       "matricula" : string,
       "cargo" : string,
       "estado" : string,
       "partido" : string,
       "ocupacao" : string,
       "miniBio" : string,
       "cargos" : string,
       "reeleicao" : bool,
       "foto" : string,
       "casaAtual" : string,
       "previsao" : string,
       "bancadas" : string
     },
     "doacoes" :
     [{ "nome" : string,
        "cgc" : string, //CPF ou CNPJ
        "montante" : string
     }],
     "doadores_inidoneos" :
     [ string ] //lista de CPFs ou CNPJs
  }
 ```
 
 ##Método "Licitações"
 
**Pedido**: HTTP GET '[servidor]/licitacoes'

**Parâmetros**:
  **cnpj**: CPF ou CNPJ da pessoa física ou jurídica cujas licitações devem ser buscadas
 
 **Retorno**:
 ```
  { "licitacoes" :
    [{ 
     "TOTALADJUDICADOLICITACAO" : string,
     "RAZAOSOCIAL" : string,
     "NOMENATUREZA" : string,
     "RESULTADOHABILITACAO" : string,
     "NUMERODOCUMENTOAJUSTADO" : string, //cpf ou cnpj
     "CODIGOUG" : string, //unidade gestora
     "TOTALADJUDICADOLICITANTE" : string, //valor da licitação
     "ESTAGIOLICITACAO" : string,
     "NUMEROMODALIDADE" : string,
     "DATAPUBLICACAOHOMOLOGACAO" : string,
     "ESPECIFICACAOOBJETO" : string,
     "QTDELICITANTES" : string,
     "SITUACAOLICITACAO" : string,
     "ANOMODALIDADE" : string,
     "ADJUDICADA" : string,
     "DESCRICAOOBJETO" : string,
     "CODIGOPL" : string,
     "NOMEMODALIDADE" : string
    }]
  }
 ```
  
Em caso de dúvidas, você também pode me contatar no email [cstl.px@gmail.com](mailto://cstl.px@gmail.com).
    
