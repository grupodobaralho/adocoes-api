"use strict";

export default class Translator {

	constructor(deps = {}) {
		this.Interactor = deps.Interactor ? new deps.Interactor() : new(require("./Interactor").default)();
	}

	fetchAll(request, response) {
		this.Interactor.fetchAll()
			.then(result => {
				response.send(200, result);
			})
			.catch(error => {
				console.log(error);
				response.send(500, "Ocorreu um erro ao obter os usuários");
			});
	}

	getById(request, response) {
		this.Interactor.findById(request.params.id_usuario)
			.then(message => {
				if (!message) {
					return response.send(404, "Nenhum usuário com o ID informado foi encontrado");
				}
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
				response.send(500, "Ocorreu um erro ao obter o usuário");
			});
	}

	post(request, response) {
		const {
			body
		} = request;

		this.Interactor.save(body)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
				response.send(500, "Ocorreu um erro ao criar o usuário");
			});
	}

	put(request, response) {
		const {
			body
		} = request;

		this.Interactor.update(request.params.id_usuario, body)
			.then(usuario => {
				if (!usuario) {
					return response.send(400, "Nenhum usuário com o ID informado foi encontrado");
				}
				response.send(200, usuario);
			})
			.catch(error => {
				console.log(error);
				response.send(500, "Ocorreu um erro ao atualizar o usuário");
			});
	}

	delete(request, response) {
		this.Interactor.delete(request.params.id_usuario)
			.then(sucesso => {
				if (!sucesso) {
					return response.send(400, "Nenhum usuário com o ID informado foi encontrado");
				}
				response.send(200, "Usuário deletado com sucesso");
			})
			.catch(error => {
				console.log(error);
				response.send(500, "Ocorreu um erro ao deletar o usuário");
			});
	}

	getPerfilByUsuarioId(request, response) {
		this.Interactor.getPerfilByUsuarioId(request.params.id_usuario)
			.then(message => {
				if (!message) {
					return response.send(400, "Nenhum usuário com o ID informado foi encontrado");
				}
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
				response.send(500, "Ocorreu um erro ao obter o perfil do usuário");
			});
	}

	updatePerfilUsuario(request, response) {
		const {
			body
		} = request;

		this.Interactor.updatePerfilUsuario(request.params.id_usuario, body.perfis)
			.then(usuario => {
				if (!usuario) {
					return response.send(400, "Nenhum usuário com o ID informado foi encontrado");
				}
				response.send(200, usuario);
			})
			.catch(error => {
				console.log(error);
				response.send(500, "Ocorreu um erro ao atualizar o perfil do usuário");
			});
	}

}