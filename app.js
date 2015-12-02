//carregar requisitos de servidor
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//IP do banco de dados
var dbip = 'localhost'

//conectar com o banco de dados
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(dbip + ':27017/hackathon');

//carregar scripts de roteamento
var routes = require('./routes/index');
var users = require('./routes/users');

//instanciar o express
var app = express();

//configurar as views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//descomentar caso haja um ícone de página
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//configurar os logs do servidor
if (app.get('env') === 'development') {
    app.use(logger('dev'));
} else {
    app.use(logger('common'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//selecionar o diretório de conteúdo estático
app.use(express.static(path.join(__dirname, 'public')));

//TODO aqui: disponibilizar a DB pros pedidos

//selecionar a rota raiz
app.use('/', routes);
app.use('/users', users);

//erro 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//outros erros

// dev (stacktrace)
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//erros gerais
//configurar pra mostrar uma página mais legal
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;