"use strict";

import Roles from '../Common/Roles';

export default class Translator {

	constructor(deps = {}) {
		this.Interactor = deps.Interactor ? new deps.Interactor() : new(require("./Interactor").default)();
	}

    postOrdenacao(req, res) {
        const body = {
            id: req.params.id_interessado,
            ...req.body
        }

        //Check if the current user has permission to perform this action
        if (req.user.perfis.indexOf(Roles.ADMINISTRADOR) === -1)
            return response.send(401);

        this.Interactor
			.postOrdenacao(body)
            .then(ret => {
                res.send(200, {});
            })
            .catch(error => {
                res.send(500, error);
            });
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
	// Interesse
	//

	// RFI13: POST /interessados/:id_interessado}/menores
	postInterested(request, response) {
		
						let body = {
								refMenor: request.body.refMenor,
								refInteressado: request.params.id_interessado,
								tipoInteresse: request.body.tipoInteresse
						};
		
						//Ação padrão para resultado do interactor
						this.Interactor
								.postInterested(body)
								.then(message => {
										response.send(200, message);
								})
								.catch(error => {
										response.send(500, error);
								});
				}
				
// RFI15: DELETE /interessados/:id_interesse/menores/
				deleteInterested(request, response) {
					let _id = request.params.id_interesse          
 
				 //Ação padrão para resultado do interactor
				 this.Interactor
						 .deleteInterested(_id)
						 .then(message => {
								 response.send(200, message);
						 })
						 .catch(error => {
								 response.send(500, error);
						 });
		 }

	// #94 RFI14: GET /interessados/{id_interessado}/menores?tipo=favorito|apadrinhamento|adocao
	fetchAllTypeInterest(request, response) {
		const id = request.params.id_interessado;
			if(request.query.interesse) {
				const type = request.query.interesse;            
				this.Interactor.fetchAllTypeInterestFiltered(id, type)
								.then(message => {
										response.send(200, message);
								})
								.catch(error => {
										console.log(error);
										response.send(400, error)
								});
						}
						else{
								this.Interactor.fetchAllTypeInterest(id)
								.then(message => {
										response.send(200, message);
								})
								.catch(error => {
										console.log(error);
										response.send(400, error)
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
