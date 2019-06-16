module.exports = function(sequelize, DataTypes) {
  var generalInfo = sequelize.define("GeneralInfo", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,

      // len is a validation that checks that our todo is between 1 and 140 characters
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

    address: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [1, 140]
      }
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [1, 140]
      }
    }
  });

  generalInfo.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    generalInfo.belongsTo(models.uUser, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return generalInfo;
};
