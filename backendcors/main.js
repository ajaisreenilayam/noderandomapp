var express = require('express');
var app = express();
var fs = require("fs");
const http = require('http');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(express.static("express"));

app.use(cors())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://35.200.172.166:32326');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,application/json');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// app.use(cors({
    // origin: 'http://35.200.172.166:32087/',
	 // methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
// }))

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


app.get('/getEnvVariable', function (req, res) {
   console.log(process.env);
   res.end( process.env );
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
