module.exports = function (sequelize, DataTypes) {
  var GeneralInfo = sequelize.define(
    "GeneralInfo",
    {
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
      },

      profilePic: {
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

  GeneralInfo.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    GeneralInfo.belongsTo(models.User, {
      foreignKey: {
        foreignKey: "id"
      }
    });
  };

  return GeneralInfo;
};
