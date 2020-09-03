const { Model, DataTypes } = require('sequelize');

class Empresa extends Model {
    static init(sequelize) {
        super.init({
            EmpIdf: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            EmpNome: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'empresa'
        })
    }
}

module.exports = Empresa;