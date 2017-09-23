"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interesseSchema = new Schema({
    refInteressado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "interessados",
        required: true
    },
    refMenor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menores",
        required: true
    },
    tipoInteresse: {
        type: String,
        enum: ["favoritar", "apadrinhar", "adotar"],
        required: true
    },
    timeStamp: {
        type: Date,
        required: true
    }
});

mongoose.model("Interesse", interesseSchema);