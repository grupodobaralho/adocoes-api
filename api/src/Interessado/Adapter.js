"use strict";

import mongoose from "mongoose";

export default class Adapter {
	constructor(deps = {}) {
		this.Interessado = mongoose.model("Interessado");
		this.Documento = mongoose.model("Documento");
	}

	post(body) {
		console.log(body);
		const interessado = new this.Interessado(body);
		return interessado.save();
	}

	getInteressado(id) {
		console.log(id);
		return this.Interessado.findById(id, (err, result) => {
			return new Promise((resolve, reject) => {
				resolve(result);
			})
		});
	}

	getInteressados() {
		return this.Interessado.find((err, doc) => {
			return new Promise((resolve, reject) => {
				resolve(doc);
			});
		});
	}

	deleteInterassado(id) {
		return this.Interessado.remove({
			_id: id
		});
	}

	updateInteressado(body) {
		return this.Interessado.findOneAndUpdate({
			_id: body.id
		}, {
				upsert: true,
				new: true
			}, body);
	}

	addInsert() { }

	fetchAllMenores() { }

	putMenores() { }

	//
	// Visualizacoes
	//

	// RFI09: POST /interessados/{id_interessado}/visualizacoes
	updateVisualizacao(body) {
		return this.Interessado.findOneAndUpdate({
			_id: body.id
		}, {
				$pushAll: {
					"visualizacoes": body.visualizacoes
				}
			}, {
				upsert: true,
				new: true
			});
	}

	fetchAllViews() { }

	insertInterest() { }

	fetchAllInterest() { }

	deleteInterest() { }

	getDocumentsById(body) {
		return this.Documento
			.find({
				refDocumento: body.refDocumento,
				refInteressado: body.refInteressado
			});
	}

	getDocuments(id) {
		return this.Interessado.findById(id).select('outrosDocumentos')
			.then((result, err) => {
				return { documentos: result.outrosDocumentos }
			});
	}

}
