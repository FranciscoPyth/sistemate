// src/routes/personRoutes.js
const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

router.get('/persons', personController.getAllPersons);
router.get('/persons/:id', personController.getPersonById);
router.put('/persons/:id', personController.updatePerson);
router.post('/send-email', personController.sendEmail);

module.exports = router;
