import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

const Employee = sequelize.define('Employee', {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  position: {
    type: DataTypes.STRING,
  },
  sickLeaveCredits: {
    type: DataTypes.INTEGER,
  },
  vacationLeaveCredits: {
    type: DataTypes.INTEGER,
  },
  hourlyRate: {
    type: DataTypes.INTEGER,
  },
}, {});

export default Employee;
