
var express =require('express');
var router = express.Router();
usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
//const verifyToken = require('./verificarToken');
const secret= 'expertos912';
//const verificarToken = require('./verificarToken')
var usuarios=[];

//crear usuario
router.post('/', function(req, res) {
    
    let u=new usuario(
        {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password),
            genero: req.body.genero,
            contenedor:req.body.contenedor,
            proyectos:req.body.proyectos,
            snippet:req.body.snippet
        }
    )  
    
    u.save().then(result=>{
        res.send(result)
        res.end();
    }).catch(error=>{
        res.send(error)
        res.end();
    });

})
//obtener usuario por correo
router.post('/log/',function(req,res){
    usuario.find({email: req.body.email}).then(result=>{
        const resultPassword= bcrypt.compareSync(req.body.password, result[0].password);
        if (resultPassword) {
            const token  =jwt.sign({id : usuario._id},secret,{expiresIn: 60 * 60 * 24})
            console.log(result)
            res.send({resul: resultPassword,token:token,id:result[0]._id});
            res.end();
        }else {
            res.send({resul: false,token:null });
            res.end();
        }
    }).catch(error=>{
        res.send(error);
        res.end();
    })
});

//obtener usuario
router.get('/:id',function(req,res){
    usuario.find({_id: req.params.id}).then(result=>{
        res.send(result[0]);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
});


//obtener usuarios
router.get('/',function(req,res){
    usuario.find().then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
    
});

//actualizar usuario
router.post('/:id',function(req,res){
    usuario.updateOne(
        {
            _id:req.params.id
        },
        {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password),
            genero:req.body.genero
           
        }
    ).then(result=>{
        res.send(result);
        res.end;
    }).catch(error=>{
        res.send(error);
        res.end;
    });
    
});

//actualizar contenedor
router.put('/update/:id',function(req,res){
    usuario.updateOne(
        { _id:req.params.id }, 
        {
            contenedor:req.body.contenedor,
            proyectos:req.body.proyectos,
            snippet:req.body.snippet 
        }
    ).then(result=>{
        res.send(result);
        res.end;
    }).catch(error=>{
        res.send(error);
        res.end;
    });
    
});



/*router.route("/update").put(function(req, res) {
    details.updateOne(
        { _id:req.body._id },
        { $addToSet: { 
            nombre:req.body.nombre,
            apellido: req.body.apellido,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password),
            genero: req.body.genero,
            contenedor:req.body.contenedor
        } },
        function(err, result) {
            if (err) {
                res.send('error :',err);
            } else {
                res.send("estado :",result);
            }
        }
    );
});*/


router.put('/update/:id',function(req,res){
    usuario.update(
        {
            _id:req.params.id
        },
        { $addToSet:{
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password),
            genero: req.body.genero,
            contenedor:req.body.contenedor,
            proyectos:req.body.proyectos  
        }}
    ).then(result=>{
        console.log(result);
        res.send(result);
        res.end;
    }).catch(error=>{
        console.log(result);
        res.send(error);
        res.end;
    });
    
});

router.delete('/:id',function(req,res){
    usuario.remove({
        _id:req.params.id
    }).then(result=>{
        res.send(result);
        res.end;
    }).catch(error=>{
        res.send(error);
        res.end;
    });
});

module.exports=router;