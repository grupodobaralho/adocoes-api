"use strict";

import Joi from "joi";

export default class Entity {
	constructor(deps = {}) {
		this.Adapter = deps.Adapter || new(require("./Adapter").default)();
	}

	post(body) {
		return this.Adapter.post(body);
	}

	getInteressados() {
		return this.Adapter.getInteressados();
	}

	getInteressado(id) {
		return this.Adapter.getInteressado(id);
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
		console.log('Error: ' + error);

		console.log('Value: ' + value);
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
		return this.Adapter.deleteInteressado(id);
	}

	updateInteressado(body) {
		return this.Adapter.updateInteressado(body);
	}

	addInterest() {
		return this.Adapter.addInterest();
	}

	getMenores() {
		return this.Adapter.getMenores();
	}

	updateMenores() {
		return this.Adapter.updateMenores();
	}

	postVisualizacao(body) {
		return this.Adapter.postVisualizacao(body);
	}

	getVisualizacoes() {
		return this.Adapter.getVisualizacoes();
	}

	insertInterest() {
		return this.Adapter.insertInterest();
	}

	fetchAllInterest() {
		return this.Adapter.fetchAllInterest();
	}

	deleteInterest() {
		return this.Adapter.deleteInterest();
	}

	getDocuments(id) {
		return this.Adapter.getDocuments(id);
	}

}
