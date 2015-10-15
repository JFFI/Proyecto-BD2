var socket = io.connect();
socket.on('connect',function(){
	socket.emit('req_llenar_tusuario');
});
socket.on('llenar_tusuario',function(data){
	var listae = document.getElementById('c_tipo_usuario');
	var listab = document.getElementById('e_tipo_usuario');
	listae.options.length = 0;
	listab.options.length = 0;
	var datos = data.split('~');
	if(datos.length>0){
		var contador = 0;
		while(contador<datos.length){
			var datos2 = datos[contador].split(';');
			var newop = document.createElement("option");
			newop.text = datos2[1];
			newop.value = datos2[0];
			listae.options.add(newop);
			var newop2 = document.createElement("option");
			newop2.text = datos2[1];
			newop2.value = datos2[0];
			listab.options.add(newop2);
			contador++;
		}
	}
	socket.emit('req_llenar_usuarios');
});
socket.on('llenar_usuarios',function(data){
	var listae = document.getElementById('e_username');
	var listab = document.getElementById('b_username');
	listae.options.length = 0;
	listab.options.length = 0;
	var datos = data.split('~');
	if(datos.length>0){
		var contador = 0;
		while(contador<datos.length){
			var newop = document.createElement("option");
			newop.text = datos[contador];
			newop.value = datos[contador];
			listae.options.add(newop);
			var newop2 = document.createElement("option");
			newop2.text = datos[contador];
			newop2.value = datos[contador];
			listab.options.add(newop2);
			contador++;
		}
		socket.emit('req_llenar_usuario',listae.value);
	}
});
socket.on('llenar_usuario',function(data){
	document.getElementById('e_password').value = data.password;
	document.getElementById('e_nombre').value = data.nombre;
	document.getElementById('e_telefono').value = data.telefono;
	document.getElementById('e_correo').value = data.correo;
	document.getElementById('e_tipo_usuario').text = (data.tipo_usuario);
	document.getElementById('e_tipo_usuario').value = (data.tipo_usuario);
});
socket.on('res_adminusers',function(data){
	if(data=='fallo'){
		document.getElementById('msje').innerHTML = "<div class=\"alert alert-danger alert-dismissable\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>Error</div>";
	}else{
		document.getElementById('msje').innerHTML = "<div class=\"alert alert-success alert-dismissable\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>Exito</div>";
	}
	socket.emit('req_llenar_usuarios');
});
$(function(){
	document.getElementById('c_boton').addEventListener('click',function(){
		socket.emit('crear_usuario',{
			username:document.getElementById('c_username').value,
			telefono:document.getElementById('c_telefono').value,
			correo:document.getElementById('c_correo').value,
			password:document.getElementById('c_password').value,
			nombre:document.getElementById('c_nombre').value,
			tipo_usuario:document.getElementById('c_tipo_usuario').value
		});
	});
	document.getElementById('e_boton').addEventListener('click',function(){
		socket.emit('editar_usuario',{
			username:document.getElementById('e_username').value,
			telefono:document.getElementById('e_telefono').value,
			correo:document.getElementById('e_correo').value,
			password:document.getElementById('e_password').value,
			nombre:document.getElementById('e_nombre').value,
			tipo_usuario:document.getElementById('e_tipo_usuario').value
		});
	});
	document.getElementById('b_boton').addEventListener('click',function(){
		socket.emit('borrar_usuario',{
			username:document.getElementById('b_username').value
		});
	});
	document.getElementById('e_username').addEventListener('change',function(){
		socket.emit('req_llenar_usuario',document.getElementById('e_username').value);
	});
});