import Sequelize from 'sequelize';
import Database from '../database.js';

const Category = Database.define('category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    categoryName: Sequelize.STRING
})

export default Category;