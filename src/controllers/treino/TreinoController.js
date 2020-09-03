const Treino = require('../../models/treino/Treino');

const TreinoPart = require('../../models/treino/TreinoParticipante')
const Pessoa = require('../../models/pessoa/Pessoa')

const errDB = require('../common/_sendErrorsDB');
const { where, col, literal } = require('sequelize');

module.exports = {
    async findAllComplete(req, res) {
        const { EmpIdf } = req.body;

        Treino.hasMany(TreinoPart);
        TreinoPart.belongsTo(Treino);
        TreinoPart.hasOne(Pessoa);
        Pessoa.belongsTo(TreinoPart);
        Treino.hasOne(Pessoa);
        Pessoa.belongsTo(Treino);
        const retorno = await Treino.findAll({
            attributes: ['EmpIdf', 'TrnCod', 'TrnDes', 'ModCod', 'TrnDataInicial','TrnHoraInicial', 'TrnDataFinal','TrnHoraFinal','TrnResp','TrnRel',
                [literal("(SELECT pesnome FROM pessoa WHERE pessoa.empidf = treino.empidf AND pessoa.pescod = treino.trnresp LIMIT 1)"), 'Responsavel'],
                [literal("(SELECT moddes FROM modalidade WHERE modalidade.empidf = treino.empidf AND modalidade.modcod = treino.modcod LIMIT 1)"), 'ModDes']],                
            include: [{
                model: TreinoPart,
                on: {
                    a: where(col("Treino.EmpIdf"), "=", col("TreinoParticipantes.EmpIdf")),
                    b: where(col("Treino.TrnCod"), "=", col("TreinoParticipantes.TrnCod"))
                },
                attributes: ['EmpIdf', 'PesCod', 'TrnParObs',
                    [literal("(SELECT pesnome FROM pessoa WHERE pessoa.empidf = TreinoParticipantes.empidf AND pessoa.pescod = TreinoParticipantes.pescod LIMIT 1)"), 'PesNome']],
            }],
            where: {
                EmpIdf: EmpIdf
            }
        }).catch(function (err) {
            return errDB(res, err);
        });

        return res.json(retorno);
    },


    
    async findAll(req,res){
        const retorno = await Treino.findAll();
        return res.json(retorno);
    },

    async summary(req,res){
        const { EmpIdf } = req.body;

        const retorno = await Treino.count({
            where: {
                EmpIdf: EmpIdf
              }
          })
        .catch(function (err) {
            return errDB(res, err);
        });
        return res.json(retorno);
    }
}
