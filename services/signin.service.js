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
  if (args.accessToken) {
    const userId = Buffer.from(String(args.userId)).toString('base64');
    const login = Buffer.from(body.login).toString('base64');
    const password = Buffer.from(body.password).toString('base64');
    response = {
      status: statusCode,
      data: args.accessToken,
      userId,
      login,
      password,
    };
  }
  console.log(response);
  if (args.error && args.error.message) response = { status: 403, data: args.error.message };
  return response;
};

module.exports = {
  getToken
};
