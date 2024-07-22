// src/controllers/personController.js
const Person = require('../models/Person');
const nodemailer = require('nodemailer');
const config = require('../../config');

const getAllPersons = async (req, res) => {
  const persons = await Person.findAll();
  res.json(persons);
};

const getPersonById = async (req, res) => {
  const person = await Person.findByPk(req.params.id);
  res.json(person);
};

const updatePerson = async (req, res) => {
  const person = await Person.findByPk(req.params.id);
  await person.update(req.body);
  res.json(person);
};

const sendEmail = async (req, res) => {
  const { email, body } = req.body;
  
  const transporter = nodemailer.createTransport({
    service: config.mail.service,
    auth: config.mail.auth,
  });

  const mailOptions = {
    from: config.mail.auth.user,
    to: email,
    subject: 'Comprobante de Pago',
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.toString() });
    }
    res.status(200).json({ message: 'Email sent: ' + info.response });
  });
};

module.exports = {
  getAllPersons,
  getPersonById,
  updatePerson,
  sendEmail,
};
