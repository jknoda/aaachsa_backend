const { Sequelize, Model, DataTypes } = require('sequelize');

class Pessoa extends Model {
    static init(sequelize) {
        super.init({
            EmpIdf: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            PesCod: {
                type: DataTypes.DECIMAL(15),
                primaryKey: true,
                allowNull: false
            },
            PesNome: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            PesNomeResumido: {
                type: DataTypes.STRING(50)
            },
            PesEmail: {
                type: DataTypes.STRING(200)
            },
            PesTipo: {
                type: DataTypes.CHAR,
                allowNull: false,
                defaultValue: 'F'
            },
            PesFoto: {
                type: DataTypes.BLOB
            },
            AudCodInc: {
                type: DataTypes.DECIMAL(15),
                allowNull: false
            },
            AudDataInc: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            AudCodAlt: DataTypes.DECIMAL(15),
            AudDataAlt: DataTypes.DATE
        }, {
            sequelize,
            tableName: 'pessoa'
        })
    }
}

module.exports = Pessoa;