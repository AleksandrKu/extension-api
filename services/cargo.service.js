'use strict';

const config = require('../config');
const { httpsRequest } = require('./https-request');
const apiUrl = config.apiUrl;
const sendCargoPath = config.sendCargoPath;

const sendCargo = async (body, accessToken) => {
  console.log({ body });
  body = JSON.stringify(body);
  const options = {
    hostname: apiUrl,
    port: 443,
    path: sendCargoPath,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //'Content-Length': body.length + 1,
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
