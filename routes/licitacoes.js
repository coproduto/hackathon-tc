var express = require('express');
var router = express.Router();

var http = require('http');

function pathLicitacao(cnpj) {
    return '/DadosAbertos/LicitacoesDetalhes!json?NUMERODOCUMENTOAJUSTADO=' + cnpj;
}

var options = {
    'hostname' : 'sistemas.tce.pe.gov.br',
    'port' : 80,
    'method' : 'GET',
};

function getLicitacoes(req, res, next) {
    var opt = options;
    opt.path = pathLicitacao(req.query.cnpj);
    res.charset = 'utf8';

    var request = http.request(opt, function(response) {
	response.setEncoding('utf8');

	var retorno = '';

	response.on('data', function(ret) {
	    retorno += ret;
	});

	response.on('end', function(ret) {
	    var licit = JSON.parse(retorno)
	    req.licitacoes = licit.resposta.conteudo;
	    next();
	});
    });

    request.end();
};

function filtrarDataLicitacoes(req, res) {
    var licitacoes = req.licitacoes;

    //talvez filtrar as licitações aqui
    res.json({
	"licitacoes" : licitacoes
    });
};

router.get('/',getLicitacoes);
router.get('/',filtrarDataLicitacoes);

module.exports = router;
