"use strict";

export default class Interactor {
    constructor(deps = {}) {
		this.Entity = deps.Entity || new(require("./Entity").default)();
    }

    get() {
        return this.Entity.get();
    }

    post(body) {
        let bag = {
            //Adiciona a data junto com o "corpo" que veio do Translator
            timeStamp: Date.now(),

            body: body
        };

        return this.Entity.validate(bag).then(validatedBag => {
            return this.Entity.post(validatedBag);
        })
    }
}