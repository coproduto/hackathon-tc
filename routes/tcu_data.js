var soap = require('soap');
var parseXML = require('xml2js').parseString;

var url = 'http://contas.tcu.gov.br/encclaWebServiceWeb/web/externo/enccla.wsdl';
var ws  = 'http://ws.enccla.tcu.gov.br/'

var soapOptions = {
    ignoredNamespaces: {
	'namespaces': ['targetNamespace', 'typedNamespace'],
	'override': true
    }
}


