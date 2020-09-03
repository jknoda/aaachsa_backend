const { Sequelize, Model, DataTypes } = require('sequelize');

class Evento extends Model {
    static init(sequelize) {
        super.init({
            EmpIdf: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            EvtCod: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            EvtDes: {
                type: DataTypes.STRING(200),
                allowNull: false
            },
            EvtRes: {
                type: DataTypes.DECIMAL(15)
            },
            EvtDataInicio: {
                type: DataTypes.DATE,
                allowNull: false
            },
            EvtDataFim: {
                type: DataTypes.DATE,
                allowNull: false
            },
            EvtObs: {
                type: DataTypes.STRING(1000)
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
            tableName: 'evento'
        })
    }
}

module.exports = Evento;