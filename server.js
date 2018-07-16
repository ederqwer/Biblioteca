var express = require('express');
var app = express();
var mongojs=require('mongojs')
var db=mongojs('libros',['libros']);
var bodyParser=require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/libros', function(req, res){
	console.log("Recibiendo petición GET");
	db.libros.find(function(err, docs){
		
		res.json(docs);
	});
	
});

app.post('/libros', function(req, res){
	console.log(req.body);
	db.libros.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

app.delete('/libros/:id', function(req, res){
	var id =req.params.id;
	console.log(id);
	db.libros.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
});

app.get('/libros/:id', function(req, res){
	var id=req.params.id;
	try{
	console.log(id);
	db.libros.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
	}catch(Exception){
		var word=".*"+id+".*";
		db.libros.find({$or:[{ "ADQUISICION": { $regex: word } }, { "TITULO": { $regex: word } }, { "AUTOR": { $regex: word } }, 
			{ "ATOPOGRAFICA": { $regex: word } }, { "OBSERVACIONES": { $regex: word } }]}, function(err, doc){
		console.log(doc);
		res.json(doc);
		});
	}
});

app.put('/libros/:id', function(req, res){
	var id=req.params.id;
	console.log(req.body.TITULO);
	db.libros.findAndModify({query:{_id: mongojs.ObjectId(id)},
		update:{$set: {ADQUISICION: req.body.ADQUISICION, AUTOR: req.body.AUTOR, TITULO: req.body.TITULO, ATOPOGRAFICA: req.body.ATOPOGRAFICA, 
			VOLUMENES: req.body.VOLUMENES, EJEMPLARES: req.body.EJEMPLARES, OBSERVACIONES: req.body.OBSERVACIONES}},
		new:true}, function(err, doc){
		res.json(doc);
	});
});		

app.listen(8080);// cambiar 8080-->80
console.log("Server RUN port 80");
//probando git