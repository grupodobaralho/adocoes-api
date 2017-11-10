"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const termoSchema = new Schema({
	body: {
		type: String,
		required: true
	},
    timeStamp: {
        type: Date,
        required: true
    }
});

mongoose.model("Termo", termoSchema);