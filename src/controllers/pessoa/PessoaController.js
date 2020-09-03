const Pessoa = require('../../models/pessoa/Pessoa');

const PessoaTipo = require('../../models/pessoa/PessoaTipo');
const TipoPessoa = require('../../models/general/TipoPessoa');

const errDB = require('../common/_sendErrorsDB');

const PessoaPerfil = require('../../models/pessoa/PessoaPerfil');
const Perfil = require('../../models/general/Perfil');

const PessoaModalidade = require('../../models/pessoa/PessoaModalidade');
const Modalidade = require('../../models/general/Modalidade');

const Login = require('../../models/general/Login');

const { where, col, literal } = require('sequelize');

const PerfilCreate = require('./PessoaPerfilController').insert;
const TipoCreate = require('./PessoaTipoController').insert;
const ModalidadeCreate = require('./PessoaModalidadeController').insert;

const PerfilDelete = require('./PessoaPerfilController').delete;
const TipoDelete = require('./PessoaTipoController').delete;
const ModalidadeDelete = require('./PessoaModalidadeController').delete;

const consts = require('../../config/consts');
const { sequelize, cls } = require('../../models/pessoa/Pessoa');

function tratarPessoa(PessoaTipos, PessoaPerfils, PessoaModalidades, pessoaTipo, pessoaPerfil, pessoaModalidade, EmpIdf) {
    // Tratar Pessoas Tipos        
    PessoaTipos.forEach(tipo => {
        if (pessoaTipo.find(e => e.TPessoaCod === tipo.TPessoaCod) == undefined) {
            pessoaTipo.push(tipo);
        }
    });
    if (pessoaTipo.length === 0) {
        pessoaTipo.push({ EmpIdf: EmpIdf, TPessoaCod: consts.TPessoaCod });
    }

    // Tratar Pessoas Perfil   
    PessoaPerfils.forEach(perfil => {
        if (pessoaPerfil.find(e => e.PerfilCod == perfil.PerfilCod) == undefined) {
            pessoaPerfil.push(perfil);
        }
    });
    if (pessoaPerfil.length === 0) {
        pessoaPerfil.push({ EmpIdf: EmpIdf, PerfilCod: consts.PerfilCod });
    }

    // Tratar Pessoas Modalidade   
    PessoaModalidades.forEach(modalidade => {
        if (pessoaModalidade.find(e => e.ModCod == modalidade.ModCod) == undefined) {
            pessoaModalidade.push(modalidade);
        }
    });
    if (pessoaModalidade.length === 0) {
        pessoaModalidade.push({ EmpIdf: EmpIdf, ModCod: consts.ModCod });
    }
}

module.exports = {
    async create(req, res) {
        const { EmpIdf, PesCod, PesNome, PesNomeResumido, PesEmail, PesTipo, AudCodInc, AudDataInc, AudCodAlt, AudDataAlt, PessoaTipos, PessoaPerfils, PessoaModalidades } = req.body;
        var pessoaTipo = [];
        var pessoaPerfil = [];
        var pessoaModalidade = [];
        tratarPessoa(PessoaTipos, PessoaPerfils, PessoaModalidades, pessoaTipo, pessoaPerfil, pessoaModalidade, EmpIdf);

        //const t = await sequelize.transaction();
        try {

            // Incluir pessoa
            const pessoa = await Pessoa.create(
                {
                    EmpIdf, PesCod, PesNome, PesNomeResumido, PesEmail, PesTipo, AudCodInc, AudDataInc, AudCodAlt, AudDataAlt
                }
            ).then(() => {
                PessoaPerfils.forEach(cod => {
                    PerfilCreate(
                        { EmpIdf, PesCod, PerfilCod: cod.PerfilCod, PesPerObs: 'perfil', AudCodInc, AudDataInc }, res
                    ).then(
                        (data) => this.return(data)
                    ).catch(function (err) {
                        return errDB(res, err, 'Create Pessoa/PessoaPerfil');
                    });
                });
                PessoaTipos.forEach(cod => {
                    TipoCreate(
                        { EmpIdf, PesCod, TPessoaCod: cod.TPessoaCod, PesTipObs: 'tipo', AudCodInc, AudDataInc }, res
                    ).then(
                        (data) => this.return(data)
                    ).catch(function (err) {
                        return errDB(res, err, 'Create Pessoa/PessoaTipo');
                    });
                });
                PessoaModalidades.forEach(cod => {
                    ModalidadeCreate(
                        { EmpIdf, PesCod, ModCod: cod.ModCod, PesModObs: 'modalidade', PesModInicio: cod.PesModInicio, AudCodInc, AudDataInc }, res
                    ).then(
                        (data) => this.return(data)
                    ).catch(function (err) {
                        return errDB(res, err, 'Create Pessoa/PessoaModalidade');
                    });
                });
            }
            ).then(() => {
                console.log('return')
                return res.json(req.body)
            });
        }
        catch (error) {
            console.log('error', error)
            return errDB(res, error, 'Incluir Pessoa')
        }
    },

    async findAllComplete(req, res) {
        const { EmpIdf } = req.body;

        Pessoa.hasMany(PessoaTipo);
        PessoaTipo.belongsTo(Pessoa);
        PessoaTipo.hasOne(TipoPessoa);
        TipoPessoa.belongsTo(PessoaTipo);

        Pessoa.hasMany(PessoaPerfil)
        PessoaPerfil.belongsTo(Pessoa)
        PessoaPerfil.hasOne(Perfil);
        Perfil.belongsTo(PessoaPerfil);

        Pessoa.hasMany(PessoaModalidade)
        PessoaModalidade.belongsTo(Pessoa)
        PessoaModalidade.hasOne(Modalidade);
        Modalidade.belongsTo(PessoaModalidade);
        const retorno = await Pessoa.findAll({
            attributes: ['EmpIdf', 'PesCod', 'PesNome', 'PesNomeResumido', 'PesEmail', 'PesTipo'],
            include:
                [{
                    model: PessoaTipo,
                    on: {
                        a: where(col("Pessoa.EmpIdf"), "=", col("PessoaTipos.EmpIdf")),
                        b: where(col("Pessoa.PesCod"), "=", col("PessoaTipos.PesCod")),
                    },
                    attributes: ['EmpIdf', 'TPessoaCod', [literal("'tipopessoa'"), 'TPessoaDes']]//,
                },
                {
                    model: PessoaPerfil,
                    on: {
                        a: where(col("Pessoa.EmpIdf"), "=", col("PessoaPerfils.EmpIdf")),
                        b: where(col("Pessoa.PesCod"), "=", col("PessoaPerfils.PesCod")),
                    },
                    attributes: ['EmpIdf', 'PerfilCod', [literal("'perfilpessoa'"), 'PerfilDes']]//,
                },
                {
                    model: PessoaModalidade,
                    on: {
                        a: where(col("Pessoa.EmpIdf"), "=", col("PessoaModalidades.EmpIdf")),
                        b: where(col("Pessoa.PesCod"), "=", col("PessoaModalidades.PesCod")),
                    },
                    attributes: ['EmpIdf', 'ModCod', 'PesModInicio', [literal("'modalidadepessoa'"), 'ModDes']]//,
                }],
            where: {
                EmpIdf: EmpIdf
            }
        }).catch(function (err) {
            return errDB(res, err);
        });

        return res.json(retorno);
    },

    async update(req, res) {
        const { EmpIdf, PesCod, PesNome, PesNomeResumido, PesEmail, PesTipo, AudCodInc, AudDataInc, AudCodAlt, AudDataAlt, PessoaTipos, PessoaPerfils, PessoaModalidades } = req.body;
        var pessoaTipo = [];
        var pessoaPerfil = [];
        var pessoaModalidade = [];
        // Tratar Pessoas 
        tratarPessoa(PessoaTipos, PessoaPerfils, PessoaModalidades, pessoaTipo, pessoaPerfil, pessoaModalidade, EmpIdf);

        try {
            const pessoas = await Pessoa.update(
                {
                    PesNome, PesNomeResumido, PesEmail, PesTipo, AudCodAlt, AudDataAlt
                }, {
                where: {
                    EmpIdf,
                    PesCod
                }
            }).then(() => {

                PerfilDelete({ EmpIdf, PesCod }, res).then(
                    PessoaPerfils.forEach(cod => {
                        PerfilCreate(
                            { EmpIdf, PesCod, PerfilCod: cod.PerfilCod, PesPerObs: 'perfil', AudCodInc, AudDataInc }, res
                        ).then(
                            (data) => this.return(data)
                        ).catch(function (err) {
                            return errDB(res, err, 'Create Pessoa/PessoaPerfil');
                        });
                    })
                ).catch(function (err) {
                    return errDB(res, err, 'Create Pessoa/PessoaPerfil');
                });
                TipoDelete({ EmpIdf, PesCod }, res).then(
                    PessoaTipos.forEach(cod => {
                        TipoCreate(
                            { EmpIdf, PesCod, TPessoaCod: cod.TPessoaCod, PesTipObs: 'tipo', AudCodInc, AudDataInc }, res
                        ).then(
                            (data) => this.return(data)
                        ).catch(function (err) {
                            return errDB(res, err, 'Create Pessoa/PessoaTipo');
                        });
                    })
                ).catch(function (err) {
                    return errDB(res, err, 'Create Pessoa/PessoaTipo');
                });
                ModalidadeDelete({ EmpIdf, PesCod }, res).then(
                    PessoaModalidades.forEach(cod => {
                        ModalidadeCreate(
                            { EmpIdf, PesCod, ModCod: cod.ModCod, PesModObs: 'modalidade', PesModInicio: cod.PesModInicio, AudCodInc, AudDataInc }, res
                        ).then(
                            (data) => this.return(data)
                        ).catch(function (err) {
                            return errDB(res, err, 'Create Pessoa/PessoaModalidade');
                        });
                    })
                ).catch(function (err) {
                    return errDB(res, err, 'Create Pessoa/PessoaModalidade');
                });
            }
            ).then(() => {
                return res.json(req.body);
            });
        }
        catch (error) {
            return errDB(res, error, 'Alterar Pessoa')
        }
    },

    async delete(req, res) {
        const { EmpIdf, PesCod } = req.body;

        try {

            const retLogin = await Login.destroy({
                where:
                    [{
                        EmpIdf, PesCod
                    }]
            }).catch(function (err) {
                return errDB(res, err, 'Delete Login');
            });
            PerfilDelete({ EmpIdf, PesCod }, res).then(
                TipoDelete({ EmpIdf, PesCod }, res).then(
                    ModalidadeDelete({ EmpIdf, PesCod }, res).catch(function (err) {
                        return errDB(res, err, 'Delete Pessoa/PessoaModalidade');
                    })
                ).catch(function (err) {
                    return errDB(res, err, 'Delete Pessoa/PessoaTipo');
                })
            ).catch(function (err) {
                return errDB(res, err, 'Delete Pessoa/PessoaPerfil');
            });
            const retPessoa = await Pessoa.destroy({
                where:
                    [{
                        EmpIdf, PesCod
                    }]
            }).catch(function (err) {
                return errDB(res, err, 'Delete Pessoa');
            });
            return res.status(200);
        }
        catch (error) {
            //await t.rollback();
            return errDB(res, error, 'Excluir Pessoa')
        }
    },

    async findAll(req, res) {
        const { EmpIdf } = req.body;
        const retorno = await Pessoa.findAll({
            attributes: ['EmpIdf', 'PesCod', 'PesNome'],
            where: {
                EmpIdf: EmpIdf
            }
        });

        return res.json(retorno);
    },

    async summary(req, res) {
        const { EmpIdf } = req.body;

        const retorno = await Pessoa.count({
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