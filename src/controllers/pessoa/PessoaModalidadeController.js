const PessoaModalidade = require('../../models/pessoa/PessoaModalidade');
const errDB = require('../common/_sendErrorsDB');

module.exports = {
    async create(req, res) {
        this.insert(req.body, res).catch(function (err) {
            return errDB(res, err, 'Create PessoaModalidade');
        });
    },

    async insert(dados, res) {
        const { EmpIdf, PesCod, ModCod, PesModObs, PesModInicio, AudCodInc, AudDataInc } = dados;
        const retorno = await PessoaModalidade.create(
            {
                EmpIdf, PesCod, ModCod, PesModObs, PesModInicio, AudCodInc, AudDataInc
            }
        ).catch(function (err) {
            throw err;
        });
        return res.json(retorno);
    },

    async delete(dados, res) {
        const { EmpIdf, PesCod } = dados;
        const retorno = await PessoaModalidade.destroy(
            {
                where: {
                    EmpIdf,
                    PesCod
                }
            }).catch(function (err) {
                return errDB(res, err, 'Delete PessoaModalidade');
            });
        return res.json(retorno);
    },


    async findAll(req, res) {
        const retorno = await PessoaModalidade.findAll();
        return res.json(retorno);
    }
}
