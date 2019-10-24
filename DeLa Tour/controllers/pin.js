'use strict'

var Pin = require('../models/pin');

var controller = {
	
	savePin: function(req, res){
		var pin = new Pin();

        const { titulo, descripcion, coords: { latitud, longitud}, estatus } = req.body;
        
		pin.titulo = titulo;
		pin.descripcion = descripcion;
		pin.coords.latitud = latitud;
        pin.coords.longitud = longitud;
        pin.estatus = estatus;
        
        console.log(pin);

		pin.save((err, pinStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar.'});

			if(!pinStored) return res.status(404).send({message: 'No se ha podido guardar.'});

			return res.status(200).send({pin: pinStored});
		});
	},

	getPin: function(req, res){
		var pinId = req.params.id;

		if(pinId == null) return res.status(404).send({message: 'El punto no existe.'});

		Pin.findById(pinId, (err, pin) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!pin) return res.status(404).send({message: 'El pin no existe.'});

			return res.status(200).send({
				pin
			});

		});
	},

	getPines: function(req, res){

		Pin.find({}).exec((err, pines) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!pines) return res.status(404).send({message: 'No hay pines que mostrar.'});

			return res.status(200).send({pines});
		});

	},

	updatePin: function(req, res){
		var pinId = req.params.id;
		var update = req.body;

		Pin.findByIdAndUpdate(pinId, update, {new:true}, (err, pinUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!pinUpdated) return res.status(404).send({message: 'No existe el pin para actualizar'});

			return res.status(200).send({
				pin: pinUpdated
			});
		});

	},

	deletePin: function(req, res){
		var pinId = req.params.id;

		Pin.findByIdAndRemove(pinId, (err, pinRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el pin'});

			if(!pinRemoved) return res.status(404).send({message: "No se puede eliminar ese pin."});

			return res.status(200).send({
				pin: pinRemoved
			});
		});
	}

};

module.exports = controller;