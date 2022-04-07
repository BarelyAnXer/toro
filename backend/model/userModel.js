import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
}, {});

export default User;
