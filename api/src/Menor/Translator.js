"use strict";

import { config } from '../config';
import Roles from '../Common/Roles';

export default class Translator {
    constructor(deps = {}) {
        this.Interactor = deps.Interactor || new (require("./Interactor").default)();
        this.InteressadoInteractor = deps.InteressadoInteractor || new (require("../Interessado/Interactor").default)();
    }

    // ## MENORES ##
    post(request, response) {
        const { body } = request;

        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.ADMINISTRADOR) === -1)
            return response.send(401);

        this.Interactor.create(body)
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, error);
            });
    }

    postVinculo(request, response) {
        let { body } = request;

        this.Interactor.postVinculo(body)
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, error);
            });
    }

    getAll(request, response) {
        const { body } = request;

        //check undefined and default values for age
        const agePoint = this._normalizeAgePoint(request.query.pontoIdade) || config.defaultAgePoint;

        //check undefined and default values for gender
        const genderPoint = this._normalizeGenderPoint(request.query.pontoSexo) || config.defaultGenderPoint;

        let interactorResult;

        //Validar se a requisição atual possui escopo Anônimo
        if (request.authInfo === undefined)
            interactorResult = this.Interactor.fetchAllAnonymous(agePoint, genderPoint);

        //Ou se possui escopo de Usuário/Admin
        else
            interactorResult = this.Interactor.fetchAll(agePoint, genderPoint);

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
                response.send(500, error);
            });
    }

    getVinculos(request, response) {
        const { id_menor } = request.params;

        let interactorResult;

        interactorResult = this.Interactor.fetchVinculos(id_menor);

        //Ação padrão para resultado do interactor
        interactorResult
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, error);
            });
    }

    updateMenor(request, response) {
        const { body } = request;

        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.ADMINISTRADOR) === -1)
            return response.send(401);

        this.Interactor.update(request.params.id_menor, body)
            .then(menor => {
                if (!menor) {
                    return response.send(400, "Nenhum menor com o ID informado foi encontrado");
                }
                response.send(200, menor);
            })
            .catch(error => {
                response.send(500, "Ocorreu um erro ao atualizar o menor");
            });
    }

    deleteMenor(request, response) {
        const { id_menor } = request.params;

        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.ADMINISTRADOR) === -1)
            return response.send(401);

        this.Interactor.delete(id_menor)
            .then(sucesso => {
                if (!sucesso) {
                    return response.send(400, "Nenhum cadastro com o ID informado foi encontrado");
                }
                response.send(200, "Cadastro deletado com sucesso");
            })
            .catch(error => {
                response.send(500, "Ocorreu um erro ao deletar o cadastro");
            });
    }

    _normalizeAgePoint(agePoint) {
        return (agePoint < 0.0 || agePoint > config.maximumAgePoint) ? undefined : agePoint;
    }

    _normalizeGenderPoint(genderPoint) {
        return (genderPoint < 0.0 || genderPoint > config.maximumGenderPoint) ? undefined : genderPoint;
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

        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.ADMINISTRADOR) === -1)
            return response.send(401);

        this.Interactor.postMedia(body, id_menor)
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, error);
            });
    }

    deleteAllMedia(request, response) {
        const { id_menor } = request.params;

        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.ADMINISTRADOR) === -1)
            return response.send(401);

        this.Interactor.deleteAllMedia(id_menor)
            .then(sucesso => {
                if (!sucesso) {
                    return response.send(400, "Nenhuma mídia com o ID informado foi encontrada.");
                }
                response.send(200, "Mídias deletadas com sucesso.");
            })
            .catch(error => {
                response.send(500, "Ocorreu um erro ao deletar as mídias.");
            });

    }

    deleteMediaById(request, response) {
        const { id_menor } = request.params;
        const { id_midia } = request.params;

        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.ADMINISTRADOR) === -1)
            return response.send(401);

        this.Interactor.deleteMediaById(id_menor, id_midia)
            .then(sucesso => {
                if (!sucesso) {
                    return response.send(400, "Nenhuma mídia com o ID informado foi encontrada.");
                }
                response.send(200, "Mídia deletada com sucesso.");
            })
            .catch(error => {
                response.send(500, "Ocorreu um erro ao deletar a mídia.");
            });
    }

    // ## INTERESSES ##
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

    postInterested(request, response) {
        //Ação padrão para resultado do interactor
        this.InteressadoInteractor
            .getInteressadoByUser(request.user._id)
            .then(interessado => {
                let body = {
                    refMenor: request.params.id_menor,
                    refInteressado: interessado._id,
                    tipoInteresse: request.body.tipoInteresse
                };

                this.Interactor
                    .postInterested(body)
                    .then(message => {
                        response.send(200, message);
                    })
                    .catch(error => {
                        response.send(500, error);
                    });
            })
            .catch(error => {
               response.send(500, error);
            });
    }

    fetchAllTypeInterest(request, response) {
        const id = request.params.id_interessado;

        let interactor = request.query.interesse ?
            this.Interactor.fetchAllTypeInterestFiltered(id, request.query.interesse) :
            this.Interactor.fetchAllTypeInterest(id);

        interactor.then(message => {
            response.send(200, message);
        })
        .catch(error => {
            response.send(400, error)
        });
    }
}