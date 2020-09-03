const express = require('express');
const auth = require('./auth')
//const routes = express.Router();

module.exports = function (server) {
    /*
    * API Protegidas - rotas protegidas por Token JWT
    */
    const protectedApi = express.Router();
    server.use('/api', protectedApi);

    //protectedApi.use(auth);

    // Avisos
    const NewsLetterAnexoController = require('../controllers/avisos/NewsLetterAnexoController');
    const NewsLetterController = require('../controllers/avisos/NewsLetterController');
    const QuadroMsgController = require('../controllers/avisos/QuadroMsgController');

    // Evento
    const EventoController = require('../controllers/evento/EventoController');
    protectedApi.post('/eventos/summary', EventoController.summary);

    const EventoDataController = require('../controllers/evento/EventoDataController');
    const EventoDataHoraController = require('../controllers/evento/EventoDataHoraController');
    const EventoParticipantesController = require('../controllers/evento/EventoParticipantesController');

    // General
    const GeneralController = require('../controllers/general/GeneralController');
    protectedApi.post('/general/summary', GeneralController.summary);

    const EmpresaController = require('../controllers/general/EmpresaController');
    protectedApi.post('/empresas', EmpresaController.create);
    protectedApi.get('/empresas/todas', EmpresaController.findAll);

    const ModalidadeControler = require('../controllers/general/ModalidadeController');
    protectedApi.post('/modalidades/incluir', ModalidadeControler.create);
    protectedApi.post('/modalidades/alterar', ModalidadeControler.update);
    protectedApi.post('/modalidades/excluir', ModalidadeControler.delete);
    protectedApi.post('/modalidades/todas', ModalidadeControler.findAll);

    const PerfilController = require('../controllers/general/PerfilController');
    protectedApi.post('/perfis/incluir', PerfilController.create);
    protectedApi.post('/perfis/alterar', PerfilController.update);
    protectedApi.post('/perfis/excluir', PerfilController.delete);
    protectedApi.post('/perfis/todas', PerfilController.findAll);


    const TipoPessoaController = require('../controllers/general/TipoPessoaController');
    protectedApi.post('/tipospessoas/incluir', TipoPessoaController.create);
    protectedApi.post('/tipospessoas/alterar', TipoPessoaController.update);
    protectedApi.post('/tipospessoas/excluir', TipoPessoaController.delete);
    protectedApi.post('/tipospessoas/todas', TipoPessoaController.findAll);

    // Album
    const AlbumController = require('../controllers/album/AlbumController');
    protectedApi.post('/albuns/incluir', AlbumController.create);
    protectedApi.post('/albuns/alterar', AlbumController.update);
    protectedApi.post('/albuns/excluir', AlbumController.delete);
    protectedApi.post('/albuns/todas', AlbumController.findAll);
    protectedApi.post('/albuns/completo', AlbumController.findAllComplete);

    // Pessoa
    const PessoaController = require('../controllers/pessoa/PessoaController');
    protectedApi.post('/pessoas/incluir', PessoaController.create);
    protectedApi.post('/pessoas/alterar', PessoaController.update);
    protectedApi.post('/pessoas/excluir', PessoaController.delete);
    protectedApi.post('/pessoas/todas', PessoaController.findAll);
    protectedApi.post('/pessoas/completo', PessoaController.findAllComplete);
    protectedApi.post('/pessoas/summary', PessoaController.summary);

    const PessoaModalidadeController = require('../controllers/pessoa/PessoaModalidadeController');
    const PessoaPerfilController = require('../controllers/pessoa/PessoaPerfilController');
    const PessoaTipoController = require('../controllers/pessoa/PessoaTipoController');

    // Treino
    const TreinoController = require('../controllers/treino/TreinoController');
    protectedApi.post('/treinos/summary', TreinoController.summary);
    protectedApi.post('/treinos/completo', TreinoController.findAllComplete);

    const TreinoParticipanteController = require('../controllers/treino/TreinoParticipanteController');

    // Upload
    //const UploadController = require('../controllers/upload/UploadController')
    //protectedApi.post('/upload', UploadController.salvarGaleria);
    const UploadController = require('../controllers/upload/UploadFileController')
    protectedApi.post('/upload', UploadController.upload);

    /*
    * API Públicas - rotas abertas
    */
    const openApi = express.Router();
    server.use('/oapi', openApi);

    const LoginController = require('../controllers/general/LoginController');
    openApi.post('/login', LoginController.login);
    openApi.post('/signup', LoginController.signup);
    openApi.post('/validateToken', LoginController.validateToken);

}

