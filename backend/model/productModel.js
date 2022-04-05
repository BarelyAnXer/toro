import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
  },
}, {});

export default Product;
