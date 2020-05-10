'use strict';

const PORT = process.env.PORT || 443;
const host = process.env.HOST || '0.0.0.0';

console.log({ PORT });
console.log({ host });

module.exports = {
  hostname: 'cargo-extention-api.herokuapp.com',
  ports: [PORT],
  apiUrl: 'io.cargo.lt',
  getTokenPath: '/accounts/signin',
  sendCargoPath: '/cargos',
};
