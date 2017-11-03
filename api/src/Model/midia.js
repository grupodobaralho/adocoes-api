"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const midiaSchema = new Schema({
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