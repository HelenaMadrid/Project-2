module.exports = function(sequelize, DataTypes) {
  var Languages = sequelize.define(
    "Languages",
    {
      language: {
        type: DataTypes.STRING,
        allowNull: false,

        // len is a validation that checks that our todo is between 1 and 140 characters
        validate: {
          len: [1, 140]
        }
      },

      languageLevel: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          len: [1, 140]
        }
      }
    },
    {
      timestamps: false
    }
  );

  Languages.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Languages.belongsTo(models.User, {
      foreignKey: {
        foreignKey: "id"
      }
    });
  };

  return Languages;
};
