'use strict';
const express = require('express');
const router = express.Router();

const { sendCargo } = require('../services/cargo.service');

router.post('/', async (req, res) => {
  const cargo = await sendCargo(req.body);
  if (cargo) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
    res.send(cargo);
  } else {
    res.status(400).send('Bad tokeen');
  }
});

module.exports = router;
