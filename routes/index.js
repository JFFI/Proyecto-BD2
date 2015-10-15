var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');

/* GET home page. */
router.get('/', function(req, res, next) {
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
			break;
			default:
		}
	}else{
		res.render('index',{error:'false',msj:''});
	}
}).post('/',function(req,res,next){
	oracledb.getConnection(
	{
		user          : "PROYECTO",
		password      : "123456",
		connectString : "192.168.1.5/XE"
	},
	function(err, connection){
		if (err) { console.error(err.message); res.render('index',{error:'true',msj:'error al conectar a la base de datos'});return; }

		connection.execute(
			"SELECT LOGIN(\'"+req.body.username+"\',\'"+req.body.password +"\') as respuesta from DUAL",
			function(err, result){
				if (err) { console.error(err.message); res.render('index',{error:'true',msj:'error durante la consulta'});return; }
				
				var login = result.rows[0][0];

				switch(login){
					case 1:
					req.session.username = req.body.username;
					req.session.tipo_usuario = 1;
					res.redirect('/admininicio');
					break;
					case 2:
					req.session.username = req.body.username;
					req.session.tipo_usuario = 2;
					res.redirect('/establecimiento');
					break;
					case 3:
					req.session.username = req.body.username;
					req.session.tipo_usuario = 3;
					res.redirect('/inicio');
					break;
					default:
					res.render('index',{error:'true',msj:'usuario o contraseña inválidos'});
				}
			});
	});
});

module.exports = router;
