const QuadroMsg = require('../../models/avisos/QuadroMsg');
const errDB = require('../common/_sendErrorsDB');

module.exports = {

    
    async findAll(req,res){
        const retorno = await QuadroMsg.findAll();
        return res.json(retorno);
    }
}
