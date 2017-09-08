"use strict";

import { config } from './config';

// Conexão com o MondoDB via Mongoose
// http://mongoosejs.com/
// An elegant mongodb object modeling for Node.js.
// Mongoose provides a straight-forward, schema-based solution to model your application data.
// It includes built-in type casting, validation, query building, business logic hooks and more,
// out of the box.
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("./database.js");

// Criação do HTTP server usando o framework Restify
// http://restify.com/
// A Node.js web service framework optimized for building semantically correct RESTful web services
// ready for production use at scale. restify optimizes for introspection and perfromance, and is
// used in some of the largest Node.js deployments on Earth.
import restify from "restify";
const server = restify.createServer({
    name: "adocoes",
    version: "0.1.0"
});
const port = process.env.PORT || 8888;

import bodyParser from "body-parser";
server.pre(restify.pre.sanitizePath());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
const charSet = config.charSet;

server.get("/", function (req, res) {
    const moment = require("moment");
    var now = moment();
    console.log("Adoções API em execução: " + req.headers);
    res.charSet(charSet);
    res.json(200, {
        estado: "Adoções API em execução há " + process.uptime() + " segundos",
        momento: now.toString()
    });
});

// Módulos do OAuth2
import AuthManager from "./Auth/authManager";
import Oauth2Manager from "./Auth/oauth2Manager";
import Cliente from './Model/Auth/cliente';
import Token from './Model/Auth/token';

//
// Resource: token
//

// P0
// RFS01: POST /oauth
server.post("/oauth", AuthManager.isClientAuthenticated, Oauth2Manager.token);

// Módulos de negócio da API Adoções
import UsuarioTranslator from "./Usuario/Translator";
import ConteudoTranslator from "./Conteudo/Translator";
import MenorTranslator from "./Menor/Translator";
import InteressadoTranslator from "./Interessado/Translator";

//
// Resource: usuario
//

// P0
// RFU01: POST /usuarios
server.post("/usuarios", AuthManager.isAuthenticated, function (req, res) {
    const usuarioTranslator = new UsuarioTranslator();
    usuarioTranslator.post(req, res);
});

// P1
// RFU02: GET /usuarios
server.get("/usuarios", AuthManager.isAuthenticated, function (req, res) {
    const usuarioTranslator = new UsuarioTranslator();
    usuarioTranslator.fetchAll(req, res);
});

// P0
// RFU03: GET /usuarios/:id_usuario
server.get("/usuarios/:id_usuario", AuthManager.isAuthenticated, function (req, res) {
    const usuarioTranslator = new UsuarioTranslator();
    usuarioTranslator.getById(req, res);
});

// P1
// RFU04: PUT /usuarios/:id_usuario
server.put("/usuarios/:id_usuario", AuthManager.isAuthenticated, function (req, res) {
    const usuarioTranslator = new UsuarioTranslator();
    usuarioTranslator.put(req, res);
});

// P1
// RFU05: DELETE /usuarios/:id_usuario
server.del("/usuarios/:id_usuario", AuthManager.isAuthenticated, function (req, res) {
    const usuarioTranslator = new UsuarioTranslator();
    usuarioTranslator.delete(req, res);
});

// P1
// RFU06: GET /usuarios/:id_usuario/perfis 
server.get("/usuarios/:id_usuario/perfis", AuthManager.isAuthenticated, function (req, res) {
    const usuarioTranslator = new UsuarioTranslator();
    usuarioTranslator.getPerfilByUsuarioId(req, res);
});

// P1
// RFU09: PUT /usuarios/:id_usuario/perfis
server.put("/usuarios/:id_usuario/perfis", AuthManager.isAuthenticated, function (req, res) {
    const usuarioTranslator = new UsuarioTranslator();
    usuarioTranslator.updatePerfilUsuario(req, res);
});

//
// Resource: perfil
//

// RFP01 (2017-2): POST /perfis
// RFP02 (2017-2): GET /perfis
// RFP03 (2017-2): GET /perfis/:id_perfil
// RFP04 (2017-2): PUT /perfis/:id_perfil
// RFP05 (2017-2): DELETE /perfis/:id_perfil
// RFP06 (2017-2): GET /perfis/:id_perfil/usuarios
// RFP07 (2017-2): POST /perfis/:id_perfil/usuarios
// RFP08 (2017-2): DELETE /perfis/:id_perfil/usuarios/:id_usuario

//
// Resource: menor
//

// P1
// RFM01: POST /menores
server.post("/menores", AuthManager.isAuthenticated, function (req, res) {
    const menorTranslator = new MenorTranslator();
    menorTranslator.post(req, res);
});

// P0
// RFM02: GET /menores
// RFM06: GET /menores?idade=:idade,sexo=:sexo
server.get("/menores", AuthManager.isAuthenticated, function (req, res) {
    const menorTranslator = new MenorTranslator();
    menorTranslator.get(req, res);
});

// P0
// RFM03: GET /menores/:id_menor
server.get("/menores/:id_menor", AuthManager.isAuthenticated, function (req, res) {
    const menorTranslator = new MenorTranslator();
    menorTranslator.getMenor(req, res);
});

// P1
// RFM04: PUT /menores/:id_menor
server.put("/menores/:id_menor", AuthManager.isAuthenticated, function (req, res) {
    const menorTranslator = new MenorTranslator();
    menorTranslator.updateMenor(req, res);
});

// P1
// RFM05: DELETE /menores/:id_menor
server.del("/menores/:id_menor", AuthManager.isAuthenticated, function (req, res) {
    const menorTranslator = new MenorTranslator();
    menorTranslator.deleteMenor(req, res);
});

// P0
// RFM07: POST /menores/:id_menor/interessados
server.post("/menores/:id_menor/interessados", AuthManager.isAuthenticated, function (req, res) {
    const menorTranslator = new MenorTranslator();
    menorTranslator.postInteressado(req, res);
});

// P1
// RFM08: GET /menores/:id_menor/interessados
server.get("/menores/:id_menor/interessados", AuthManager.isAuthenticated, function (req, res) {
    const menorTranslator = new MenorTranslator();
    menorTranslator.getInteressado(req, res);
});

// P1
// RFM09: DELETE /menores/:id_menor/interessados/:id_interessado
server.del("/menores/:id_menor/interessados/:id_interessado", AuthManager.isAuthenticated, function (req, res) {
    const menorTranslator = new MenorTranslator();
    menorTranslator.deleteInteressado(req, res);
});

// P1
// RFM10: POST /menores/:id_menor/midias
server.post("/menores/:id_menor/midias", AuthManager.isAuthenticated, function (req, res) {
    const menorTranslator = new MenorTranslator();
    menorTranslator.postMidia(req, res);
});
server.post("/menores/:id_menor/midias/:id_midia/midia", AuthManager.isAuthenticated, function (req, res) {
    const menorTranslator = new MenorTranslator();
    menorTranslator.postMidiaConteudo(req, res);
});

// P0
// RFM11: GET /menores/:id_menor/midias
server.get("/menores/:id_menor/midias", AuthManager.isAuthenticated, function (req, res) {
    const menorTranslator = new MenorTranslator();
    menorTranslator.getAllImagens(req, res);
});

// P0
// RFM12: GET /menores/:id_menor/midias/:id_midia
server.get("/menores/:id_menor/midias/:id_midia", AuthManager.isAuthenticated, function (req, res) {
    const menorTranslator = new MenorTranslator();
    menorTranslator.getMidiaById(req, res);
});

// P1
// RFM13: DELETE /menores/:id_menor/midias/:id_midia
server.del("/menores/:id_menor/midias/:id_midia", AuthManager.isAuthenticated, function (req, res) {
    const menorTranslator = new MenorTranslator();
    menorTranslator.deleteMidia(req, res);
});

// RFM18 (2017-2): PUT /menores/:id_menor (seta o id_abrigo)
// RFM09 (2017-2): POST /menores/:id_menor/processos
// RFM20 (2017-2): GET /menores/:id_menor/processos
// RFM21 (2017-2): GET /menores/:id_menor/processos/:id_processo
// RFM22 (2017-2): DELETE /menores/:id_menor/processos/:id_processo

//    
// Resource: interessado
//

// P1
// RFI01: POST /interessados
server.post("/interessados", AuthManager.isAuthenticated, function (req, res) {
    const interessadoTranslator = new InteressadoTranslator();
    interessadoTranslator.post(req, res);
});

// P0
// RFI02: GET /interessados
server.get("/interessados", AuthManager.isAuthenticated, function (req, res) {
    const interessadoTranslator = new InteressadoTranslator();
    interessadoTranslator.getInteressados(req, res);
});

// P0
// RFI03: GET /interessados/:id_interessado
server.get("/interessados/:id_interessado", AuthManager.isAuthenticated, function (req, res) {
    const interessadoTranslator = new InteressadoTranslator();
    interessadoTranslator.getInteressado(req, res);
});

// P0
// RFI04: PUT /interessados/:id_interessado
server.put("/interessados/:id_interessado", AuthManager.isAuthenticated, function (req, res) {
    const interessadoTranslator = new InteressadoTranslator();
    interessadoTranslator.updateInteressado(req, res);
});

// P1
// RFI05: DELETE /interessados/:id_interessado
server.del("/interessados/:id_interessado", AuthManager.isAuthenticated, function (req, res) {
    let interessadoTranslator = new InteressadoTranslator();
    interessadoTranslator.deleteInteressado(req, res);
});

// P0
// RFI09: POST /interessados/:id_interessado/visualizacoes
server.post("/interessados/:id_interessado/visualizacoes", AuthManager.isAuthenticated, function (req, res) {
    const interessadoTranslator = new InteressadoTranslator();
    interessadoTranslator.postVisualizacao(req, res);
});

// P1
// RFI10: GET /interessados/:id_interessado/visualizacoes
server.get("/interessados/:id_interessado/visualizacoes", AuthManager.isAuthenticated, function (req, res) {
    const interessadoTranslator = new InteressadoTranslator();
    interessadoTranslator.getVisualizacoes(req, res);
});

// P0
// RFI11: PUT /interessados/:id_interessado/visualizacoes
server.put("/interessados/:id_interessado/visualizacoes", AuthManager.isAuthenticated, function (req, res) {
    const interessadoTranslator = new InteressadoTranslator();
    interessadoTranslator.updateVisualizacao(req, res);
});

// P0
// RFI13: POST /interessados/:id_interessado}/menores
server.post("/interessados/:id_interessado/menores", AuthManager.isAuthenticated, function (req, res) {
    const interessadoTranslator = new InteressadoTranslator();
    interessadoTranslator.postMenor(req, res);
});

// P0
// RFI14: GET /interessados/:id_interessado/menores
server.get("/interessados/:id_interessado/menores", AuthManager.isAuthenticated, function (req, res) {
    const interessadoTranslator = new InteressadoTranslator();
    interessadoTranslator.getMenores(req, res);
});

// P0
// RFI15: DELETE /interessados/:id_interessado/menores/:id_menor
server.del("/interessados/:id_interessado/menores/:id_menor", AuthManager.isAuthenticated, function (req, res) {
    const interessadoTranslator = new InteressadoTranslator();
    interessadoTranslator.deleteMenor(req, res);
});

// RFI16 (2017-2): POST /interessados/:id_interessado/menores/:id_menor/compartilhamentos
// RFI17 (2017-2): GET /interessados/:id_interessado/mensagens
// RFI18 (2017-2): PUT /usuarios/:id_usuario/mensagens
// RFI19 (2017-2): POST /interessados/:id_interessado/documentos
// RFI20 (2017-2): GET /interessados/:id_interessado/documentos
// RFI21 (2017-2): GET /interessados/:id_interessado/documentos/:id_documento

//
//resource: Conteudos
//

// P1
// RFC01: POST /conteudos
server.post("/conteudos", AuthManager.isAuthenticated, function (req, res) {
    const conteudoTranslator = new ConteudoTranslator();
    conteudoTranslator.postConteudo(req, res);
});
server.post("/conteudos/:id_conteudo/pagina", AuthManager.isAuthenticated, function (req, res) {
    const conteudoTranslator = new ConteudoTranslator();
    conteudoTranslator.postConteudoPagina(req, res);
});

// P0
// RFC02: GET /conteudos
server.get("/conteudos", AuthManager.isAuthenticated, function (req, res) {
    const conteudoTranslator = new ConteudoTranslator();
    conteudoTranslator.getConteudos(req, res);
});

// P1
// RFC03: PUT /conteudos/:id_conteudo
server.put("/conteudos/:id_conteudo", AuthManager.isAuthenticated, function (req, res) {
    const conteudoTranslator = new ConteudoTranslator();
    conteudoTranslator.updateConteudo(req, res);
});

// P1
// RFC04: DELETE /conteudos/:id_conteudo
server.del("/conteudos/:id_conteudo", AuthManager.isAuthenticated, function (req, res) {
    const conteudoTranslator = new ConteudoTranslator();
    conteudoTranslator.deleteConteudo(req, res);
});

// P1
// RFC05: POST /conteudos/:id_conteudo/midias
server.post("/conteudos/:id_conteudo/midias", AuthManager.isAuthenticated, function (req, res) {
    const conteudoTranslator = new ConteudoTranslator();
    conteudoTranslator.postConteudoMidia(req, res);
});
// Post com multipart-form-data
server.post("/conteudos/:id_conteudo/midias/:id_midia/midia", AuthManager.isAuthenticated, function (req, res) {
    const conteudoTranslator = new ConteudoTranslator();
    conteudoTranslator.postConteudoMidiaConteudo(req, res);
});

// P0
// RFC06: GET /conteudos/:id_conteudo/midias
server.get("/conteudos/:id_conteudo/midias", AuthManager.isAuthenticated, function (req, res) {
    const conteudoTranslator = new ConteudoTranslator();
    conteudoTranslator.getConteudoMidias(req, res);
});

// P0
// RFC07: GET /conteudos/:id_conteudo/midias/:id_midia
server.get("/conteudos/:id_conteudo/midias/:id_midia", AuthManager.isAuthenticated, function (req, res) {
    const conteudoTranslator = new ConteudoTranslator();
    conteudoTranslator.deleteConteudoMidia(req, res);
});

// P1
// RFC08: DELETE /conteudos/:id_conteudo
server.del("/conteudos/:id_conteudo/midias/:id_midia", AuthManager.isAuthenticated, function (req, res) {
    const conteudoTranslator = new ConteudoTranslator();
    conteudoTranslator.deleteConteudo(req, res);
});

//
// Resource: mensagem
//

// RFM01 (2017-2): POST /mensagens
// RFM02 (2017-2): GET /mensagens
// RFM03 (2017-2): GET /mensagens?query=data_inicial=:data_inicial&data_final=:data_final
// RFM04 (2017-2): PUT /mensagens/:id_mensagem
// RFM05 (2017-2): POST /mensagens/:id_mensagem/resposta
// RFM06 (2017-2): DELETE /mensagens/:id_mensagem

//
// Resource: abrigo
//

// RFA01 (2017-2): POST /abrigos
// RFA02 (2017-2): GET /abrigos
// RFA03 (2017-2): PUT /abrigos/:id_abrigo
// RFA04 (2017-2): DELETE /abrigos/:id_abrigo

//
// Resource: familia
//

// RFF01 (2017-2): POST /familias
// RFF02 (2017-2): GET /familias
// RFF03 (2017-2): PUT /familias/:id_familia
// RFF04 (2017-2): DELETE /familias/:id_familia

//
// Resource: processo
//

// RFO01 (2017-2): POST /processos
// RFO02 (2017-2): GET /processos
// RFO03 (2017-2): PUT /processos/:id_processo
// RFO04 (2017-2): DELETE /processos/:id_processo
// RFO05 (2017-2): POST /processos/:id_processo/movimentos
// RFO06 (2017-2): GET /processos/:id_processo/movimentos
// RFO07 (2017-2): PUT /processos/:id_processo/movimentos/:id_movimento
// RFO08 (2017-2): DELETE /processos/:id_processo/movimentos/:id_movimento
// Resource: conteudo

server.listen(port);
console.log("Adoções API URI: " + server.url);

module.exports = server;