const Sequelize = require('sequelize');
const databaseUri = require('./config')
const CategoryModel = require('./models/categories')
const CategoryDataModel = require('./models/category_data')

const sequelize = new Sequelize(databaseUri.psql_url)

sequelize.authenticate().then(() => {
    console.log("Success!");
}).catch((err) => {
    console.log(err);
    proccess.exit(0)
});

const Categories = CategoryModel(sequelize, Sequelize)
const Categories_data = CategoryDataModel(sequelize,Sequelize)

Categories_data.belongsTo(Categories, { targetKey: 'id', foreignKey: 'category_id' })

sequelize.sync({})
    .then(() => {
        console.log("Created")
    })

module.exports = {Categories,Categories_data}
