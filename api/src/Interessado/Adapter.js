"use strict";

import mongoose from "mongoose";

export default class Adapter {
	constructor(deps = {}) {
		this.Interessado = mongoose.model("Interessado");
	}

	post(body) {
		console.log(body);
		const interessado = new this.Interessado(body);
		return interessado.save();
	}

	getInteressado(id) {
		console.log(id);
		return this.Interessado.findById(id, (err, result) => {
			console.log(result);
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

	addInsert() {}

	fetchAllMenores() {}

	putMenores() {}

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

	fetchAllViews() {}

	insertInterest() {}

	fetchAllInterest() {}

	deleteInterest() {}

	// RFI17 (2017-2): GET /interessados/:id_interessado/mensagens
	getMensagens(id_interessado) {
        return this.Interessado.find({
            _id: id_interessado
        });
    }

}