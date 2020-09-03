const PessoaPerfil = require('../../models/pessoa/PessoaPerfil');
const errDB = require('../common/_sendErrorsDB');

module.exports = {
    async create(req, res) {
        this.insert(req.body, res).catch(function (err) {
            return errDB(res, err, 'Create PessoaPerfil');
        });
    },

    async insert(dados, res) {
        const { EmpIdf, PesCod, PerfilCod, PesPerObs, AudCodInc, AudDataInc } = dados;
        const retorno = await PessoaPerfil.create(
            {
                EmpIdf, PesCod, PerfilCod, PesPerObs, AudCodInc, AudDataInc
            }
        ).catch(function (err) {
            throw err;
        });
        return res.json(retorno);
    },

    async delete(dados, res) {
        const { EmpIdf, PesCod } = dados;
        const retorno = await PessoaPerfil.destroy(
            {
                where: {
                    EmpIdf,
                    PesCod
                }
            }).catch(function (err) {
                return errDB(res, err, 'Delete PessoaPerfil');
            });
        return res.json(retorno);
    },

    async findAll(req, res) {
        const retorno = await PessoaPerfil.findAll();
        return res.json(retorno);
    }
}
