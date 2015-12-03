var express = require('express');
var router = express.Router();

var http = require('http');
var doacao = require('./doacoes.js');
var tcu = require('./tcu_data.js');

var tokens = require('./tokens.js');

function pathCandidato(estado,cargo) {
    return '/api/v1/candidatos?estado=' + estado + '&cargo=' + cargo;
}

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

router.get('/',getCandidato);
router.get('/',doacao.getDoadores);
router.get('/',tcu.getInidoneos);
router.get('/',cruzarBases);

module.exports = router;
