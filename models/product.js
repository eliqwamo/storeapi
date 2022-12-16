import Sequelize from 'sequelize';
import Database from '../database.js';

const Product = Database.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    productPrice: Sequelize.DECIMAL,
    productName: Sequelize.STRING,
    productDescription: Sequelize.TEXT,
    productImage: Sequelize.STRING,
    unitInStock: Sequelize.INTEGER,
    categoryId: Sequelize.INTEGER,
    companyId: Sequelize.INTEGER
})

export default Product;