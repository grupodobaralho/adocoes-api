"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const midiaSchema = require("./midia");

const conteudoSchema = new Schema({
	nome: {
		type: String,
		required: true
	},
	pagina: {
		type: String,
		required: true
	},
	refMidias: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "midia"
	}],
	timestampCriacao: {
		type: Date,
		required: true
	},
	timestampInicio: {
		type: Date,
		required: false
	},
	timestampFim: {
		type: Date,
		required: false
	},
	ativo: {
		type: Boolean,
		required: true,
		default: true
	}
});

mongoose.model("Conteudo", conteudoSchema);