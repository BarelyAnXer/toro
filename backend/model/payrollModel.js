import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

const PayRoll = sequelize.define('PayRoll', {
  employeeId: {
    type: DataTypes.INTEGER,
  },
  // startDate: {
  //   type: DataTypes.STRING,
  // },
  // endDate: {
  //   type: DataTypes.STRING,
  // },
  currentDate: {
    type: DataTypes.STRING,
  },
  timeInDate: {
    type: DataTypes.STRING,
  },
  timeOutDate: {
    type: DataTypes.STRING,
  },
  markDate: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
}, {});

export default PayRoll;


