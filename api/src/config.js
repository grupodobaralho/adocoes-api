"use strict";

export const config = {
  "develop": {
    databaseUri: "mongodb://localhost:27017/Adocoes"
  },
  "test": {
    databaseUri: "mongodb://localhost:27017/AdocoesTest"
  },
  "homo": {
    databaseUri: "mongodb://localhost:27017/Adocoes"
  },
  "prod": {
    databaseUri: "mongodb://administrador:adocoesages2017@123@ds119302.mlab.com:19302/adocoes"
  },
  "charSet": "utf-8"
};
