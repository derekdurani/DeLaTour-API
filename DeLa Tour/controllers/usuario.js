'use strict'

var Usuario = require('../models/usuario');

var controller = {
	
	saveUsuario: function(req, res){
		var usuario = new Usuario();

        const { nombre, correo, contrasenia, estatus } = req.body;
        
		usuario.nombre = nombre;
		usuario.correo = correo;
		usuario.contrasenia = contrasenia;
        usuario.estatus = estatus;

		usuario.save((err, usuarioStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar.'});

			if(!usuarioStored) return res.status(404).send({message: 'No se ha podido guardar.'});

			return res.status(200).send({usuario: usuarioStored});
		});
	},

	getUsuario: function(req, res){
		var usuarioId = req.params.id;

		if(usuarioId == null) return res.status(404).send({message: 'El punto no existe.'});

		Usuario.findById(usuarioId, (err, usuario) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!usuario) return res.status(404).send({message: 'El usuario no existe.'});

			return res.status(200).send(
				usuario
			);

		});
	},

	loginUsuario: function(req,res){

		var usuarioCorreo = req.body.correo;
		var usuarioContrasenia = req.body.contrasenia;

		if(usuarioCorreo == null || usuarioContrasenia == null) return res.status(404).send({message: 'El punto no existe'});
		var query  =  {
			correo:usuarioCorreo,
			contrasenia:usuarioContrasenia
		};
		Usuario.find(query).exec((err,usuario) =>{
			if(err) return res.status(500).send({message: 'Error al devolver los datos.' + err.toString()});

			if(!usuario) return res.status(404).send({message: 'El usuario no existe.'});

			return res.status(200).send(
				usuario
			);
		});
	},

	getUsuarios: function(req, res){

		Usuario.find({}).exec((err, usuarios) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!usuarios) return res.status(404).send({message: 'No hay usuarios que mostrar.'});

			return res.status(200).send(usuarios);
		});

	},

	updateUsuario: function(req, res){
		var usuarioId = req.params.id;
		var update = req.body;

		Usuario.findByIdAndUpdate(usuarioId, update, {new:true}, (err, usuarioUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!usuarioUpdated) return res.status(404).send({message: 'No existe el usuario para actualizar'});

			return res.status(200).send({
				usuario: usuarioUpdated
			});
		});

	},

	deleteUsuario: function(req, res){
		var usuarioId = req.params.id;

		Usuario.findByIdAndRemove(usuarioId, (err, usuarioRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el usuario'});

			if(!usuarioRemoved) return res.status(404).send({message: "No se puede eliminar ese usuario."});

			return res.status(200).send({
				usuario: usuarioRemoved
			});
		});
	}
};

module.exports = controller;