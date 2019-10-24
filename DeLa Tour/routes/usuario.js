'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var router = express.Router();
//Rutas

router.post('/save-usuario', UsuarioController.saveUsuario);
router.get('/usuario/:id?', UsuarioController.getUsuario);
router.get('/usuarios', UsuarioController.getUsuarios);
router.put('/usuario/:id', UsuarioController.updateUsuario);
router.delete('/usuario/:id', UsuarioController.deleteUsuario);

module.exports = router;