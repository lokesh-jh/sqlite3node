const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
class Book extends Model {}
Book.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING
    },
    publishDate: {
      type: DataTypes.STRING,      
    },
    price: {
        type: DataTypes.INTEGER,      
      },
    author: {
      type: DataTypes.STRING
    },
    genre: {
        type: DataTypes.STRING
      }
  },
  {
    sequelize,
    modelName: "book"
  }
);

module.exports = Book;
