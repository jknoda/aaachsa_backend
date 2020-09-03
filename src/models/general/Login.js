const { Sequelize, Model, DataTypes } = require('sequelize');

class Login extends Model {
    static init(sequelize) {
        super.init({
            EmpIdf: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            LoginUsuario: {
                type: DataTypes.STRING(20),
                primaryKey: true,
                allowNull: false
            },
            LoginSenha: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            PesCod: DataTypes.DECIMAL(15),
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
            tableName: 'login'
        })
    }
}

module.exports = Login;