"use strict";

import mongoose from "mongoose";

export default class Adapter {

	constructor(deps = {}) {
		this.Menor = mongoose.model("Menor");
	}

	save(body) {
		const menor = new this.Menor(body);
		return menor.save();
	}

	fetchAll() {
		return this.Menor.find((err, doc) => {
			return new Promise((resolve, reject) => {
				resolve(doc);
			});
		});
	}

	fetchById(id) {
		return this.Menor.findById(id);
	}

	fetchAndUpdate() {
		return this.Menor.findOneAndUpdate({
			_id: body.id
		}, {
			new: true
		}, body, (err, menor) => {
			return menor;
		});
	}

	fetchOrdination() {

	}

	addIntersting() {
		return this.Menor.findOneAndUpdate({
			_id: body.id
		});
	}

	fetchAllIntersting() {

	}

	removeIntersting() {

	}

	createImage() {

	}

	fetchAllImage() {

	}

	fetchImage() {

	}

	removeImage() {

	}

	createVideo() {

	}

	fetchAllVideo() {

	}

	fetchVideo() {

	}

	removeVideo() {

	}

}