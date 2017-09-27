"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enderecoSchema = require("./endereco");
const telefoneSchema = require("./telefone");
const midiaSchema = require("./midia");
const documentoSchema = require("./documento");

const interessadoSchema = new Schema({
	refUsuario: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "usuarios"
	},
	name: {
		type: String
	},
	nomeConjuge: {
		type: String
	},
	email: {
		type: String
	},
	dataNascimento: {
		type: Date,
		required: true
	},
	renda: {
		type: Number,
		required: true
	},
	comprovantesRenda: [
		midiaSchema
	],
	outrosDocumentos: [
		type: mongoose.Schema.Type.ObjectId,
		ref: "documentos"
	],
	enderecos: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "enderecos"
	}],
	telefones: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "telefones"
	}],
	interesses: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "interesses"
	}],
	visualizacoes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "visualizacoes"
	}],
	ativo: {
		type: Boolean,
		required: true,
		default: true
	}
});

mongoose.model("Interessado", interessadoSchema);
