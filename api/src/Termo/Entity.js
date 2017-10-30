"use strict";

import Joi from "joi";

export default class Entity {
    constructor(deps = {}) {
		this.Adapter = deps.Adapter || new(require("./Adapter").default)();
    }

    get() {
        return this.Adapter.get();
    }
}