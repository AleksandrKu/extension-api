'use strict';

const config = require('../config');
const { httpsRequest } = require('./https-request');
const apiUrl = config.apiUrl;
const getTokenPath = config.getTokenPath;

const getToken = async body => {
  const data = JSON.stringify(body);
  const options = {
    hostname: apiUrl,
    port: 443,
    path: getTokenPath,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  const { statusCode, args } = await httpsRequest(options, data);
  let response = null;
  console.log(args);
  if (args.accessToken) response = { status: statusCode, data: args.accessToken, userId: args.userId };
  if (args.error && args.error.message) response = { status: 403, data: args.error.message };
  return response;
};

module.exports = {
  getToken
};
