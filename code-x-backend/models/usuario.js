var mongoose= require('mongoose');
mongoose.set('useCreateIndex', true);
var esquema= new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: {
        type:String,
        trim:true,
        unique:true
    },
    password:String,
    genero:String,
    contenedor:{
        type:mongoose.SchemaTypes.Mixed,
        trim:true,
        unique:true,
        default:{}
    }
},{ minimize: false });

module.exports=mongoose.model('usuarios', esquema);