"use strict";

export const config = {
  "develop": {
    databaseUri: "mongodb://localhost:27017/Adocoes"
  },
  "test": {
    databaseUri: "mongodb://localhost:27017/AdocoesTest"
  },
  "homo": {
    databaseUri: "mongodb://ages-adocoes:ages-adocoes@ds235775.mlab.com:35775/ages-adocoes"
  },
  "prod": {
    databaseUri: "mongodb://administrador:adocoesages2017@123@ds119302.mlab.com:19302/adocoes"
  },
  "charSet": "utf-8"
};
