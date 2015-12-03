var express = require('express');
var router = express.Router();

var http = require('http');
var tcu = require('./tcu_data.js');

var app_token = 'bDzoCXvsFPgq';

var tamanho_pagina = 10; 

function pathCandidato(estado,cargo) {
    return '/api/v1/candidatos?estado=' + estado + '&cargo=' + cargo;
}

function pathDoadores(id_candidato,ano) {
    return '/api/v1/candidatos/' + id_candidato + '/doadores?anoEleitoral=' + ano;
}

var options = {
    'hostname' : 'api.transparencia.org.br',
    'port' : 80,
    'method' : 'GET',
    'headers' : {
	'App-Token' : app_token
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

function getDoadores(req, res) {
    var opt = options;
    opt.path = pathDoadores(req.candidato.id,req.query.ano);
    console.log('path doadores: ' + opt.path);

    var request = http.request(opt, function(response) {
	var retorno = '';

	response.on('data', function(ret) {
	    retorno += ret;
	});

	response.on('end', function(ret) {
	    req.doadores = JSON.parse(retorno);
	    res.json( {
		"candidato" : req.candidato,
		"doadores" : req.doadores
	    });
	});
    });

    request.end();
};

router.get('/',getCandidato);
router.get('/',getDoadores);
    

module.exports = router;
