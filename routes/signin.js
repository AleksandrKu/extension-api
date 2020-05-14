'use strict';
const express = require('express');
const router = express.Router();

const { getToken } = require('../services/signin.service');

router.post('/', async (req, res) => {
  const token = await getToken(req.body);
  if (token) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
    res.send(token);
  } else {
    res.status(400).send('Bad tokeen');
  }
});

module.exports = router;
