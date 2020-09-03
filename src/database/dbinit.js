const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const connection = new Sequelize(dbConfig);

const NewsLetter = require('../models/avisos/NewsLetter');
const NewsLetterAnexo=  require('../models/avisos/NewsLetterAnexo');
const QuadroMsg = require('../models/avisos/QuadroMsg');
const Evento = require('../models/evento/Evento');
const EventoData = require('../models/evento/EventoData');
const EventoDataHora = require('../models/evento/EventoDataHora');
const EventoParticipantes = require('../models/evento/EventoParticipantes');
const Empresa = require('../models/general/Empresa');
const Login = require('../models/general/Login');
const Modalidade = require('../models/general/Modalidade');
const Perfil = require('../models/general/Perfil');
const TipoPessoa = require('../models/general/TipoPessoa');
const Pessoa = require('../models/pessoa/Pessoa');
const PessoaModalidade = require('../models/pessoa/PessoaModalidade');
const PessoaPerfil = require('../models/pessoa/PessoaPerfil');
const PessoaTipo = require('../models/pessoa/PessoaTipo');
const Treino = require('../models/treino/Treino');
const TreinoParticipante = require('../models/treino/TreinoParticipante');
const Album = require('../models/galeria/Album')
const Galeria = require('../models/galeria/Galeria');

NewsLetter.init(connection);
NewsLetterAnexo.init(connection);
QuadroMsg.init(connection);
Evento.init(connection);
EventoData.init(connection);
EventoDataHora.init(connection);
EventoParticipantes.init(connection);
Empresa.init(connection);
Login.init(connection);
Modalidade.init(connection);
Perfil.init(connection);
TipoPessoa.init(connection);
Pessoa.init(connection);
PessoaModalidade.init(connection);
PessoaPerfil.init(connection);
PessoaTipo.init(connection);
Treino.init(connection);
TreinoParticipante.init(connection);
Album.init(connection);
Galeria.init(connection);

module.exports = connection;