"use strict";

export default class Interactor {
	constructor(deps = {}) {
		this.Entity = deps.Entity ? new deps.Entity() : new(require("./Entity").default)();
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
				this.Entity.addInterest();
			});
	}

	getMenores(body) {
		return this.Entity.validateToken(body)
			.then(body => {
				this.Entity.getMenores();
			});
	}

	updateMenores(body) {
		return this.Entity.validateToken(body)
			.then(body => {
				this.Entity.updateMenores();
			});
	}

	//
	// Menores
	//

	// #94 RFI14: GET /interessados/{id_interessado}/menores?tipo=favorito|apadrinhamento|adocao
	fetchAllTypeInterest(id) {
		return this.Entity.fetchAllTypeInterest(id);
}

// #94 RFI14: GET /interessados/{id_interessado}/menores?tipo=favorito|apadrinhamento|adocao
fetchAllTypeInterestFiltered(id, type) {	
		return this.Entity.validateTypeInterest(type).then(type => {
			return this.Entity.fetchAllTypeInterestFiltered(id, type);
		})		
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
				this.Entity.getVisualizacao();
			});
	}

	insertInterest(body) {
		return this.Entity.validateToken(body)
			.then(body => {
				this.Entity.insertInterest();
			});
	}

	fetchAllInterest(body) {
		return this.Entity.validateToken(body)
			.then(body => {
				this.Entity.fetchAllInterest();
			});
	}

	deleteInterest(body) {
		return this.Entity.validateToken(body)
			.then(body => {
				this.Entity.deleteInterest();
			});
	}

	getDocuments(body) {
		return this.Entity.getDocuments(body.id);
	}

	postDocuments(body) {
		return this.Entity.postDocument(body.id);
	}

}
