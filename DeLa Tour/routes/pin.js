'use strict'

var express = require('express');
var PinController = require('../controllers/pin');

var router = express.Router();


router.post('/save-pin', PinController.savePin);
router.get('/pin/:id?', PinController.getPin);
router.get('/pines', PinController.getPines);
router.put('/pin/:id', PinController.updatePin);
router.delete('/pin/:id', PinController.deletePin);

module.exports = router;