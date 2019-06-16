module.exports = function(sequelize, DataTypes) {
  var skills = sequelize.define("Skills", {
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
  });

  skills.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    skills.belongsTo(models.uUser, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return skills;
};
