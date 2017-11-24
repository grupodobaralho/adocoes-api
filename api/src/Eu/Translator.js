"use strict";

import Roles from '../Common/Roles';

export default class Translator {
    constructor(deps = {}) {
        this.Interactor = deps.Interactor || new (require("../Interessado/Interactor").default)();
    }

    getInteressado(request, response) {
        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.INTERESSADO) === -1)
            return response.send(401);

        this.Interactor
            .getInteressadoByUser(request.user._id)
            .then(interessado => {
                this.Interactor
                    .getInteressado({ id: interessado._id })
                    .then(bag => {
                        response.send(200, bag);
                    })
                    .catch(error => {
                        response.send(500, error);
                    });
            })
            .catch(error => {
                response.send(400, error);
            });
    }

    getAllInterest(request, response) {
        const id = request.params.id_interessado;

        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.INTERESSADO) === -1)
            return response.send(401);

        this.Interactor
            .getInteressadoByUser(request.user._id)
            .then(body => {
                let userId = body._id;

                let interactorExp = request.query.interesse ?
                    this.Interactor.fetchAllTypeInterestFiltered(userId, request.query.interesse) :
                    this.Interactor.fetchAllTypeInterest(userId);

                interactorExp.then(message => {
                    response.send(200, message);
                })
                .catch(error => {
                    response.send(400, error)
                });
            })
            .catch(error => {
                response.send(400, error);
            });
    }

    setOrdenacao(request, response) {
        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.INTERESSADO) === -1)
            return response.send(401);

        this.Interactor
            .getInteressadoByUser(request.user._id)
            .then(interessado => {
                const body = {
                    id: interessado._id.toString(),
                    ...request.body
                }

                this.Interactor
                    .postOrdenacao(body)
                    .then(ret => {
                        response.send(200, {});
                    })
                    .catch(error => {
                        response.send(500, error);
                    });
            })
            .catch(error => {
                response.send(500, error);
            });
    }

    postInterested(request, response) {
        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.INTERESSADO) === -1)
            return response.send(401);

        //Ação padrão para resultado do interactor
        this.Interactor
            .getInteressadoByUser(request.user._id)
            .then(interessado => {
                let body = {
                    refMenor: request.body.refMenor,
                    refInteressado: interessado._id.toString(),
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

    deleteInterested(request, response) {
        if (request.user.perfis.indexOf(Roles.INTERESSADO) === -1)
            return response.send(401);

        this.Interactor
            .getInteressadoByUser(request.user._id)
            .then(interessado => {
                //Ação padrão para resultado do interactor
                this.Interactor
                    .deleteInterestInMenor(interessado._id, request.params.id_menor)
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

    getInterest(request, response) {
        if (request.user.perfis.indexOf(Roles.INTERESSADO) === -1)
            return response.send(401);

        this.Interactor
            .getInteressadoByUser(request.user._id)
            .then(interessado => {
                //Ação padrão para resultado do interactor
                this.Interactor
                    .getInterestByMenorAndInterested(interessado._id, request.params.id_menor)
                    .then(message => {
                        response.send(200, message || {});
                    })
                    .catch(error => {
                        response.send(500, error);
                    });
            })
            .catch(error => {
                response.send(500, error);
            });
    }
}