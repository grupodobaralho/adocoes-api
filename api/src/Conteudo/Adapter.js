"use strict";

import mongoose from "mongoose";

export default class Adapter {
	constructor(deps = {}) {
		this.Conteudo = mongoose.model("Conteudo");
		this.Midia = mongoose.model("Midia");
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

	saveConteudoMidia(body, id_conteudo){
			const media = this.Midia(body);

			media.save();

			return this.Conteudo.update(
				{ _id: id_conteudo },
				{ $push: {refMidias: media.id} },
				{ multi: false }
			).then(result => {
				return {};
		});
	}

	deleteMediaByContent(id_midia) {
		console.log("gesiel adapter");
		return this.Conteudo.remove({
			midia: id_midia
		})
		.then(resultado => {
			return resultado.result.n > 0;
		});
	}
}