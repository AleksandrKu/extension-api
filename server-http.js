'use strict';

const http = require('http');
const config = require('./config');
//const { trucks } = require('./types');
const pid = process.pid;
const hostname = config.hostname;
const port = config.ports[0];
const apiUrl = config.apiUrl;
const getTokenPath = config.getTokenPath;
const sendCargoPath = config.sendCargoPath;

const { getToken, sendCargo } = require('./api');
const preparingBody = body => {
  const fromDates = body.fromDate.split('.');
  let fromDate = new Date(fromDates[2], fromDates[1], fromDates[0], body.fromTime.split(':')[0], 0, 0, 0);
  fromDate = fromDate.getTime() * 0.001;

  const toDates = body.toDate.split('.');
  let tillDate = new Date(toDates[2], toDates[1], toDates[0], body.toTime.split(':')[0], 0, 0, 0);
  tillDate = tillDate.getTime() * 0.001;

  const originCountry = body.origin.split(',')[0];
  const originName = body.origin.split(' ')[2];
  const destinationsCountry = body.destinations.split(',')[0];
  const destinationsName = body.destinations.split(' ')[2];
  //const type = trucks.has(body.type) ? trucks.get(body.type) : 55;
  const volumeldm = body.volumeldm;
  const weight = body.weight;
  const response = {
    origins: [
      {
        country: originCountry,
        name: originName,
      },
    ],
    destinations: [
      {
        country: destinationsCountry,
        name: destinationsName,
      },
    ],
    // type,
    fromDate,
    tillDate,
    volumeldm,
    weight
  };
  return response;
};
const routing = {
  '/accounts/signin': (req, res) => new Promise((resolve, reject) => {
    let body = [];
    req
      .on('data', chunk => body.push(chunk))
      .on('end', async () => {
        try {
          const args = JSON.parse(body.join(''));
          body = { login: args.login, password: args.password };
        } catch (err) {
          resolve({ status: 400, data: 'Bag body' });
        }
        console.log('body', body);
        resolve(await getToken(apiUrl, getTokenPath, body));
      });
  }),
  '/cargos': (req, res) => new Promise((resolve, reject) => {
    let body = [];
    let accessToken;
    req
      .on('data', chunk => body.push(chunk))
      .on('end', async () => {
        const args = JSON.parse(body.join(''));
        try {
          accessToken = req.headers['access-token'];
          body = { ...args };
          // body = preparingBody(body);
        } catch (err) {
          resolve({ status: 400, data: 'Bad response' });
        }
        resolve(await sendCargo(apiUrl, sendCargoPath, body, accessToken));
      });
  }),
  '/': (req, res) => new Promise((resolve, reject) => {
    req.on('end', () => resolve({ status: 200, data: 'Start page! No content!' }));
  }),
  '/favicon.ico': (req, res) => new Promise((resolve, reject) => {
    req.on('end', () => resolve({ status: 200, data: 'No favicon!' }));
  }),
};

http
  .createServer(async (req, res) => {
    console.log(req.url);
    console.log(req.method);
    const routs = ['/accounts/signin', '/cargos', '/', '/favicon.ico'];
    if (req.url && routs.includes(req.url)) {
      const { status, data } = await routing[req.url](req, res);
      console.log(status, data);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
      res.writeHead(status, { 'Content-Type': 'text/plain' });
      return res.end(data);
    }
    res.end('Bad rout!');
  })
  .listen(port, hostname, err => {
    if (err) return console.log('something bad happened', err);
    console.log(`Server running at http://${hostname}:${port}/ . Pid: ${pid}`);
  })
  .on('error', err => {
    console.log(err);
    if (err.code === 'EACCES') console.log(`No access to port: ${port}`);
  })
  .on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request');
  });
