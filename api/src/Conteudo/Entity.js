"use strict";

import Joi from "joi";

export default class Entity {
	constructor(deps = {}) {
		this.Adapter = deps.Adapter ? new deps.Adapter() : new(require("./Adapter").default)();
	}

	createContent(body) {
		console.log("zanfroni deus");
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
		return this.Adapter.fetchAll();
	}

	find(body) {
		return this.Adapter.fetch(body.id);
	}

	update(body) {
		return this.Adapter.fetchAndUpdate(body);
	}

	remove(body) {
		return this.Adapter.delete(body.id);
	}

	addImage(body) {
		return this.Adapter.fetchAndAddImage(body);
	}

	getImage(body) {
		return this.Adapter.getImagem(body.id);
	}

	createVideo(body) {
		return this.Adapter.addVideo(body);
	}

	deleteVideo(body) {
		return this.Adapter.deleteVideo(body.id);
	}

	fetchAllVideos(id) {
		return this.Adapter.fetchAllVideos(id);
	}

}