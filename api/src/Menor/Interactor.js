"use strict";

export default class Interactor {
	constructor(deps = {}) {
		this.Entity = deps.Entity || require("./Entity").default;
	}

	create(body) {
		const entity = new this.Entity();
		return entity.validate(body).then(body => {
			return body;
		});
	}

	fetchAll() {
		const entity = new this.Entity();
		return entity.fetchAll();
	}

	fetchById(id) {
		const entity = new this.Entity();
		return entity.findById(id);
	}

	find(body) {
		const entity = new this.Entity();
		return entity.fetch();
	}

	remove(body) {
		const entity = new this.Entity();
		return entity.delete();
	}

	update(body) {
		const entity = new this.Entity();
		return entity.update();
	}

	getOrdination(body) {
		const entity = new this.Entity();
		return entity.fetchOrdination();
	}

	addIntersting(body) {
		const entity = new this.Entity();
		return entity.addIntersting();
	}

	fetchAllIntersting(body) {
		const entity = new this.Entity();
		return entity.fetchAllIntersting();
	}

	removeIntersting(body) {
		const entity = new this.Entity();
		return entity.removeIntersting();
	}

	createImage(body) {
		const entity = new this.Entity();
		return entity.createImage(body);
	}

	fetchImages(body) {
		const entity = new this.Entity();
		return entity.fetchAllImages(body);
	}

	fetchImage(body) {
		const entity = new this.Entity();
		return entity.fetchImage(body);
	}

	removeImage(body) {
		const entity = new this.Entity();
		return entity.removeImage();
	}

	createVideo(body) {
		const entity = new this.Entity();
		return entity.createVideo();
	}

	fetchAllVideo(body) {
		const entity = new this.entity();
		return entity.fetchAllVideo();
	}

	fetchVideo(body) {
		const entity = new this.Entity();
		return entity.fetchVideo();
	}

	removeVideo(body) {
		const entity = new this.Entity();
		return entity.removeVideo();
	}

}