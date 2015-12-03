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

var requestPayload = {
    "inidoneo" : "INIDONEO"
};

function getInidoneos(req,res,next) {
    soap.createClient(url, soapOptions, function(err,client) {
	client.recuperaCondenacoesPorInidoneo(requestPayload, function(err, result, body) {
	    parseXML(body, function(err, result) {
		var bdy = result["soap:Envelope"]["soap:Body"][0];
		var content = bdy["ns2:recuperaCondenacoesPorInidoneoResponse"][0]["return"][0];
		var array = JSON.stringify(content, null, 4).split('    ');
		var filtered = array.filter(function(elem){
		    return (elem.slice(0,9) === "<cpfCnpj>")
		}).map(function(elem){
		    var temp = elem.slice(9,-12);
		    return temp.replace(/[\/\-.]/g, '');
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

