"use strict";

import Roles from '../Common/Roles';

export default class Translator {

    constructor(deps = {}) {
        this.Interactor = deps.Interactor ? new deps.Interactor() : new(require("./Interactor").default)();
    }

    // ## INTERESSADO ##
    putOrdenacao(req, res) {
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
        const { body } = request;

        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.ADMINISTRADOR) === -1)
            return response.send(401);

        this.Interactor
            .post(body)
            .then(message => {
                response.send(200, message)
            })
            .catch(error => {
                response.send(500, error);
            });
    }

    getInteressados(request, response) {
        const { body } = request;

        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.ADMINISTRADOR) === -1)
            return response.send(401);

        this.Interactor
            .getInteressados()
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, error);
            });
    }

    getInteressado(request, response) {
        const body = {
            id: request.params.id_interessado,
            ...request.body
        }

        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.ADMINISTRADOR) === -1)
            return response.send(401);

        this.Interactor
            .getInteressado(body)
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, error);
            });
    }

    updateInteressado(request, response) {
        const body = {
            id: request.params.id,
            ...request.body
        }

        delete body._id;

        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.ADMINISTRADOR) === -1)
            return response.send(401);

        this.Interactor
            .updateInteressado(body)
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, error);
            });
    }

    deleteInteressado(request, response) {
        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.ADMINISTRADOR) === -1)
            return response.send(401);

        this.Interactor
            .delete(request.params.id)
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, error);
            });
    }

    // ## INTERESSE ##
    // RFI13: POST /interessados/:id_interessado}/menores
    postInterested(request, response) {
        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.ADMINISTRADOR) === -1)
            return response.send(401);

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
                    response.send(500, error);
                    response.send(400, error)
                });
        }
        else{
            this.Interactor.fetchAllTypeInterest(id)
                .then(message => {
                    response.send(200, message);
                })
                .catch(error => {
                    response.send(500, error);
                    response.send(400, error)
                });
        }
    }

    // ## VISUALIZAÇÕES ##
    // RFI09: POST /interessados/{id_interessado}/visualizacoes
    postVisualizacao(request, response) {
        response.send(501);
    }

    // RFI11: PUT /interessados/{id_interessado}/visualizacoes
    updateVisualizacao(request, response) {
        response.send(501);
    }

    getVisualizacoes(request, response) {
        response.send(501);
    }

    // ## DOCUMENTOS ##
    getDocuments(request, response) {
        const body = {
            id: request.params.id_interessado,
            ...request.body
        }

        this.Interactor
			.getDocuments(body)
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, error);
            })
    }
}
