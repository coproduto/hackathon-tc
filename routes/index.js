//rota base - carrega a página inicial

var express = require('express');
var router = express.Router();

/* GET página inicial */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NA LAMA' });
});

module.exports = router;
