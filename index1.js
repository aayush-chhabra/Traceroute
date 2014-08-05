var request = require('request');

request.post({
  headers: {'content-type' : 'json'},
  url:     'http://localhost:8080/',
  body:    "mes=heydude"
}, function(error, response, body){
  console.log(body);
});