"use strict";

var express = require("express");
var PinController = require("../controllers/pin");

var router = express.Router();
//Rutas
debugger;

router.post("/save-pin", PinController.savePin);
router.get("/pin/:id?", PinController.getPin);
router.get("/pines", PinController.getPines);
router.put("/pin/:id", PinController.updatePin);
router.get("/pin/del/:id?", PinController.deletePin);

module.exports = router;
