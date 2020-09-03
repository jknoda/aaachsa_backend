const Perfil = require('../../models/general/Perfil');
const errDB = require('../common/_sendErrorsDB');

module.exports = {
    async create(req, res) {
        const { EmpIdf, PerfilCod, PerfilDes, AudCodInc, AudDataInc, AudCodAlt, AudDataAlt } = req.body;
        const retorno = await Perfil.create({ EmpIdf, PerfilCod, PerfilDes, AudCodInc, AudDataInc, AudCodAlt, AudDataAlt })
            .catch(function (err) {
                return errDB(res, err);
            });
        return res.json(retorno);
    },

    async update(req, res) {
        const { EmpIdf, PerfilCod, PerfilDes, AudCodAlt, AudDataAlt } = req.body;
        const retorno = await Perfil.update(
            {
                PerfilDes,
                AudCodAlt,
                AudDataAlt
            }, {
            where: {
                EmpIdf,
                PerfilCod
            }
        }).catch(function (err) {
            return errDB(res, err);
        });
        return res.json(retorno);
    },

    async delete(req, res) {
        const { EmpIdf, PerfilCod } = req.body;
        const retorno = await Perfil.destroy(
            {
                where: {
                    EmpIdf,
                    PerfilCod
                }
            }).catch(function (err) {
                return errDB(res, err);
            });
        return res.json(retorno);
    },

    async findAll(req, res) {
        const { EmpIdf } = req.body;
        const retorno = await Perfil.findAll({
            attributes: ['EmpIdf', 'PerfilCod', 'PerfilDes'],
            where: {
                EmpIdf: EmpIdf
            }
        });

        return res.json(retorno);
    }
}
