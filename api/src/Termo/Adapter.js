"use strict";

import mongoose from "mongoose";

export default class Adapter {
  constructor(deps = {}) {
    this.Termo = mongoose.model("Termo");
  }

  get() {
    return this.Termo.findOne();
  }
}
