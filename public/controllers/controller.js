var myApp=angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function(s, h){
	console.log("repuesta desde el controlador");
	var refresh=function(){
		h.get('/libros').success(function(response){
			console.log("Datos recibidos")
			s.libros=response;
			s.libro="";
		});
	};
	refresh();
	s.addBook=function(){
		console.log(s.libro);
		h.post('/libros', s.libro).success(function(response){
			console.log(response);
			refresh();
		});
	}
	s.remove=function(id){
		console.log(id);
		h.delete('/libros/'+id).success(function(response){
			refresh();
		});
	};
	s.edit=function(id){
		console.log(id);
		h.get('/libros/'+id).success(function(response){
			s.libro=response;
		});
	};

	s.update=function(){
		console.log(s.libro._id);
		h.put('/libros/'+s.libro._id, s.libro).success(function(response){
			refresh();
		});
	};

	s.search=function(){
		console.log(s.word);
		h.get('/libros/'+ s.word.toUpperCase()).success(function(response){
			console.log("Datos recibidos")
			s.libros=response;
			s.libro="";
		});
	}
}]);
