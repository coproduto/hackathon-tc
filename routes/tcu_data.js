//rota para obter dados abertos do TCU
//inclui um processo de extração de dados do XML retornado do SOAP

var soap = require('soap'); //para consumir dados SOAP
var parseXML = require('xml2js').parseString; //para transformar XML em JS

var url = 'http://contas.tcu.gov.br/encclaWebServiceWeb/web/externo/enccla.wsdl';
var ws  = 'http://ws.enccla.tcu.gov.br/'

//opções necessárias para que os namespaces XML sejam corretamente aplicados ao pedido
var soapOptions = {
    ignoredNamespaces: {
	'namespaces': ['targetNamespace', 'typedNamespace'],
	'override': true
    }
}

//opções da busca
var requestPayload = {
    "inidoneo" : "INIDONEO"
};

function getInidoneos(req,res,next) {
    soap.createClient(url, soapOptions, function(err,client) { //criar cliente para pedido SOAP
	client.recuperaCondenacoesPorInidoneo(requestPayload, function(err, result, body) { //realizar pedido de condenações
	    parseXML(body, function(err, result) { //converter (parcialmente) o XML em JSON
		var bdy = result["soap:Envelope"]["soap:Body"][0]; //consumir parte dos dados supérfluos 
		var content = bdy["ns2:recuperaCondenacoesPorInidoneoResponse"][0]["return"][0]; //consumir o resto dos dados supérfluos
		var array = JSON.stringify(content, null, 4).split('    '); //transformar os dados não-convertidos em array
		var filtered = array.filter(function(elem){ 
		    return (elem.slice(0,9) === "<cpfCnpj>") //identificar os elementos da array que representam CPF/CNPJ
		}).map(function(elem){ 
		    var temp = elem.slice(9,-12); //remover as tags XML dos elementos
		    return temp.replace(/[\/\-.]/g, ''); //normalizar os CPFs/CNPJs removendo caracteres especiais
		});
		req.inidoneos = filtered;
		next();
	    });

	});
    });
};

tcu = {
    "getInidoneos" : getInidoneos
};

module.exports = tcu;

