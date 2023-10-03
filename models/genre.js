const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
class Genre extends Model {}
Genre.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "genre",
  }
);

module.exports = Genre;
