const { Sequelize, Model, DataTypes } = require('sequelize');

class PessoaTipo extends Model {
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
            TPessoaCod: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            PesTipObs: {
                type: DataTypes.STRING(200)
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
            tableName: 'pessoatipo'
        })
    }
}

module.exports = PessoaTipo;