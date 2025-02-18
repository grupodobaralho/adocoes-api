"use strict";

export default class Interactor {
	constructor(deps = {}) {
		this.Entity = deps.Entity || new(require("./Entity").default)();
	}

	save(usuario) {
		return this.Entity.save(usuario);
	}

	fetchAll(body) {
		return this.Entity.fetchAll();
	}

	findById(id) {
		return this.Entity.findById(id);
	}

	update(id, body) {
		return this.Entity.update(id, body);
	}

	delete(id) {
		return this.Entity.delete(id);
	}

	getPerfilByUsuarioId(id) {
		return this.Entity.getPerfilByUsuarioId(id);
	}

	updatePerfilUsuario(id, perfis) {
		return this.Entity.updatePerfilUsuario(id, perfis);
	}
}