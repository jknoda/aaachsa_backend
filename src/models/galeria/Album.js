const { Model, DataTypes } = require('sequelize');

class Album extends Model {
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

module.exports = Album;