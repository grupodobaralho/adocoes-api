"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const midiaSchema = new Schema({
	refMenor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Menor'
	},
	refConteudo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Conteudo'
	},
	type: {
		type: String,
		enum: ["foto", "foto-blur", "video", "carta", "html"],
		required: true
	},
	descricao: {
		type: String,
		required: false
	},
	principal: {
		type: Boolean,
		required: false
	},
	anonymous: {
		type: Boolean,
		required: false	
	}
});

mongoose.model("Midia", midiaSchema);