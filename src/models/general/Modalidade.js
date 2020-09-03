const { Sequelize, Model, DataTypes } = require('sequelize');

class Modalidade extends Model {
    static init(sequelize) {
        super.init({
            EmpIdf: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            ModCod: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            ModDes: {
                type: DataTypes.STRING(200),
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
            tableName: 'modalidade'
        })
    }
}

module.exports = Modalidade;