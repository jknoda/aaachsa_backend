const { Sequelize, Model, DataTypes } = require('sequelize');

class QuadroMsg extends Model {
    static init(sequelize) {
        super.init({
            EmpIdf: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            QMenCod: {
                type: DataTypes.STRING(45),
                primaryKey: true,
                allowNull: false
            },
            PesCod: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            QMenMensagem: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            QMenInicio: {
                type: DataTypes.DATE,
                allowNull: false
            },
            QMenFim: {
                type: DataTypes.DATE,
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
            tableName: 'quadromsg'
        })
    }
}

module.exports = QuadroMsg;