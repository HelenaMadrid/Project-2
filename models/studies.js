module.exports = function(sequelize, DataTypes) {
  var Studies = sequelize.define(
    "Studies",
    {
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
    },
    {
      timestamps: false
    }
  );

  Studies.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Studies.belongsTo(models.User, {
      foreignKey: "id"
    });
  };

  return Studies;
};
