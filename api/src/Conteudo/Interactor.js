"use strict";

export default class Interactor {
	constructor(deps = {}) {
		this.Entity = deps.Entity ? new deps.Entity() : new (require("./Entity").default)();
	}

	createContent(body) {
		return this.Entity.validate(body).then(body => {
			return this.Entity.createContent(body);
		})
	}

	fetchAll() {
		return this.Entity.fetchAll();
	}

	update(body) {
		return this.Entity.update(body);
	}

	fetchAllContentMedias(id) {
		return this.Entity.fetchAllContentMedias(id);
	}

	fetchContentMediaById(id_conteudo, id_midia){
		return this.Entity.fetchContentMediaById(id_conteudo, id_midia)
	}

	deleteContentById(id_conteudo) {
		return this.Entity.deleteContentById(id_conteudo);
	}

}