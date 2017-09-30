"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export const midiaSchema = new Schema({
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
	}
});

mongoose.model("Midia", midiaSchema);