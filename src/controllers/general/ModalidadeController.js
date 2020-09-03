const Modalidade = require('../../models/general/Modalidade');
const errDB = require('../common/_sendErrorsDB');

const { literal } = require('sequelize');

module.exports = {
    async create(req, res) {
        const { EmpIdf, ModCod, ModDes, AudCodInc, AudDataInc, AudCodAlt, AudDataAlt } = req.body;
        const retorno = await Modalidade.create({ EmpIdf, ModCod, ModDes, AudCodInc, AudDataInc, AudCodAlt, AudDataAlt })
            .catch(function (err) {
                return errDB(res, err);
            });
        return res.json(retorno);
    },

    async update(req, res) {
        const { EmpIdf, ModCod, ModDes, AudCodAlt, AudDataAlt } = req.body;
        const retorno = await Modalidade.update(
            {
                ModDes,
                AudCodAlt,
                AudDataAlt
            }, {
            where: {
                EmpIdf,
                ModCod
            }
        }).catch(function (err) {
            return errDB(res, err);
        });
        return res.json(retorno);
    },

    async delete(req, res) {
        const { EmpIdf, ModCod } = req.body;
        const retorno = await Modalidade.destroy(
            {                
                where: {
                    EmpIdf,
                    ModCod
                }
            }).catch(function (err) {
                return errDB(res, err);
            });
        return res.json(retorno);
    },

    async findAll(req, res) {
        const { EmpIdf } = req.body;
        const retorno = await Modalidade.findAll({
            attributes: ['EmpIdf','ModCod','ModDes',[literal("'2020-01-01'"), 'PesModInicio']],
            where: {
                EmpIdf: EmpIdf
            }
        });

        return res.json(retorno);
    }
}
