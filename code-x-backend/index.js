var express = require('express');
var bodyParser=require('body-parser')
var cors = require('cors');
//var testModule=require('./modules/test-module');
var usuariosRouter=require('./routes/usuarios-router');
var database =require('./modules/database');
var app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/usuarios', usuariosRouter);


app.get('/',function(req,res){
    res.send('servidor backend en linea');
});

app.listen(3000,function(){
    console.log('Servidor Levantado')
});