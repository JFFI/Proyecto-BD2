var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	if(req.session.username == null){
		res.redirect('/');
	}else{
		switch(req.session.tipo_usuario){
			case 1:
			res.redirect('/admininicio');
			break;
			case 2:
			res.redirect('/establecimiento');
			break;
			case 3:
			if(req.session.establecimiento == null){
				res.redirect('/inicio');
			}else{
				res.render('info',{username:req.session.username,establecimiento:req.session.establecimiento});
			}
			break;
			default:
		}
	}
}).post('/',function(req,res,next){
	switch(req.body.metodo){
		case 'salir':
		req.session.destroy();
		res.redirect('/');
		break;
		case 'regreso':
		req.session.establecimiento = null;
		res.redirect('/inicio');
		default:
		res.render('info',{username:req.session.username,establecimiento:req.session.establecimiento});
	};
});


module.exports = router;
