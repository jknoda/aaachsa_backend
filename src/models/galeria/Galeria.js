const { Model, DataTypes } = require('sequelize');

class Galeria extends Model {
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

module.exports = Galeria;