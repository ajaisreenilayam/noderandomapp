var express = require('express');
var app = express();
var fs = require("fs");
const http = require('http');
const path = require('path');

app.use(express.json());
app.use(express.static("express"));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
  });


app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})


app.get('/getrandom', function (req, res) {
   res.end(rand(10))
})

function rand(length, current) {
  current = current ? current : '';
  return length ? rand(--length, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 60)) + current) : current;
}


var server = app.listen(8080, function() {
     console.log("Listening on 8080");
})

// var server = app.listen(8081, function () {
   // var host = server.address().address
   // var port = server.address().port
   // console.log("Example app listening at http://%s:%s", host, port)
// })
