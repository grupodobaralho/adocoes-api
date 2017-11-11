"use strict";

import { config } from '../config';

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
		documentoSchema
	],
	enderecos: [{
		type: String
	}],
	telefones: [{
        type: String
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
	},
    pontoIdade: {
        type: Number,
        required: false,
		default: config.defaultAgePoint
    },
    pontoSexo: {
        type: Number,
        required: false,
		default: config.defaultGenderPoint
    }
});

mongoose.model("Interessado", interessadoSchema);
