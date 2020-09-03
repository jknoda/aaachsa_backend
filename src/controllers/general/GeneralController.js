const Pessoa = require('../../models/pessoa/Pessoa');
const Treino = require('../../models/treino/Treino');
const Evento = require('../../models/evento/Evento');
const errDB = require('../common/_sendErrorsDB');

module.exports = {
    async summary(req,res){
        const { EmpIdf } = req.body;

        const pessoa = await Pessoa.count({
            where: {
                EmpIdf: EmpIdf
              }
          })
        .catch(function (err) {
            return errDB(res, err);
        });
        const treino = await Treino.count({
            where: {
                EmpIdf: EmpIdf
              }
          })
        .catch(function (err) {
            return errDB(res, err);
        });
        const evento = await Evento.count({
            where: {
                EmpIdf: EmpIdf
              }
          })
        .catch(function (err) {
            return errDB(res, err);
        });

        const retorno = {atletas:pessoa,treinos:treino,eventos:evento};
        return res.json(retorno);
    }

}
