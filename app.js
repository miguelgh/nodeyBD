var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//se agrega la dependencia dotenv
require('dotenv').config();

//guarda en la variable pool el acceso a la base de datos creada en models
var pool = require('./models/bd');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Prueba de select
//en resultados guarda la petición
pool.query('select * from empleados').then(function(resultados){
  console.log(resultados);
});

//INSERT
//Se crea una variable objeto para guardar los datos a insertar
//el id no se coloca porque es autoincrementado
// var obj ={
//   nombre: 'Juan',
//   apellido: 'Lopez',
//   trabajo: 'docente',
//   edad: '38',
//   salario: 1500,
//   email: 'juanlopez@bignet.com'
// }

// pool.query('insert into empleados set ?', [obj]).then(function(resultados){
//   console.log(resultados);
// });

//UPDATE
//se crea la variable id para asignarle el id correspondiente a modificar
// var id = 23;
// var obj = {
//   nombre: 'Pablo',
//   apellido: 'Gomez'
// }
// pool.query('update empleados set ? where id_emp=?', [obj, id]).then(function(resultados){
//   console.log(resultados);
// });

//BORRAR
var id = 24;
pool.query('delete from empleados where id_emp=?', [id]).then(function(resultados){
  console.log(resultados);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
