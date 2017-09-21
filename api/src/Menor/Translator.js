"use strict";

import Roles from '../Common/Roles';

export default class Translator {

	constructor(deps = {}) {
		this.Interactor = deps.Interactor || require("./Interactor").default;
	}

	post(request, response) {
		const {
			body
		} = request;

		const interactor = new this.Interactor();

		interactor.create(body)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				response.send(500, error);
			});
	}

    getAll(request, response) {
		const { body } = request;
		const interactor = new this.Interactor();

		let interactorResult;

		//Validar se a requisição atual possui escopo Anônimo
		if (request.authInfo.scope === Roles.ANONYMOUS)
            interactorResult = interactor.fetchAllAnonymous();

		//Ou se possui escopo de Usuário/Admin
		else
            interactorResult = interactor.fetchAll();

		//Ação padrão para resultado do interactor
        interactorResult
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
                response.send(500, error);
			});
	}

	get(request, response) {
		const { id_menor } = request.params;
        const interactor = new this.Interactor();

        let interactorResult;

        //Validar se a requisição atual possui escopo Anônimo
        if (request.authInfo.scope === Roles.ANONYMOUS)
            interactorResult = interactor.fetchByIdAnonymous(id_menor);

        //Ou se possui escopo de Usuário/Admin
        else
            interactorResult = interactor.fetchById(id_menor);

        //Ação padrão para resultado do interactor
        interactorResult
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
                response.send(500, error);
			});
	}

	put() {

	}

	delete() {

	}

}