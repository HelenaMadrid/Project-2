module.exports = function(sequelize, DataTypes) {
  var Skills = sequelize.define(
    "Skills",
    {
      skillName: {
        type: DataTypes.STRING,
        allowNull: false,

        // len is a validation that checks that our todo is between 1 and 140 characters
        validate: {
          len: [1, 140]
        }
      },

      level: {
        type: DataTypes.INTEGER,
        allowNull: false,

        validate: {
          isNumeric: true,
          min: 0,
          max: 5
        }
      }
    },
    {
      timestamps: false
    }
  );

  Skills.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Skills.belongsTo(models.User, {
      foreignKey: {
        foreignKey: "id"
      }
    });
  };

  return Skills;
};
