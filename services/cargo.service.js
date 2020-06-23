'use strict';

const config = require('../config');
const { getToken } = require('./signin.service');
const { httpsRequest } = require('./https-request');
const apiUrl = config.apiUrl;
const sendCargoPath = config.sendCargoPath;

const sendCargo = async body => {
  console.dir(body, { depth: null });
  const login = new Buffer.from(body.login, 'base64').toString('binary');
  const password = new Buffer.from(body.password, 'base64').toString('binary');
  const tokenObject = await getToken({ login, password });
  const accessToken = tokenObject.data;
  delete body.login;
  delete body.password;
  body = JSON.stringify(body);
  const options = {
    hostname: apiUrl,
    port: 443,
    path: sendCargoPath,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Token': accessToken
    }
  };
  const { statusCode, args } = await httpsRequest(options, body);
  let response = null;
  console.log(statusCode);
  console.log(args);
  if (args.message && args.id) response = { status: statusCode, data: `${args.message} id: ${args.id}` };
  if (args.error && args.error.message) response = { status: 403, data: args.error.message };
  return response;
};
module.exports = {
  sendCargo
};
