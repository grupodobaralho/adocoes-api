export default class MoongoseHelper {

    /*
     * @param schema MoongoseSchema | Moongose schema
     * @param pipeline Array | Lista de pipelines para utilizar no `aggregate`
     */
    static aggregate(schema, pipeline) {
        return new Promise((resolve, reject) => {
            let data = [];

            schema
                .aggregate(pipeline)
                .cursor()
                .exec()
                .on("data", (doc) => { 
                    data.push(doc); 
                })
                .on("end", () => { 
                    resolve(data) 
                });
        });
    }
}