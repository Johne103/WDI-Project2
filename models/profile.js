var api = require('marvel-api');

var marvel = api.createClient({
  publicKey: 'a5c96b5f97bdfb7f45027c6866b9f38f',
  privateKey: 'a25ec6e4904d3ffeb8fbc5216007929d392a896d'
});

module.exports = marvel;
