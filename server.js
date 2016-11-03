var express = require('express');
var app = express();

app.use(express.static(__dirname + "/public"));

app.listen(80);
console.log("Server RUN port 80");