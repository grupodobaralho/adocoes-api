"use strict";

export default class Interactor {
	constructor(deps = {}) {
		this.Entity = deps.Entity ? new deps.Entity() : new(require("./Entity").default)();
	}

	createContent(body) {
		console.log("react boy");
		return this.Entity.createContent(body);
	}

	fetchAll() {
		return this.Entity.fetchAll();
	}

	update(body) {
		return this.Entity.update(body);
	}

	remove(body) {
		return this.Entity.remove(body);
	}

	getImage(body) {
		return this.Entity.getImagem(body);
	}

	findConteudo(body) {
		return this.Entity.find(body);
	}

	deleteVideo(body) {
		return this.Entity.delete(body);
	}

	addImage(body) {
		return this.Entity.addImage(body);
	}

	createVideo(body) {
		return this.Entity.createVideo(body);
	}

	fetchAllVideos(id) {
		return this.Entity.fetchAllVideos(id);
	}

}