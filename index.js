var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

app.get("", function(req,res){
    res.send("salut!");
});

app.listen(port, function(){
    console.log('serveur listening on port : '+port);
});