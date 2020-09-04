const Empresa = require('../../models/general/Empresa');
const errDB = require('../common/_sendErrorsDB');
const { templateSettings } = require('lodash');

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

    teste(eq,res) {
        return res.json({retorno:'api ok'})
    }
}
