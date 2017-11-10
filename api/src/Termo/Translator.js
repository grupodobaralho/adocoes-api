"use strict";

import Roles from '../Common/Roles';

export default class Translator {
    constructor(deps = {}) {
        this.Interactor = deps.Interactor || new (require("./Interactor").default)();
    }

    get(request, response) {
        this.Interactor.get()
            .then(body => {
                response.send(200, body);
            })
            .catch(error => {
                response.send(500, error);
            });
    }
    
    post(request, response) {
        let body = request.body.body;

        //Check if the current user has permission to perform this action
        if (request.user.perfis.indexOf(Roles.ADMINISTRADOR) === -1)
            return response.send(401);

        //Ação padrão para resultado do interactor
        this.Interactor.post(body)
            .then(message => {
                response.send(200, message);
            })
            .catch(error => {
                response.send(500, error);
            });
    }
}