var http = require('http');
var traceroute = require('traceroute');
var geoip = require('geoip-lite');
var prom = require('promise')
var request = require('request');

var sys = require('sys');
var exec = require('child_process').exec;

var geo = [];


  function a(){
    var x=[];
    traceroute.trace("flipkart.com", function(err, hops) {
        if (!err) {
            for(i in hops){
              //console.log(hops[i],"a");
              //console.log(Object.keys(hops[i]));
              if(typeof(hops[i]) === "object"){
                var t = (Object.keys(hops[i]))[0];
                x.push(t);
              }
            }
            //console.log(x);
            printLocation(x).then(function(res){
              console.log(res);
              sendJSONData();
            });
        } else {
            console.log("error!");
        }
    });

  }
      

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};


getClientAddress = function(req) {
    return (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
};


fun = function(a){
  return new Promise(function(fulfill, reject){
    a = geoip.lookup(a);
    fulfill(a);
  });
}

printLocation = function(ipArrays) {
    return new Promise(function (fulfill, reject) {
        var count=0;
        for(var i in ipArrays)
        {
          //console.log(i);
          fun(ipArrays[i]).then(function(res){
            //console.log(res);
            geo.push(res["ll"]);
            count++;
            if(count===ipArrays.length-1)
            {
              console.log(geo);
               geo = JSON.stringify(geo);
               fulfill(geo);
            }
            //console.log(geoip.lookup(ipArrays[i])["ll"]);
          });
          
        }
        
    })
}

function sendJSONData() {

    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': geo.length
    };

    var options = {
        host: 'localhost',
        port: 8081,
        path: '/hello',
        method: 'POST',
        headers: headers
    };

    var req = http.request(options, function(res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function() {
            console.log(responseString);
        });
    });

    req.write(geo);
    req.end();
}


// function repeatSendingData() {

//     printLocation(["173.194.46.72", "72.21.194.212"]).then(function(data) {
//         sendJSONData();
//     });
// }

 a();
// setInterval(repeatSendingData, 180000);