var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var data={};
var id=0;

app.use(express.static('html'));
	
app.post("/annotation", function(req, res){
	var body = req.body;
	data[id]=body;
	//console.log(data);
    //console.log(body);
	id++;
	res.send("Succès: Annotation id: "+(id-1));
});

app.get("/IdAnnot/:Annot", function(req, res){
	var IdAnnot = req.params.Annot;

	res.format ({
		   'text/html': function() {
				res.setHeader('Content-Type', 'text/html');
				res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(data[IdAnnot])+
						"</div></body></html>"); 
		   },
		   'application/json': function() {
				res.send(data[IdAnnot]); 
		}
	});
	
});


app.get("/URI/:RecupAnnotURI", function(req, res){
	var IdURI = req.params.RecupAnnotURI;	
	var tabRep=[];
	for (key in data){
		if (data[key]["URI"]==IdURI){
			tabRep.push({"IdAnnotation" :key,
						 "Annotation": data[key]});
		}
	}
	res.format ({
		   'text/html': function() {
				res.setHeader('Content-Type', 'text/html');
				res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(tabRep)+
						"</div></body></html>"); 
		   },

		   'application/json': function() {
				res.send(tabRep); 
			}
	});
	
});

app.get("/ALL", function(req, res){
	res.format ({
		   'text/html': function() {
				res.setHeader('Content-Type', 'text/html');
				res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(data)+
						"</div></body></html>"); 
		   },

		   'application/json': function() {
				res.send(data); 
			}
	});
	
});

app.listen(port, function(){
	console.log('serveur listening on port : '+port);
});