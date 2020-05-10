'use strict';

const PORT = process.env.PORT || 80;


module.exports = {
  hostname: '34.249.148.208',
  ports: [PORT],
  apiUrl: 'io.cargo.lt',
  getTokenPath: '/accounts/signin',
  sendCargoPath: '/cargos',
};
