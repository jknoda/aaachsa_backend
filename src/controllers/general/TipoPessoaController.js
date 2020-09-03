const TipoPessoa = require('../../models/general/TipoPessoa');
const errDB = require('../common/_sendErrorsDB');

module.exports = {
    async create(req, res) {
        const { EmpIdf, TPessoaCod, TPessoaDes, AudCodInc, AudDataInc, AudCodAlt, AudDataAlt } = req.body;
        const retorno = await TipoPessoa.create({ EmpIdf, TPessoaCod, TPessoaDes, AudCodInc, AudDataInc, AudCodAlt, AudDataAlt })
            .catch(function (err) {
                return errDB(res, err);
            });
        return res.json(retorno);
    },
    
    async update(req, res) {
        const { EmpIdf, TPessoaCod, TPessoaDes, AudCodAlt, AudDataAlt } = req.body;
        const retorno = await TipoPessoa.update(
            {
                TPessoaDes,
                AudCodAlt,
                AudDataAlt
            }, {
            where: {
                EmpIdf,
                TPessoaCod
            }
        }).catch(function (err) {
            return errDB(res, err);
        });
        return res.json(retorno);
    },

    async delete(req, res) {
        const { EmpIdf, TPessoaCod } = req.body;
        const retorno = await TipoPessoa.destroy(
            {
                where: {
                    EmpIdf,
                    TPessoaCod
                }
            }).catch(function (err) {
                return errDB(res, err);
            });
        return res.json(retorno);
    },

    async findAll(req, res) {
        const { EmpIdf } = req.body;
        const retorno = await TipoPessoa.findAll({
            attributes: ['EmpIdf', 'TPessoaCod', 'TPessoaDes'],
            where: {
                EmpIdf: EmpIdf
            }
        });

        return res.json(retorno);
    }
}
