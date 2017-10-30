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
}