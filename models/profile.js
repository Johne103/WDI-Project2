var api = require('marvel-api');

var marvel = api.createClient({
  publicKey: '6e3b9c31868fdc3b68fb8e97cfb449b4',
  privateKey: '6d4da15bc11abe34b0dc8bb48128121588c17dce'
});

module.exports = marvel;
