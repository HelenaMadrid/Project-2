module.exports = function(sequelize, DataTypes) {
  var experience = sequelize.define("Skills", {
    entryDate: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        isDate: true
      }
    },

    leaveDate: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        isDate: true
      }
    },

    place: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [1, 140]
      }
    },

    company: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [1, 140]
      }
    },

    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [1, 140]
      }
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [1, 140]
      }
    },

    tasks: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [1, 140]
      }
    }
  });

  experience.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    experience.belongsTo(models.uUser, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return experience;
};
