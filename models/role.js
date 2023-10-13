const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
class Role extends Model {}
Role.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    role: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "role",
  }
);

module.exports = Role;