const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
class Cart extends Model {}
Cart.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.STRING
    },
    itemId: {
      type: DataTypes.STRING,      
    },       
  },
  {
    sequelize,
    modelName: "cart"
  }
);

module.exports = Cart;
