const { Sequelize, Model, DataTypes } = require('sequelize');

class Treino extends Model {
    static init(sequelize) {
        super.init({
            EmpIdf: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            TrnCod: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            TrnDes: {
                type: DataTypes.STRING(200),
                allowNull: false
            },
            ModCod: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            TrnDataInicial: {
                type: DataTypes.DATE,
                allowNull: false
            },
            TrnHoraInicial: {
                type: DataTypes.TIME,
                allowNull: false
            },
            TrnDataFinal: {
                type: DataTypes.DATE,
                allowNull: false
            },
            TrnHoraFinal: {
                type: DataTypes.TIME,
                allowNull: false
            },
            TrnResp: {
                type: DataTypes.DECIMAL(15)
            },
            TrnRel: {
                type: DataTypes.TEXT
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
            tableName: 'treino'
        })
    }
}

module.exports = Treino;