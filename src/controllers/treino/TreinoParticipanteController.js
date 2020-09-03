const TreinoParticipante = require('../../models/treino/TreinoParticipante');
const errDB = require('../common/_sendErrorsDB');

module.exports = {

    
    async findAll(req,res){
        const retorno = await TreinoParticipante.findAll();
        return res.json(retorno);
    }
}
