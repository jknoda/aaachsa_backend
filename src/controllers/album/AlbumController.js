const Album = require('../../models/galeria/Album');
const Galeria = require('../../models/galeria/Galeria');
const errDB = require('../common/_sendErrorsDB');

const { where, col } = require('sequelize');

module.exports = {
    async findAllComplete(req, res) {
        const { EmpIdf } = req.body;

        Album.hasMany(Galeria);
        Galeria.belongsTo(Album);
        const retorno = await Album.findAll({
            attributes: ['EmpIdf', 'AlbumCod', 'AlbumDes'],
            include:
                [{
                    model: Galeria,
                    on: {
                        a: where(col("Album.EmpIdf"), "=", col("Galeria.EmpIdf")),
                        b: where(col("Album.AlbumCod"), "=", col("Galeria.AlbumCod")),
                    },
                    attributes: ['EmpIdf', 'AlbumCod','GalCod','GalDes','GalImagem','GalPath','GalArquivo','GalExtensao']
                }],
            where: {
                EmpIdf: EmpIdf
            }
        }).catch(function (err) {
            return errDB(res, err);
        });

        return res.json(retorno);
    },

    async create(req, res) {
        const { EmpIdf, AlbumCod, AlbumDes, AudCodInc, AudDataInc, AudCodAlt, AudDataAlt } = req.body;
        const retorno = await Album.create({ EmpIdf, AlbumCod, AlbumDes, AudCodInc, AudDataInc, AudCodAlt, AudDataAlt })
            .catch(function (err) {
                return errDB(res, err);
            });
        return res.json(retorno);
    },

    async update(req, res) {
        const { EmpIdf, AlbumCod, AlbumDes, AudCodAlt, AudDataAlt } = req.body;
        const retorno = await Album.update(
            {
                AlbumDes,
                AudCodAlt,
                AudDataAlt
            }, {
            where: {
                EmpIdf,
                AlbumCod
            }
        }).catch(function (err) {
            return errDB(res, err);
        });
        return res.json(retorno);
    },

    async delete(req, res) {
        const { EmpIdf, AlbumCod } = req.body;
        const retorno = await Album.destroy(
            {                
                where: {
                    EmpIdf,
                    AlbumCod
                }
            }).catch(function (err) {
                return errDB(res, err);
            });
        return res.json(retorno);
    },

    async findAll(req, res) {
        const { EmpIdf } = req.body;
        const retorno = await Album.findAll({
            attributes: ['EmpIdf','AlbumCod','AlbumDes'],
            where: {
                EmpIdf: EmpIdf
            }
        });

        return res.json(retorno);
    }
}
