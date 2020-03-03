const { Sequelize} = require('sequelize');


module.exports = (database, type) => {
    return database.define('categories_data', {
        id: {
          type: type.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        rating :{
          type: type.STRING
        },
        price :{
          type: type.STRING
        },
        titles :{
          type: type.STRING
        }
    })
}