const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
class User extends Model {}
User.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: "user"
  }
);

module.exports = User;
