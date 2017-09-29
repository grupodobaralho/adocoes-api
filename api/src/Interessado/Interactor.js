"use strict";

export default class Interactor {
	constructor(deps = {}) {
		this.Entity = deps.Entity || new(require("./Entity").default)();
	}

	post(body) {
		return this.Entity.post(body);
	}

	getInteressados(body) {
		return this.Entity.getInteressados();
	}

	getInteressado(body) {
		return this.Entity.getInteressado(body.id);
	}

	deleteInteressado(id) {
		return this.Entity.deleteInteressado(id);
	}

	updateInteressado(body) {
		return this.Entity.updateInteressado(body);
	}

	addInterest(body) {
		return this.Entity.validateToken(body)
			.then(body => {
				entity.addInterest();
			});
	}

	getMenores(body) {
		return this.Entity.validateToken(body)
			.then(body => {
				entity.getMenores();
			});
	}

	updateMenores(body) {
		return this.Entity.validateToken(body)
			.then(body => {
				entity.updateMenores();
			});
	}

	//
	// Visualizacoes
	//

	// RFI09: POST /interessados/{id_interessado}/visualizacoes
	postVisualizacao(body) {
		return this.Entity.postVisualizacao(body);
	}

	getVisualizacao(body) {
		return this.Entity.validateToken(body)
			.then(body => {
				entity.getVisualizacao();
			});
	}

	insertInterest(body) {
		return this.Entity.validateToken(body)
			.then(body => {
				entity.insertInterest();
			});
	}

	fetchAllInterest(body) {
		return this.Entity.validateToken(body)
			.then(body => {
				entity.fetchAllInterest();
			});
	}

	deleteInterest(body) {
		return this.Entity.validateToken(body)
			.then(body => {
				entity.deleteInterest();
			});
	}

	getDocuments(body) {
		return this.Entity.getDocuments(body.id);
	}

	postDocuments(body) {
		return this.Entity.postDocument(body.id);
	}

}
