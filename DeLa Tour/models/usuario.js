'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
	nombre: String,
	correo: String,
	contrasenia: String,
	estatus: Number
});

module.exports = mongoose.model('Usuario', UsuarioSchema);