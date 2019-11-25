"use strict";

var Pin = require("../models/pin");

var controller = {
  savePin: function(req, res) {
    var pin = new Pin();

    const {
      titulo,
      descripcion,
      coords: { latitud, longitud },
      estatus,
      imagen
    } = req.body;

    pin.titulo = titulo;
    pin.descripcion = descripcion;
    pin.coords.latitud = latitud;
    pin.coords.longitud = longitud;
    pin.estatus = estatus;
    pin.imagen = imagen;


    console.log(pin);

    pin.save((err, pinStored) => {
      if (err) return res.status(500).send({ message: "Error al guardar." });

      if (!pinStored)
        return res.status(404).send({ message: "No se ha podido guardar." });

      return res.status(200).send({ pin: pinStored });
    });
  },

  getPin: function(req, res) {
    var pinId = req.params.id;

    if (pinId == null)
      return res.status(404).send({ message: "El punto no existe." });

    Pin.findById(pinId, (err, pin) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al devolver los datos." });

      if (!pin) return res.status(404).send({ message: "El pin no existe." });

      return res.status(200).send(
        pin
      );
    });
  },

  getPinNombre: function(req,res){

		var tituloPin = req.body.titulo;
		
		if(tituloPin == null) return res.status(404).send({message: 'El punto no existe'});
		Pin.find({titulo:tituloPin}).exec((err,pin) =>{
			if(err) return res.status(500).send({message: 'Error al devolver los datos.' + err.toString()});

			if(!pin) return res.status(404).send({message: 'El pin no existe.'});

			return res.status(200).send(
				pin
			);
		});
	},

  getPinesAgregados: function(req, res) {
    Pin.find({estatus:1}).exec((err, pines) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al devolver los datos." });

      if (!pines)
        return res.status(404).send({ message: "No hay pines que mostrar." });

      return res.status(200).send( pines );
    });
  },

  getPinesRecomendados: function(req, res) {
    Pin.find({estatus:0}).exec((err, pines) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al devolver los datos." });

      if (!pines)
        return res.status(404).send({ message: "No hay pines que mostrar." });

      return res.status(200).send( pines );
    });
  },

  updatePin: function(req, res) {
    var pinId = req.params.id;
    var update = req.body;

    Pin.findByIdAndUpdate(pinId, update, { new: true }, (err, pinUpdated) => {
      if (err) return res.status(500).send({ message: "Error al actualizar" });

      if (!pinUpdated)
        return res
          .status(404)
          .send({ message: "No existe el pin para actualizar" });

      return res.status(200).send({
        pin: pinUpdated
      });
    });
  },

  deletePin: function(req, res) {
    var pinId = req.params.id;
    console.log(pinId);

    Pin.findByIdAndRemove(pinId, (err, pinRemoved) => {
      if (err)
        return res
          .status(500)
          .send({ message: "No se ha podido borrar el pin" });

      if (!pinRemoved)
        return res
          .status(404)
          .send({ message: "No se puede eliminar ese pin." });

      return res.status(200).send({
        pin: pinRemoved
      });
    });
  }
};

module.exports = controller;
