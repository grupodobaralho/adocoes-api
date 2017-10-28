"use strict";

export default class Translator {
	constructor(deps = {}) {
		this.Interactor = deps.Interactor ? new deps.Interactor() : new (require("./Interactor").default)();
	}

	postContent(request, response) {
		const {
			body
		} = request;

		console.log(body);
		this.Interactor.createContent(body)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				console.log(500, error);
			});
	}

	put(request, response) {
		const {
			body
		} = request;

		this.Interactor.update(body)
			.then(message => {
				response.send(200, message);
			});
	}

	get(request, response) {
		return this.Interactor.fetchAll()
			.then(result => {
				response.json(200, result);
			})
			.catch(error => {
				let status = error.status || 500;
				response.json(status, error);
			});
	}

	deleteContentById(request, response) {
		const { id_conteudo } = request.params;

		this.Interactor.deleteContentById(id_conteudo)
			.then(sucesso => {
				if (!sucesso) {
					return response.send(400, "Nenhum cadastro com o ID informado foi encontrado");
				}
				response.send(200, "Cadastro deletado com sucesso");
			})
			.catch(error => {
				console.log(error);
				response.send(500, "Ocorreu um erro ao deletar o cadastro");
			});
	}
}