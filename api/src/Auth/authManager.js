"use strict";

var passport = require("passport");
var mongoose = require("mongoose");

import Roles from '../Common/Roles.js';

var BasicStrategy = require("passport-http").BasicStrategy;
var BearerStrategy = require("passport-http-bearer").Strategy;

// estratégia para clientes oauth2
passport.use("client-basic", new BasicStrategy(
	function (nome, secret, callback) {
		var Cliente = mongoose.model("Cliente");
		Cliente.findOne({ nome: nome }, function (err, cliente) {
			if (err)
				return callback(err);
			
			// Cliente oauth não cadastrado
			if (!cliente)
				return callback(null, false);
			
			// Verifica secret do cliente oauth
			cliente.verifySecret(secret, function (err, isMatch) {
				if (err)
					return callback(err);
				
				if (!isMatch)
					return callback(null, false);
				
				return callback(null, cliente);
			});
		});
	}
));

// estratégia para tokens oauth2
passport.use(new BearerStrategy(
	function (accessToken, callback) {
		//#71 Adicionar permissão anônima nas rotas 
		if (accessToken === Roles.ANONYMOUS) {
			return callback(null, {}, {
				scope: Roles.ANONYMOUS
			});
		}

		//Caso a requisição contenha um token válido...
		var Token = mongoose.model("Token");
		var Usuario = mongoose.model("Usuario");

		Token.findOne({ value: accessToken }, function (err, token) {
			if (err)
				return callback(err);

			if (!token)
				return callback(null, false);
			
			Usuario.findOne({ _id: token.userId }, function (err, usuario) {
				if (err)
					return callback(err);

				if (!usuario)
					return callback(null, false);

				// Permitir a definição de escopo de acordo com o perfil do usuario
				callback(null, usuario, {
					scope: Roles.USER
				});
			});
		});
	}
));

exports.isAuthenticated = passport.authenticate(["bearer"], {
	session: false
});

exports.isClientAuthenticated = passport.authenticate("client-basic", {
	session: false
});