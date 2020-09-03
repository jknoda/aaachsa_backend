const { Sequelize, Model, DataTypes } = require('sequelize');

class TipoPessoa extends Model {
    static init(sequelize) {
        super.init({
            EmpIdf: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            TPessoaCod: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            TPessoaDes: {
                type: DataTypes.STRING(60),
                allowNull: false
            },
            AudCodInc: {
                type: DataTypes.DECIMAL(15),
                allowNull: false
            },
            AudDataInc: {
                type: DataTypes.DATE,
                allowNull: false
            },
            AudCodAlt: {
                type: DataTypes.DECIMAL(15)
            },
            AudDataAlt: {
                type: DataTypes.DATE
            }
        }, {
            sequelize,
            tableName: 'tipopessoa'
        })
    }
}

module.exports = TipoPessoa;