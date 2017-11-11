"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vinculoSchema = new Schema({
	refMenorOne: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "menores",
		required: true
	},
	refMenorTwo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "menores",
		required: true
	},
	tipoVinculo: {
		type: String,
		enum: ["irmãos", "primos"],
		required: true
	},
	adocaoConjunta: {
		type: Boolean,
		required: true
	}
});

mongoose.model("Vinculo", vinculoSchema);