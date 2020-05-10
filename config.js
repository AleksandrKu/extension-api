'use strict';

const PORT = process.env.PORT || '80';
console.log({ PORT });

module.exports = {
  hostname: 'fixie:xZJtGPNC6EXuRIx@olympic.usefixie.com',
  ports: [PORT],
  apiUrl: 'io.cargo.lt',
  getTokenPath: '/accounts/signin',
  sendCargoPath: '/cargos',
};
