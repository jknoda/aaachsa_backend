const { Sequelize, Model, DataTypes } = require('sequelize');

class EventoParticipantes extends Model {
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
            PesCod: {
                type: DataTypes.DECIMAL(15),
                primaryKey: true,
                allowNull: false
            },
            EvtParObs: {
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
            tableName: 'eventopart'
        })
    }
}

module.exports = EventoParticipantes;