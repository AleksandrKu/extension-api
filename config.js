'use strict';

const PORT = process.env.PORT || '80';
console.log({ PORT });

module.exports = {
  hostname: '99.80.183.117',
  ports: [PORT],
  apiUrl: 'io.cargo.lt',
  getTokenPath: '/accounts/signin',
  sendCargoPath: '/cargos',
};
