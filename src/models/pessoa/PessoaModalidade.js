const { Sequelize, Model, DataTypes } = require('sequelize');

class PessoaModalidade extends Model {
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
            ModCod: {
                type: DataTypes.DECIMAL(15),
                primaryKey: true,
                allowNull: false
            },
            PesModObs: {
                type: DataTypes.STRING(1000)
            },
            PesModInicio: {
                type: DataTypes.DATE
            },
            AudCodInc: {
                type: DataTypes.DECIMAL(15),
                allowNull: false
            },
            AudDataInc: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        }, {
            sequelize,
            tableName: 'pessoamod'
        })
    }
}

module.exports = PessoaModalidade;