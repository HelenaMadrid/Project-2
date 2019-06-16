module.exports = function(sequelize, DataTypes) {
  var studies = sequelize.define("Skills", {
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

    grade: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [1, 140]
      }
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [1, 140]
      }
    },

    place: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [1, 140]
      }
    }
  });

  studies.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    studies.belongsTo(models.uUser, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return studies;
};
