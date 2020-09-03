const NewsLetter = require('../../models/avisos/NewsLetter');
const errDB = require('../common/_sendErrorsDB');

module.exports = {

    
    async findAll(req,res){
        const retorno = await NewsLetter.findAll();
        return res.json(retorno);
    }
}
