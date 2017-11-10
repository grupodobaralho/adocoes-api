"use strict";

import Joi from "joi";

export default class Entity {
    constructor(deps = {}) {
		this.Adapter = deps.Adapter || new(require("./Adapter").default)();
    }

    get() {
        return this.Adapter.get();
    }

    post(body) {
        return this.Adapter.post(body);
    }

    // ## JOI VALIDATIONS ##
    validate(body) {
        const schema = Joi.object({
            body: Joi.string().required(),
            timeStamp: Joi.date().required()
        });

        const { error, value } = Joi.validate(body, schema);

        return new Promise((resolve, reject) => {
            if (error) {
                let messages = error.details.map(e => e.message);
                reject({ status: 400, messages });
            }
            else if (value) {
                resolve(value);
            }
        });
    }
}