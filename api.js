'use strict';

const https = require('https');
const port = 443;
const method = 'POST';
const httpsRequest = async (options, data) => new Promise((resolve, reject) => {
  console.log('httpsRequest'); console.log({ data });
  setTimeout(() => resolve({ status: 400, data: 'Timeout error' }), 6000);
  const req = https.request(options, async res => {
    const data = [];
    res.setEncoding('utf8');
    res.on('data', chunk => data.push(chunk));
    res.on('end', () => {
      console.log(data);
      const args = JSON.parse(data.join(''));
      resolve({ statusCode: res.statusCode, args });
    });
  });
  req.on('error', err => reject({ status: 400, data: err.message }));
  req.write(data);
  req.end();
});


const getToken = async (apiUrl, path, body) => {
  const data = JSON.stringify(body);
  const options = {
    hostname: apiUrl,
    port,
    path,
    method,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  console.log(data);
  const { statusCode, args } = await httpsRequest(options, data);
  let response = null;
  if (args.accessToken) response = { status: statusCode, data: args.accessToken };
  if (args.error && args.error.message) response = { status: 403, data: args.error.message };
  return response;
};



const sendCargo = async (apiUrl, path, body, accessToken) => {
  console.log({ body });
  console.log({ accessToken });
  const data = JSON.stringify(body);
  const options = {
    hostname: apiUrl,
    port,
    path,
    method,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length + 1,
      'Access-Token': accessToken
    }
  };
  console.log(options);
  console.log(data);
  const { statusCode, args } = await httpsRequest(options, data);
  let response = null;
  if (args.message && args.id) response = { status: statusCode, data: `${args.message} id: ${args.id}` };
  if (args.error && args.error.message) response = { status: 403, data: args.error.message };
  return response;
};

module.exports = {
  getToken,
  sendCargo,
};
