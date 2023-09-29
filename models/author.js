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
    Name: {
      type: DataTypes.STRING,
    },
    Address: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "author",
  }
);

module.exports = Author;
