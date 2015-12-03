//rota geral de pedidos sobre candidatos

var express = require('express');
var router = express.Router();

var http = require('http');
var doacao = require('./doacoes.js'); //para carregar dados de doações da Transparência Brasil
var tcu = require('./tcu_data.js');   //carregar dados de inidoneidade do TCU

var tokens = require('./tokens.js');  //tokens necessários para as APIs

//constroi a URL para requisitar candidatos à API da Transparência Brasil
function pathCandidato(estado,cargo) {
    return '/api/v1/candidatos?estado=' + estado + '&cargo=' + cargo;
}

//opções do pedido HTTP GET
var options = {
    'hostname' : 'api.transparencia.org.br',
    'port' : 80,
    'method' : 'GET',
    'headers' : {
	'App-Token' : tokens.app_token
    }
};

function getCandidato(req, res, next) {
    var opt = options;
    opt.path = pathCandidato(req.query.estado, req.query.cargo);

    var request = http.request(opt, function(response) {
	var retorno = '';

	response.on('data',function(ret) {
	    retorno += ret;
	});

	response.on('end',function(ret) {
	    req.candidato = JSON.parse(retorno)[0];
	    next();
	});
    });

    request.end();
};

//cruza as informações das bases de dados da Transparência Brasil e do TCU para obter doações de inidôneos
function cruzarBases(req, res) {
    var doacoes = req.doadores;
    var inid = req.inidoneos;

    doacoes = doacoes.filter(function(elem) {
	return ((inid.indexOf(elem.cgc)) > -1)
    });

    res.json({
	"candidato" : req.candidato,
	"doacoes" : req.doadores,
	"doadores_inidoneos" : doacoes
    });
};

//rota completa dos pedidos de candidato: (execução de cima para baixo)
router.get('/',getCandidato);
router.get('/',doacao.getDoadores);
router.get('/',tcu.getInidoneos);
router.get('/',cruzarBases);

module.exports = router;
