import Sequelize from 'sequelize';
import Database from '../database.js';

const User = Database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: {type: Sequelize.STRING, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false},
    isApproved: Sequelize.BOOLEAN,
    passcode: Sequelize.INTEGER
})

export default User;