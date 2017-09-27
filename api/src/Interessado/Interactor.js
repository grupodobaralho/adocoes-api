"use strict";

export default class Interactor {
	constructor(deps = {}) {
		this.Entity = deps.Entity || new require("./Entity").default;
	}

	post(body) {
		return this.Entity.post(body);
	}

	getInteressados(body) {
		return this.Entity.getInteressados();
	}

	getInteressado(body) {
		const entity = new this.Entity();
		return entity.getInteressado(body.id);
	}

	deleteInteressado(id) {
		const entity = new this.Entity();
		return entity.deleteInteressado(id);
	}

	updateInteressado(body) {
		const entity = new this.Entity();
		return entity.updateInteressado(body);
	}

	addInterest(body) {
		const entity = new this.Entity();
		return entity.validateToken(body)
			.then(body => {
				entity.addInterest();
			});
	}

	getMenores(body) {
		const entity = new this.Entity();
		return entity.validateToken(body)
			.then(body => {
				entity.getMenores();
			});
	}

	updateMenores(body) {
		const entity = new this.Entity();
		return entity.validateToken(body)
			.then(body => {
				entity.updateMenores();
			});
	}

	//
	// Visualizacoes
	//

	// RFI09: POST /interessados/{id_interessado}/visualizacoes
	postVisualizacao(body) {
		const entity = new this.Entity();
		return entity.postVisualizacao(body);
	}

	getVisualizacao(body) {
		const entity = new this.Entity();
		return entity.validateToken(body)
			.then(body => {
				entity.getVisualizacao();
			});
	}

	insertInterest(body) {
		const entity = new this.Entity();
		return entity.validateToken(body)
			.then(body => {
				entity.insertInterest();
			});
	}

	fetchAllInterest(body) {
		const entity = new this.Entity();
		return entity.validateToken(body)
			.then(body => {
				entity.fetchAllInterest();
			});
	}

	deleteInterest(body) {
		const entity = new this.Entity();
		return entity.validateToken(body)
			.then(body => {
				entity.deleteInterest();
			});
	}

	// RFI17 (2017-2): GET /interessados/:id_interessado/mensagens
	getMensagens(id_interessado) {
		const entity = new this.Entity();
		return entity.getMensagens(id_interessado);
	}

}