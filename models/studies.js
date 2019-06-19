module.exports = function(sequelize, DataTypes) {
  var Studies = sequelize.define(
    "Studies",
    {
      entryDateSchool: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          isDate: true
        }
      },

      leaveDateSchool: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          isDate: true
        }
      },

      degree: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          len: [1, 140]
        }
      },

      school: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          len: [1, 140]
        }
      },

      citySchool: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          len: [1, 140]
        }
      },

      stateSchool:{
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

  Studies.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Studies.belongsTo(models.User, {
      foreignKey: {
        foreignKey: "id"
      }
    });
  };

  return Studies;
};
