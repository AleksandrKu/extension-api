'use strict';

const PORT = process.env.PORT || '3000';
console.log({ PORT });

module.exports = {
  hostname: '127.0.0.1',
  ports: [PORT],
  apiUrl: 'io.cargo.lt',
  getTokenPath: '/accounts/signin',
  sendCargoPath: '/cargos',
};
