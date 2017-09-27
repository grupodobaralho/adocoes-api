"use strict";

import Joi from "joi";

export default class Entity {
	constructor(deps = {}) {
		this.Adapter = deps.Adapter || new (require("./Adapter").default)();
	}

	post(body) {
		return this.Adapter.post(body);
	}

	getInteressados() {
		return this.Adapter.getInteressados();
	}

	getInteressado(id) {
		const adapter = new this.Adapter();
		return adapter.getInteressado(id);
	}


	validateToken(body) {
		return new Promise((resolve, reject) => {
			resolve(body);
		});
	}

	validate(body) {
		const schema = Joi.object({
			refUsuario: Joi.object().required(),
			name: Joi.string().required(),
			cpf: Joi.number().required(),
			email: Joi.string().required().email(),
			senha: Joi.string().required(),
			ativo: Joi.string().required(),
			nomeConjuge: Joi.string().required(),
			dataNascimento: Joi.date().required(),
			renda: Joi.number().precision(2),
			comprovantesRenda: Joi.object().required(),
			outrosDocumentos: Joi.object().required(),
			enderecos: Joi.string().required(),
			telefones: Joi.string().required(),
			interesses: Joi.object().required(),
			visualizacoes: Joi.object().required()
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

	deleteInteressado(id) {
		const adapter = new this.Adapter();
		return adapter.deleteInteressado(id);
	}

	updateInteressado(body) {
		const adapter = new this.Adapter();
		return adapter.updateInteressado(body);
	}

	addInterest() {
		const adapter = new this.Adapter();
		return adapter.addInterest();
	}

	getMenores() {
		const adapter = new this.Adapter();
		return adapter.getMenores();
	}

	updateMenores() {
		const adapter = new this.Adapter();
		return adapter.updateMenores();
	}

	postVisualizacao(body) {
		const adapter = new this.Adapter();
		return adapter.postVisualizacao(body);
	}

	getVisualizacoes() {
		const adapter = new this.Adapter();
		return adapter.getVisualizacoes();
	}

	insertInterest() {
		const adapter = new this.Adapter();
		return adapter.insertInterest();
	}

	fetchAllInterest() {
		const adapter = new this.Adapter();
		return adapter.fetchAllInterest();
	}

	deleteInterest() {
		const adapter = new this.Adapter();
		return adapter.deleteInterest();
	}

	getDocumentosById(body) {
		return this.Adapter.getDocumentosById(body);
	}

}