const PessoaTipo = require('../../models/pessoa/PessoaTipo');
const errDB = require('../common/_sendErrorsDB');

module.exports = {
    async create(req, res) {
        this.insert(req.body, res).catch(function (err) {
            return errDB(res, err, 'Create PessoaTipo');
        });
    },

    async insert(dados, res) {
        const { EmpIdf, PesCod, TPessoaCod, PesTipObs, AudCodInc, AudDataInc } = dados;
        const retorno = await PessoaTipo.create(
            {
                EmpIdf, PesCod, TPessoaCod, PesTipObs, AudCodInc, AudDataInc
            }
        ).catch(function (err) {
            throw err;
        });
        return res.json(retorno);
    },

    async delete(dados, res) {
        const { EmpIdf, PesCod } = dados;
        const retorno = await PessoaTipo.destroy(
            {
                where: {
                    EmpIdf,
                    PesCod
                }
            }).catch(function (err) {
                return errDB(res, err, 'Delete PessoaTipo');
            });
        return res.json(retorno);
    },

    async findAll(req, res) {
        const retorno = await PessoaTipo.findAll();
        return res.json(retorno);
    }
}
