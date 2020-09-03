const { Sequelize, Model, DataTypes } = require('sequelize');

class EventoDataHora extends Model {
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
            EvtHoraIni: {
                type: DataTypes.TIME,
                primaryKey: true,
                allowNull: false
            },
            EvtHoraFim: {
                type: DataTypes.TIME,
                allowNull: true
            },
            EvtDataHoraDes: {
                type: DataTypes.STRING(1000),
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
            tableName: 'eventodatahora'
        })
    }
}

module.exports = EventoDataHora;