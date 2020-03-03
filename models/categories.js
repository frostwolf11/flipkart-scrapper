const { Sequelize} = require('sequelize');

module.exports = (database, type) => {
    return database.define('categories', {
        id: {
          type: type.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        mainCategory :{
          type: type.STRING
        },
        subCategory :{
          type: type.STRING
        },
        url :{
          type: type.STRING
        }
    })
}