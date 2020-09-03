const { Sequelize, Model, DataTypes } = require('sequelize');

class NewsLetter extends Model {
    static init(sequelize) {
        super.init({
            EmpIdf: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            NewsCod: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            PesCod: {
                type: DataTypes.DECIMAL(15),
                allowNull: false
            },
            NewsDes: {
                type: DataTypes.STRING(1000),
                allowNull: false
            },
            NewsTexto: {
                type: DataTypes.TEXT,
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
            tableName: 'newsletter'
        })
    }
}

module.exports = NewsLetter;