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

	deleteContentById(id_conteudo) {
		return this.Entity.deleteContentById(id_conteudo);
	}

	postConteudoMidia(body, id_conteudo) {
		return this.Entity.validateMedia(body, id_conteudo).then(body => {
			return this.Entity.postConteudoMidia(body, id_conteudo);
		})
	}

	findConteudo(body) {
		return this.Entity.find(body);
	}

}