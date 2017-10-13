"use strict";

import mongoose from "mongoose";

export default class Adapter {

    constructor(deps = {}) {
        this.Menor = mongoose.model("Menor");
        this.Interesse = mongoose.model("Interesse");
        this.Midia = mongoose.model("Midia");
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

    saveMedia(body, id_menor) {
        const media = new this.Midia(body);
        media.save();
        this.Menor.findById(id_menor, (err, menor) => {
            menor.refMidias.push(media._id);
            menor.save();
            console.log(menor.refMidias);
        });
        return media;
    }

    update(id, body) {
        return this.Menor.findOneAndUpdate({
            _id: id
        }, body, {
                upsert: false,
                new: true
            });
    }

    fetchOrdination() {

    }

    postInterested(body) {
        const interesse = new this.Interesse(body);
        return interesse.save();
    }

    fetchAllIntersting(id_menor) {

        return this.Interesse.aggregate([

            { $match: { refMenor: mongoose.Types.ObjectId(id_menor) } },

            { $sort: { refInteressado: 1 } },

            {
                $lookup: {
                    from: "interessados",
                    localField: "refInteressado",
                    foreignField: "refUsuario",
                    as: "interessados"
                }
            }
        ])
    };

    fetchAllMediasFilteringBlur(id_menor, acceptBlur) {
        //Retorna o objeto de menor adicionado o obj mídias
        const menor = this.Menor.findById(id_menor, "+midias");

        return new Promise((resolve, rjct) => {
            const body = menor.then((body) => {
                return body.midias.filter((m) => {
                    //Verifica se o tipo atual de mídia é "blur"
                    const isBlur = (m.type === "foto-blur");

                    //Habilita o filtro caso o retorno seja de blur e o tipo seja compatível (redução booleana)
                    return acceptBlur === isBlur;
                });
            });

            return resolve(body);
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


    /*deleteMediaById(id_menor, id_midia) {
        console.log("id_menor" + id_menor);
        console.log("id_midia" + id_midia);
        try {
            this.Midia.findById(id_midia, (err, midia) => {
                console.log("gesi 01", midia);
                try {
                    midia.remove();
                    console.log("gesiel try 01");
                } catch (err) {
                    console.log("gesiel catch 1");
                    return 400;
                }
            });
        } catch (err) {
            console.log("gesiel catch 2")
            return 400;
        }
        return this.Menor.findById(id_menor, (err, menor) => {
            try {
                var index = menor.refMidias.indexOf(id_midia);
                menor.refMidias.splice(index, 1);
                menor.save();
            } catch (err) {
                console.log("gesiel deu erro");
            }
        }).then(ret => {
            return ret;
        });
    }*/

    deleteMediaById(id_menor, id_midia) {
        return this.Menor.update(
            { _id: id_menor },
            { $pull: { refMidias: id_midia } },
            { multi: false }
        );
    }
}