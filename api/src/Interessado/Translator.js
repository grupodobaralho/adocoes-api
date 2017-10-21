"use strict";

export default class Translator {

	constructor(deps = {}) {
		this.Interactor = deps.Interactor ? new deps.Interactor() : new(require("./Interactor").default)();
	}

	post(request, response) {
		const {
			body
		} = request;

		this.Interactor.post(body)
			.then(message => {
				response.send(201, message)
			})
			.catch(error => {
				console.log(error);
			});
	}

	getInteressados(request, response) {
		const {
			body
		} = request;

		this.Interactor.getInteressados()
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	getInteressado(request, response) {
		const body = {
			id: request.params.id_interessado,
			...request.body
		}

		this.Interactor.findOneInteressado(body)
			.then(message => {
				response.json(200, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	updateInteressado(request, response) {
		const body = {
			id: request.params.id,
			...request.body
		}

		delete body._id;

		this.Interactor.updateInteressado(body)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	deleteInteressado(request, response) {
		const {
			body
		} = request;

		this.Interactor.delete(request.params.id)
			.then(message => {
				response.send(204, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	putInterest(request, response) {
		const {
			body
		} = request;

		this.Interactor.addInterest(body)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	getOrdenacao(request, response) {
		const {
			body
		} = request;

		this.Interactor.fetchAllMenores(request.header.accessToken)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	putOrdenacao(request, response) {
		const {
			body
		} = request;

		this.Interactor.putMenores(body)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	//
	// Menores
	//

	fetchAllTypeInterest(request, response) {
		const id = request.params.id_interessado;
		if(request.query.type) {
				const type = request.query.type;            
				this.Interactor.fetchAllTypeInterestFiltered(id, type)
								.then(message => {
										response.send(200, message);
								})
								.catch(error => {
										console.log(error);
								});
						}
						else{
								this.Interactor.fetchAllTypeInterest(id)
								.then(message => {
										response.send(200, message);
								})
								.catch(error => {
										console.log(error);
								});
						}
				}

	//
	// Visualizacoes
	//

	// RFI09: POST /interessados/{id_interessado}/visualizacoes
	postVisualizacao(request, response) {
		const body = {
			id: request.params.id,
			...request.body
		}

		this.Interactor.postVisualizacao(body)
			.then(message => {
				response.send(201, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	// RFI10: GET /interessados/{id_interessado}/visualizacoes
	getVisualizacao(request, response) {
		const {
			body
		} = request;

		this.Interactor.getVisualizacao(request.header.accessToken)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	// RFI11: PUT /interessados/{id_interessado}/visualizacoes
	updateVisualizacao(request, response) {
		const {
			body
		} = request;

		this.Interactor.updateVisualizacao(body)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	putInterest(request, response) {
		const {
			body
		} = request;

		this.Interactor.insertInterest(body)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	getInterest(request, response) {
		const {
			body
		} = request;

		this.Interactor.fetchAllInterest(request.header.accessToken)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	deleteInterest(request, response) {
		const {
			body
		} = request;

		this.Interactor.deleteInterest(body)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	getDocuments(request, response) {
		const body = {
			id: request.params.id_interessado,
			...request.body
		}

		this.Interactor.getDocuments(body)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				response.send(200, message);
			})
	}

	postDocument(request, response) {
		const body = {
			id: request.params.id_interessado,
			...request.body
		}

		this.Interactor.postDocument(body)
			.then(message => {
				response.send(200, message);
			})
			.catch(message => {
				
			})
	}
}
