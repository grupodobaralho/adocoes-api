const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Timestamp = Schema.Types.Timestamp

const conteudoInstitucionalSchema = new Schema({
	_id: ObjectId,
	nome: String,
	ativo: Boolean,
	//necessário instanciar timesStamps:
	// timestampCriacao: Timestamp,
	// timestampInicio: Timestamp,
	// timestampFim: Timestamp
})

mongoose.model('ConteudoInstitucional', conteudoInstitucionalSchema)
