const EventoParticipantes = require('../../models/evento/EventoParticipantes');
const errDB = require('../common/_sendErrorsDB');

module.exports = {

    
    async findAll(req,res){
        const retorno = await EventoParticipantes.findAll();
        return res.json(retorno);
    }
}
