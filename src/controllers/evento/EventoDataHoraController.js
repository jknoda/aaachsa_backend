const EventoDataHora = require('../../models/evento/EventoDataHora');
const errDB = require('../common/_sendErrorsDB');

module.exports = {

    
    async findAll(req,res){
        const retorno = await EventoDataHora.findAll();
        return res.json(retorno);
    }
}
