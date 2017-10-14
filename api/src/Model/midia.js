"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const midiaSchema = new Schema({
	refMenor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Menor'
	},
	type: {
		type: String,
		enum: ["foto", "foto-blur", "video", "carta", "html"],
		required: true
	},
	conteudo: {
		type: String, // base64 do binário da midia
		required: false
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