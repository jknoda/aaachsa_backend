const NewsLetterAnexo = require('../../models/avisos/NewsLetterAnexo');
const errDB = require('../common/_sendErrorsDB');

module.exports = {


    async findAll(req,res){
        const retorno = await NewsLetterAnexo.findAll();
        return res.json(retorno);
    }
}
