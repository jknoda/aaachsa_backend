const EventoData = require('../../models/evento/EventoData');
const errDB = require('../common/_sendErrorsDB');

module.exports = {

    
    async findAll(req,res){
        const retorno = await EventoData.findAll();
        return res.json(retorno);
    }
}
