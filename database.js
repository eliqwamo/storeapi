import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    'storedb', //The name of the database
    'root', //The username of the database
    'root', //The password of the database
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

export default sequelize;