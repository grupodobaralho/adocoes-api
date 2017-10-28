"use strict";

import mongoose from "mongoose";

export default class Adapter {
	constructor(deps = {}) {
		this.Conteudo = mongoose.model("Conteudo");
	}

	save(body) {
		const conteudo = new this.Conteudo(body);

		return new Promise((resolve, reject) => {
			conteudo.save((err, result) => {
				if (err) {
					return reject(err);
				}
				return resolve(result);
			});
		});
	}

	fetchAll() {
		return this.Conteudo.find((err, doc) => {
			return new Promise((resolve, reject) => {
				resolve(doc);
			});
		});
	}

	fetchAndUpdate(body) {
		return this.Conteudo.findOneAndUpdate({
			_id: body.id
		}, {
				new: true
			}, body, (err, doc) => {
				return doc;
			});
	}

	fetch(id) {

		return this.Conteudo.find({
			_id: id
		});
	}

	deleteContentById(id_conteudo) {
		return this.Conteudo.remove({
			_id: id_conteudo
		})
			.then(resultado => {
				return resultado.result.n > 0;
			});
	}
}