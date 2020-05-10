'use strict';

const PORT = process.env.PORT || 80;


module.exports = {
  hostname: 'cargo-extention-api.herokuapp.com',
  ports: [PORT],
  apiUrl: 'io.cargo.lt',
  getTokenPath: '/accounts/signin',
  sendCargoPath: '/cargos',
};
