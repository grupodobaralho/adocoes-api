"use strict";

export default class Translator {
	constructor(deps = {}) {
		this.Interactor = deps.Interactor ? new deps.Interactor() : new (require("./Interactor").default)();
	}

	postContent(request, response) {
		const {
			body
		} = request;

		this.Interactor.createContent(body)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				response.send(500, error);
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

	fetchAll(request, response) {
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

	fetchAllContentMedias(request, response) {
		const id = request.params.id_conteudo;
		return this.Interactor.fetchAllContentMedias(id)
			.then(result => {
				response.json(200, result);
			})
			.catch(error => {
				let status = error.status || 500;
				response.json(status, error);
			});
	}

	fetchContentMediaById(request, response) {
		const id_conteudo = request.params.id_conteudo;
		const id_midia = request.params.id_midia;
		return this.Interactor.fetchContentMediaById(id_conteudo, id_midia)
			.then(result => {
				response.json(200, result);
			})
			.catch(error => {
				let status = error.status || 500;
				response.json(status, error);
			});
	}

	postConteudoMidia(request, response){

		const { id_conteudo } = request.params;
		const { body } = request;

		this.Interactor.postConteudoMidia(body, id_conteudo)
			.then(sucesso => {
				if(!sucesso) {
					response.send(400, "Nenhum cadastro com o ID informado foi encontrado");
				}
				response.send(200, "Item cadastrado com sucesso");
			})
			.catch(error => {
					response.send(500, "Ocorreu um erro durante o cadastro do item");
		});
	}

	deleteMediaByContent(request, response) {
		
		const { id_conteudo } = request.params;
		const { id_midia } = request.params;
		
		this.Interactor.deleteMediaByContent(id_conteudo, id_midia)
			.then(sucesso => {
					response.send(200, "Mídia deletada com sucesso");
				})
				.catch(error => {
					response.send(500, "Ocorreu um erro ao deletar a Mídia");
			});
	}			
}