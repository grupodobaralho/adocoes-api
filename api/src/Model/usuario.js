"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	senha: {
		type: String,
		required: true
	},
	nome: {
		type: String,
		required: true
	},
	cpf: {
		type: String,
		unique: true,
		required: true
	},
	perfis: [{
		type: String,
		enum: ["Usuario", "Master", "Administrador", "Interessado"],
		required: true
	}],
	refPerfilAdministrador: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "administradores",
		required: false
	},
	refPerfilInteressado: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "interessados",
		required: false
	},
	ativo: {
		type: Boolean,
		required: true,
		default: true
	}
});

/* usuarioSchema.methods.verifyPassword = function (senha, callback) {
	bcrypt.compare(senha, this.senha, function (err, isMatch) {
		if (err) {
			return callback(err);
		}
		callback(null, isMatch);
	});
};


usuarioSchema.pre("save", function (callback) {
	const usuario = this;
	if (usuario.isModified("senha")) {
		bcrypt.genSalt(5, function (err, salt) {
			if (err) {
				return callback(err);
			}
			bcrypt.hash(usuario.senha, salt, null, function (err, hash) {
				if (err) {
					return callback(err);
				}
				usuario.senha = hash;
			});
		});
	}
	if (usuario.isModified("cpf") && !validaCPF(usuario.cpf)) {
		return callback(Error("CPF inválido"));
	}
	return callback();
}); */

mongoose.model("Usuario", usuarioSchema);