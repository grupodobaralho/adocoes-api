"use strict";

import mongoose from "mongoose";

export default class Adapter {

    constructor(deps = {}) {
        this.Menor = mongoose.model("Menor");
        this.Interesse = mongoose.model("Interesse");
    }

    save(body) {
        const menor = new this.Menor(body);
        return menor.save();
    }

    delete(_id) {
        return this.Menor.remove({
                _id
            })
            .then(resultado => {
                return resultado.result.n > 0;
            });
    }

    deleteInterested(body) {
        return this.Interesse
            .remove({
                refMenor: body.refMenor,
                refInteressado: body.refInteressado
            })
            .then(ret => {
                return ret.result.n > 0;
            });
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

    postInterested(body) {
        const interesse = new this.Interesse(body);
        return interesse.save();
    }

    fetchAllIntersting(id_menor) {
        return this.Interesse.find({
            //refMenor: { $ne: id_menor }
            refMenor: id_menor
                //refMenor: { $eq: id_menor }
                //refMenor: { $eq: "59c1c39b38115b1d9cf43c4b" }
        });
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