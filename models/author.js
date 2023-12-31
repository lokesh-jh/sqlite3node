const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
class Author extends Model {}
Author.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "author",
  }
);

module.exports = Author;
