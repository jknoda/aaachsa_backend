const { Sequelize, Model, DataTypes } = require('sequelize');

class TreinoParticipantes extends Model {
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
            PesCod: {
                type: DataTypes.DECIMAL(15),
                primaryKey: true,
                allowNull: false
            },
            TrnParObs: {
                type: DataTypes.STRING(1000),
                allowNull: false
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
            tableName: 'treinopart'
        })
    }
}

module.exports = TreinoParticipantes;