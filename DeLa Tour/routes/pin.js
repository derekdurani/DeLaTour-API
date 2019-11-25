"use strict";

var express = require("express");
var PinController = require("../controllers/pin");

var router = express.Router();
//Rutas

router.post("/save-pin", PinController.savePin);
router.get("/pin/:id?", PinController.getPin);
router.get("/pines-agregados", PinController.getPinesAgregados);
router.get("/pines-recomendados", PinController.getPinesRecomendados);
router.put("/pin/:id", PinController.updatePin);
router.get("/pin/del/:id?", PinController.deletePin);
router.post("/pin/nombre",PinController.getPinNombre);

module.exports = router;
