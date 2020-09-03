const { Sequelize, Model, DataTypes } = require('sequelize');

class EventoData extends Model {
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
            EvtData: {
                type: DataTypes.DATE,
                primaryKey: true,
                allowNull: false
            },
            EvtDataDes: {
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
            tableName: 'eventodata'
        })
    }
}

module.exports = EventoData;