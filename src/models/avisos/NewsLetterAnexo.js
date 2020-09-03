const { Sequelize, Model, DataTypes } = require('sequelize');

class NewsLetterAnexo extends Model {
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
            NewsAnxSeq: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            NewAnxAnexo: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            NewAnxExt: {
                type: DataTypes.STRING(20)
            },
            NewAnxBlob: {
                type: DataTypes.BLOB,
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
            tableName: 'newsletteranexo'
        })
    }
}

module.exports = NewsLetterAnexo;