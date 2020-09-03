const Evento = require('../../models/evento/Evento');
const errDB = require('../common/_sendErrorsDB');

module.exports = {
    async findAll(req,res){
        const retorno = await Evento.findAll();
        return res.json(retorno);
    },

    async summary(req,res){
        const { EmpIdf } = req.body;

        const retorno = await Evento.count({
            where: {
                EmpIdf: EmpIdf
              }
          })
        .catch(function (err) {
            return res.status(500).json(err);
        });
        return res.json(retorno);
    }

}
