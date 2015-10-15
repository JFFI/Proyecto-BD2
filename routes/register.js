var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');

router.get('/',function(req,res,next){
	if(req.session.username != null){
		switch(req.session.tipo_usuario){
			case 1:
			res.redirect('/admininicio');
			break;
			case 2:
			res.redirect('/establecimiento');
			break;
			case 3:
			res.redirect('/inicio');
		}
	}else{
		res.render('register',{estado:0,msj:''});
	}
}).post('/',function(req,res,next){
	oracledb.getConnection(
	{
		user          : "PROYECTO",
		password      : "123456",
		connectString : "192.168.1.5/XE"
	},
	function(err, connection){
		if (err) { console.error(err.message); res.render('register',{estado:1,msj:'Error conectando a base de datos'}); return;}

		connection.execute(
			"SELECT VERIFICAR_USERNAME(\'"+req.body.username+"\') as respuesta from DUAL",
			function(err, result){
				if (err) { console.error(err.message); res.render('register',{estado:1,msj:'Error durante la consulta'});return; }
				var disponible = result.rows[0][0];
				if(disponible == 0){
					connection.execute(
						"BEGIN CREAR_USUARIO(\'"+req.body.username+"\',\'"+req.body.telefono+"\',\'"+req.body.correo+"\',\'"+req.body.password+"\',\'"+req.body.nombre+"\',3); END;",
						function(err,result){
							if(err){ console.error(err.message); res.render('register',{estado:1,msj:'Error al insertar en la base de datos'});return;}					
							res.render('register',{estado:2,msj:'Usuario creado con éxito'});
					});
				}else{
					res.render('register',{estado:1,msj:'Nombre de usuario ya utilizado'});
				}
			});
	});
});

module.exports=router;