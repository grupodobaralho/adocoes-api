"use strict";

import Joi from "joi";
Joi.objectId = require('joi-objectid')(Joi);

export default class Entity {
	constructor(deps = {}) {
		this.Adapter = deps.Adapter ? new deps.Adapter() : new (require("./Adapter").default)();
	}

	createContent(body) {
		return this.Adapter.save(body);
	}

	validateToken(body) {
		return new Promise((resolve, reject) => {
			resolve(body);
		});
	}

	validate(body) {
		const schema = Joi.object({
			nome: Joi.string().required(),
			pagina: Joi.string().required(),
			ativo: Joi.boolean().required(),
			timestampCriacao: Joi.date().default().required(),
			timestampInicio: Joi.date().default(),
			timestampFim: Joi.date().default()
		});

		const {
			error,
			value
		} = Joi.validate(body, schema);

		return new Promise((resolve, reject) => {
			if (error) {
				let messages = error.details.map(e => e.message);
				reject({
					status: 400,
					messages
				});
			} else if (value) {
				resolve(value);
			}
		});
	}

	fetchAll() {
		return this.Adapter.fetchAll();
	}

	fetchAllContentMedias(id_conteudo) {
		return this.Adapter.fetchAllContentMedias(id_conteudo);
	}

	fetchContentMediaById(id_midia){
		return this.Adapter.fetchContentMediaById(id_midia)
	}

	updateContent(id_conteudo, body) {
		return this.Adapter.updateContent(id_conteudo, body);
	}

	deleteContentById(id_conteudo) {
		return this.Adapter.deleteContentById(id_conteudo);
	}

	postConteudoMidia(body, id_conteudo) {
		return this.Adapter.saveConteudoMidia(body, id_conteudo);
	}

	deleteMediaByContent(id_conteudo, id_midia) {
		return this.Adapter.deleteMediaByContent(id_conteudo, id_midia);
	}

	validateMedia(body, id_conteudo) {
		const schema = Joi.object({
				refMenor: Joi.objectId(),
				refConteudo: id_conteudo,
				type: Joi.string().required(),
				descricao: Joi.string(),
				principal: Joi.boolean(),
				anonymous: Joi.boolean()
		});

		const { error, value } = Joi.validate(body, schema);

		return new Promise((resolve, reject) => {
				if (error) {
						let messages = error.details.map(e => e.message);
						reject({
								status: 400,
								messages
						});
				} else if (value) {
						resolve(value);
				}
		});
  }
}