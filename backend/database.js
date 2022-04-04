import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('database_name', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});
