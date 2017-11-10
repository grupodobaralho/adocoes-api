"use strict";

import mongoose from "mongoose";

export default class Adapter {
  constructor(deps = {}) {
    this.Termo = mongoose.model("Termo");
  }

  get() {
    return this.Termo.findOne().sort({timeStamp: -1});
  }

  post(body) {
      const term = new this.Termo(body);
      return term.save();
  }
}
