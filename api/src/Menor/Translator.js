"use strict";

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

    get(request, response) {
        const {
            body
        } = request;

        const interactor = new this.Interactor();

        interactor.fetchAll()
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                console.log(error);
            });
    }

    getMenor(request, response) {
        const {
            id_menor
        } = request.params;

        const interactor = new this.Interactor();

        interactor.fetchById(id_menor)
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                console.log(error);
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