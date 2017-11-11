"use strict";

import Roles from '../Common/Roles';

export default class Translator {
    constructor(deps = {}) {
        this.Interactor = deps.Interactor || new (require("../Interessado/Interactor").default)();
    }

    fetchAllTypeInterest(request, response) {
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
}