const Empresa = require('../../models/general/Empresa');
const errDB = require('../common/_sendErrorsDB');

module.exports = {
    async create(req, res) {
        const { EmpIdf, EmpNome } = req.body;

        const empresas = await Empresa.create({ EmpIdf, EmpNome })
            .catch(function (err) {
                return errDB(res, err);
            });
        return res.json(empresas);
    },

    async findAll(req, res) {
        const empresas = await Empresa.findAll(
            {
                attributes: ['EmpIdf', 'EmpNome'],
            }
        );
        return res.json(empresas);
    }
}
