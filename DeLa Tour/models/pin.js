'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PinSchema = Schema({
	titulo: String,
	descripcion: String,
	coords: {latitud: Number, longitud: Number},
	estatus: Number,
	imagen: String 
});

module.exports = mongoose.model('Pin', PinSchema);