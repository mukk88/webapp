var express = require('express');
    routes = require('./routes'),
    // api = require('./routes/api'),
    http = require('http'),
    path = require('path');

var app = module.exports = express();

// var http = require('http')
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port);