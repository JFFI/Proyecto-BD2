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
			res.render('establecimiento',{username:req.session.username});
			break;
			case 3:
			res.redirect('/inicio');
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
		default:
		res.render('establecimiento',{username:req.session.username});
	}});

module.exports = router;