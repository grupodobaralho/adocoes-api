"use strict";

import Roles from '../Common/Roles';

export default class Translator {

    constructor(deps = {}) {
        this.Interactor = deps.Interactor || require("./Interactor").default;
    }

    postInterested(request, response) {
        const interactor = new this.Interactor();

        let body = {
            refMenor: request.params.id_menor,
            refInteressado: "",
            tipoInteresse: request.body.tipoInteresse
        };

        //Validar se a requisição atual possui escopo Anônimo
        if (request.authInfo.scope === Roles.USER) {
            body.refInteressado = request.user._id;

            //Ação padrão para resultado do interactor
            interactor
                .postInterested(body)
                .then(message => {
                    response.send(200, message);
                })
                .catch(error => {
                    response.send(500, error);
                });
        }
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

    deleteMenor(request, response) {

        const {
            id_menor
        } = request.params;

        const interactor = new this.Interactor();

        interactor.delete(id_menor)
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

    fetchAllIntersting(request, response) {

        const {
            id_menor
        } = request.params;

        const interactor = new this.Interactor();

        interactor.fetchAllIntersting(id_menor)
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                console.log(error);
            });
    }
}