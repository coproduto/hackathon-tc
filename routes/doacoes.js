//rota utilizada pela rota de candidatos para carregar os registros de doações da Transparência Brasil

var tokens = require('./tokens.js'); //tokens necessários para as APIs
var http = require('http');

//opções do pedido HTTP GET
var options = {
    'hostname' : 'api.transparencia.org.br',
    'port' : 80,
    'method' : 'GET',
    'headers' : {
	'App-Token' : tokens.app_token
    }
};

//constroi a URL para requisitar doadores à API da Transparencia Brasil
function pathDoadores(id_candidato,ano) {
    return '/api/v1/candidatos/' + id_candidato + '/doadores?anoEleitoral=' + ano;
}

function getDoadores(req, res, next) {
    var opt = options;
    opt.path = pathDoadores(req.candidato.id,req.query.ano);

    var request = http.request(opt, function(response) {
	var retorno = '';

	response.on('data', function(ret) {
	    retorno += ret;
	});

	response.on('end', function(ret) {
	    req.doadores = JSON.parse(retorno);
	    console.log(req.doadores);
	    next();
	});
    });

    request.end();
};

var doadores = {
    "getDoadores" : getDoadores
};

module.exports = doadores;
