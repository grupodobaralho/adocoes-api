"use strict";

import Roles from '../Common/Roles';

export default class Translator {
    constructor(deps = {}) {
		this.Interactor = deps.Interactor || new(require("./Interactor").default)();
    }

    // ## MENORES ##
    post(request, response) {
        const { body } = request;

        
        this.Interactor.create(body)
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, error);
            });
    }

    getAll(request, response) {
        const { body } = request;
        
        let interactorResult;

        //Validar se a requisição atual possui escopo Anônimo
        if (request.authInfo === undefined)
            interactorResult = this.Interactor.fetchAllAnonymous();

        //Ou se possui escopo de Usuário/Admin
        else
            interactorResult = this.Interactor.fetchAll();

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
        
        let interactorResult;

        //Validar se a requisição atual possui escopo Anônimo
        if (request.authInfo === undefined)
            interactorResult = this.Interactor.fetchByIdAnonymous(id_menor);

        //Ou se possui escopo de Usuário/Admin
        else
            interactorResult = this.Interactor.fetchById(id_menor);

        //Ação padrão para resultado do interactor
        interactorResult
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, "Nenhum cadastro com o ID informado foi encontrado");
            });
    }

    updateMenor(request, response) {
        const { body } = request;

        this.Interactor.update(request.params.id_menor, body)
            .then(menor => {
                if (!menor) {
                    return response.send(400, "Nenhum menor com o ID informado foi encontrado");
                }
                response.send(200, menor);
            })
            .catch(error => {
                console.log(error);
                response.send(500, "Ocorreu um erro ao atualizar o menor");
            });
    }

    deleteMenor(request, response) {
        const { id_menor } = request.params;

        
        this.Interactor.delete(id_menor)
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

    // ## MEDIAS ##
    getMedia(request, response) {
        const { id_menor, id_media } = request.params;
        
        let interactorResult;

        //Validar se a requisição atual possui escopo Anônimo
        if (request.authInfo === undefined)
            interactorResult = this.Interactor.fetchMediaAnonymous(id_menor, id_media);

        //Ou se possui escopo de Usuário/Admin
        else
            interactorResult = this.Interactor.fetchMedia(id_menor, id_media);


        //Ação padrão para resultado do interactor
        interactorResult
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, error);
            });
    }

    getAllMedias(request, response) {
        const { body } = request;
        const { id_menor } = request.params;
        
        let interactorResult;

        //Validar se a requisição atual possui escopo Anônimo
        if (request.authInfo === undefined)
            interactorResult = this.Interactor.fetchAllMediasAnonymous(id_menor);

        //Ou se possui escopo de Usuário/Admin
        else
            interactorResult = this.Interactor.fetchAllMedias(id_menor);

        //Ação padrão para resultado do interactor
        interactorResult
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, error);
            });
    }

    postMedia(request, response) {
        const { body } = request;
        const { id_menor } = request.params;
        
        this.Interactor.postMedia(body, id_menor)
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, error);
            });
    }

    // ## INTERESSES ##
    deleteInterestedByToken(request, response) {

        let body = {
            refMenor: request.params.id_menor,
            refInteressado: request.user._id
        };

        //Ação padrão para resultado do interactor
        this.Interactor
            .deleteInterested(body)
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, error);
            });
    }

    postInterested(request, response) {

        let body = {
            refMenor: request.params.id_menor,
            refInteressado: request.user._id,
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

    fetchAllIntersting(request, response) {

        const {
            id_menor
        } = request.params;

        this.Interactor.fetchAllIntersting(id_menor)
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                console.log(error);
            });
    }

    fetchAllInterstingFiltered(request, response) {
        const type = request.params.tipo;
        const id = request.params.id_interessado;
        
                this.Interactor.fetchAllInterstingFiltered(id, type)
                    .then(message => {
                        response.send(200, message);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
}