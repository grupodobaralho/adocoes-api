"use strict";

import Joi from "joi";

export default class Entity {
	constructor(deps = {}) {
		this.Adapter = deps.Adapter || require("./Adapter").default;
	}

	create(body) {
		const adapter = new this.Adapter();
		return adapter.save(body);
	}

	validateToken(body) {
		return new Promise((resolve, reject) => {
			resolve(body);
		});
	}

	validate(body) {
		const schema = Joi.object({
			nome: Joi.string().required(),
			pagina: Joi.object().required(),
			midia: Joi.object().required(),
			ativo: Joi.boolean().required(),
			timeStampCriacao: Joi.date().default().required(),
			timeStampInicio: Joi.date().default().required(),
			timeStampFim: Joi.date().default().required()
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
		let adapter = new this.Adapter();
		return adapter.fetchAll();
	}

	find(body) {
		const adapter = new this.Adapter();
		return adapter.fetch(body.id);
	}

	update(body) {
		const adapter = new this.Adapter();
		return adapter.fetchAndUpdate(body);
	}

	remove(body) {
		const adapter = new this.Adapter();
		return adapter.delete(body.id);
	}

	addImage(body) {
		const adapter = new this.Adapter();
		return adapter.fetchAndAddImage(body);
	}

	getImage(body) {
		const adapter = new this.Adapter();
		return adapter.getImagem(body.id);
	}

	createVideo(body) {
		const adapter = new this.Adapter();
		return adapter.addVideo(body);
	}

	deleteVideo(body) {
		const adapter = new this.Adapter();
		return adapter.deleteVideo(body.id);
	}

	fetchAllVideos(id) {
		const adapter = new this.Adapter();
		return adapter.fetchAllVideos(id);
	}

}