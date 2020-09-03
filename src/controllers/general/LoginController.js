const Login = require('../../models/general/Login');
const Pessoa = require('../../models/pessoa/Pessoa');
const PessoaPerfil = require('../../models/pessoa/PessoaPerfil');
const PessoaTipo = require('../../models/pessoa/PessoaTipo');
const Consts = require('../../config/consts');
const { Op, json } = require('sequelize');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const env = require('../../.env');
const errDB = require('../common/_sendErrorsDB');

const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;

const login = (req, res, next) => {
    const empIdf = req.body.EmpIdf || '';
    const loginUsuario = req.body.LoginUsuario || '';
    const loginSenha = req.body.LoginSenha || '';
    Login.findOne({
        where: {
            EmpIdf: empIdf,
            LoginUsuario: loginUsuario
        }
    }).then((data) => {
        if (data != null && bcrypt.compareSync(loginSenha, data.LoginSenha)) {
            const token = jwt.sign({ empIdf, loginUsuario }, env.authSecret, {
                expiresIn: "1 day"
            });
            const EmpIdf = data.EmpIdf;
            const LoginUsuario = data.LoginUsuario;
            const PesCod = data.PesCod || 0;
            Pessoa.findOne({
                attributes: ['EmpIdf', 'PesCod', 'PesNome', 'PesNomeResumido', 'PesEmail', 'PesTipo'],
                where: {
                    EmpIdf, PesCod
                }
            }).then((pessoa) => {
                PessoaPerfil.findAll(
                    {
                        attributes: ['EmpIdf', 'PesCod', 'PerfilCod'],
                        where: {
                            EmpIdf, PesCod
                        }
                    }).then((perfil) => {
                        const dados = {
                            EmpIdf: pessoa.EmpIdf,
                            PesCod: pessoa.PesCod,
                            PesNome: pessoa.PesNome,
                            PesEmail: pessoa.PesEmail,
                            Perfil: perfil.map(p => p.PerfilCod) || [],
                            LoginUsuario,
                            token
                        }
                        return res.json(dados);
                    }).catch(function (err) {
                        console.log('<<<ERRO>>>', err);
                        return errDB(res, err, 'Perfil');
                    });
            }).catch(function (err) {
                return errDB(res, err, 'Pessoa');
            });
        } else {
            return res.status(400).json({ errors: ['Usuário/Senha inválidos'] });
        }
    }).catch((err) => {
        return errDB(res, err, 'Login');
    });
}

const validateToken = (req, res, next) => {
    const token = req.body.token || '';

    jwt.verify(token, env.authSecret, function (err, decoded) {
        return res.status(200).json({ valid: !err });
    });
}

const signup = (req, res, next) => {
    const empIdf = req.body.EmpIdf || '';
    const loginUsuario = req.body.LoginUsuario || '';
    const loginSenha = req.body.LoginSenha || '';
    const confirmPassword = req.body.confirm_password || '';
    const pesNome = req.body.PesNome || '';
    const pesNomeResumido = req.body.PesNomeResumido || '';
    const pesEmail = req.body.PesEmail || '';
    const pesCod = req.body.PesCod || 0;

    if (pesCod === 0) {
        return res.status(400).send({ errors: ['Informe o CPF'] });
    }

    if (!pesEmail.match(emailRegex)) {
        return res.status(400).send({ errors: ['O e-mail informado está inválido'] });
    }

    if (!loginSenha.match(passwordRegex)) {
        return res.status(400).json({
            errors: ["Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6 - 20."]
        });
    }
    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(loginSenha, salt);
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).json({ errors: ['Senhas não conferem.'] });
    }

    Login.findOne({
        where:
            [{
                EmpIdf: empIdf, LoginUsuario: loginUsuario
            }],
    }).then((data) => {
        if (data != null) {
            return res.status(400).json({ errors: ['Usuário já cadastrado.'] });
        } else {
            Pessoa.create({
                EmpIdf: empIdf, PesCod: pesCod, PesNome: pesNome, PesNomeResumido: pesNomeResumido, PesEmail: pesEmail, AudCodInc: pesCod, AudDataInc: new Date()
            }).then(() => {
                PessoaTipo.create({
                    EmpIdf: empIdf, PesCod: pesCod, TPessoaCod: Consts.TipoCod, PesTipObs: 'Criado no signup', AudCodInc: pesCod, AudDataInc: new Date()
                }).then(() => {
                    PessoaPerfil.create({
                        EmpIdf: empIdf, PesCod: pesCod, PerfilCod: Consts.PerfilCod, PesPerObs: 'Criado no signup', AudCodInc: pesCod, AudDataInc: new Date()
                    }).then(() => {
                        Login.create({
                            EmpIdf: empIdf, PesCod: pesCod, LoginUsuario: loginUsuario, LoginSenha: passwordHash, AudCodInc: pesCod, AudDataInc: new Date()
                        }).then(() => {
                            login(req, res, next);
                        }).catch((err) => {
                            return errDB(res, err, 'Login');
                        });
                    }).catch((err) => {
                        return errDB(res, err, 'Perfil');
                    });
                }).catch((err) => {
                    return errDB(res, err, 'Tipo');
                });
            }).catch((err) => {
                return errDB(res, err, 'Pessoa');
            });
        }
    }).catch((err) => {
        return errDB(res, err, 'Login');
    });
}

module.exports = { login, signup, validateToken };
