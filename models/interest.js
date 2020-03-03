const { Sequelize} = require('sequelize');

module.exports = (database, type) => {
    return database.define('categories', {
        id: {
          type: type.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        Category :{
          type: type.STRING
        },
        User :{
          type: type.STRING
        }
    })
}