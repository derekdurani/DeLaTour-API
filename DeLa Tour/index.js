'use strict'

//Variable de instanciación de mongoose para la conexión a BD
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

//Promesa de JavaScript
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/DeLaTour')
        .then(() => {
        	console.log("Conexión a la base de datos establecida satisfactoriamente...");

        	// Creacion del servidor
        	app.listen(port, () => {
        		console.log("Servidor corriendo correctamente en la url: localhost:3700");
        	});

        })
        .catch(err => console.log(err));