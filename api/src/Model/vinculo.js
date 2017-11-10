"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vinculoSchema = new Schema({
	refMenor:[ {
		type: mongoose.Schema.Types.ObjectId,
		ref: "menores",
		required: true
	}
],
	tipoVinculo: {
		type: String,
		enum: ["irmãos", "primos"],
		required: true
	}
});

mongoose.model("Vinculo", vinculoSchema);