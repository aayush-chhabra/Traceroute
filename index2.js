
var express = require('express');
var contentFromFile;
var app = express();
var body = "";

app.use(express.static(__dirname + '/public'));

app.post("/hello", function(req, res) {
    req.on('data', function(chunk) {
        body += chunk;
    });
    req.on('end', function() {

        contentFromFile = body
        console.log(contentFromFile);
        body = "";
        res.writeHead(200);
        res.end("I have the data!!");

    });
});

app.get("/hi", function(req,res){
	res.send(contentFromFile);
});


app.get("/", function(req, res){
	res.redirect("/index.html");
});
app.listen(8081);