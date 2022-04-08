import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

const Employee = sequelize.define('Employee', {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  clearanceLevel: {
    type: DataTypes.STRING,
  },
}, {});

export default Employee;
