'use strict';
const https = require('https');

const httpsRequest = async (options, data) => new Promise((resolve, reject) => {
  setTimeout(() => resolve({ status: 400, data: 'Timeout error' }), 6000);
  const req = https.request(options, async res => {
    const data = [];
    res.setEncoding('utf8');
    res.on('data', chunk => data.push(chunk));
    res.on('end', () => {
      const args = JSON.parse(data.join(''));
      resolve({ statusCode: res.statusCode, args });
    });
  });
  req.on('error', err => reject({ status: 400, data: err.message }));
  req.write(data);
  req.end();
});
module.exports = {
  httpsRequest,
};
