"use strict";

import mongoose from "mongoose";

export default class Adapter {

	constructor(deps = {}) {
		this.Usuario = mongoose.model("Usuario");
	}

	save(body) {
		const usr = new this.Usuario(body);
		return usr.save();
	}

	fetchAll() {
		return this.Usuario.find();
	}

	findById(id) {
		return this.Usuario.findById(id);
	}

	update(id, body) {
		return this.Usuario.findOneAndUpdate({
			_id: id
		}, body, {
			upsert: false,
			new: true
		});
	}

	delete(_id) {
		return this.Usuario.remove({
				_id
			})
			.then(resultado => {
				return resultado.result.n > 0;
			});
	}

	getPerfilByUsuarioId(id) {
		const projection = {
			_id: 0,
			perfis: 1
		};
		return this.Usuario.findById(id, projection);
	}

	updatePerfilUsuario(id, perfis) {
		return this.Usuario.findOneAndUpdate({
			_id: id
		}, {
			perfis
		}, {
			upsert: false,
			new: true
		});
	}

}