"use strict";

import Joi from "joi";

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
			midia: Joi.object(),
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

	find(body) {
		return this.Adapter.fetch(body.id);
	}

	update(body) {
		return this.Adapter.fetchAndUpdate(body);
	}

	deleteContentById(id_conteudo) {
		return this.Adapter.deleteContentById(id_conteudo);
	}

	postConteudoMidia(body, id_conteudo) {
		return this.Adapter.saveConteudoMidia(body, id_conteudo);
	}

	validateMedia(body, id_conteudo) {
		const schema = Joi.object({
				refMenor: Joi.string(),
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
	deleteMediaByContent(id_midia) {
		console.log("gesiel Entity");
		return this.Adapter.deleteMediaByContent(id_midia);
	}

}