"use strict";

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