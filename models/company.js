import Sequelize from 'sequelize';
import Database from '../database.js';

const Company = Database.define('company', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    companyName: Sequelize.STRING,
    companyLogo: Sequelize.STRING,
    address: Sequelize.STRING,
    city: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    bio: Sequelize.TEXT,
    categoryId: Sequelize.INTEGER
})

export default Company;