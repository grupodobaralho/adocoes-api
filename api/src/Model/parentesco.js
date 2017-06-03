var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

const parentescoSchema = new Schema({
	_id: ObjectId,
	parentesco: String
})

mongoose.model('Parentesco', parentescoSchema)
