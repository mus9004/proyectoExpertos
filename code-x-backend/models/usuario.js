var mongoose= require('mongoose');
mongoose.set('useCreateIndex', true);
var esquema= new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: {
        type:String,
        trim:true,

    },
    password:String,
    genero:String,
    contenedor:{
        type:mongoose.SchemaTypes.Mixed,
        trim:true,
        default:{}
    },
    proyectos:{
        type:mongoose.SchemaTypes.Mixed,
        trim:true,
        default:{}
    },
    snippet:{
        type:String,
        trim:true,
        default:""
    },
    cantidadProtectos:String
},{ minimize: false });

module.exports=mongoose.model('usuarios', esquema);