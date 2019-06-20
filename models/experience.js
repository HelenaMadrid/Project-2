module.exports = function (sequelize, DataTypes) {
  var Experience = sequelize.define(
    "Experience",
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

      city: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          len: [1, 140]
        }
      },

      state:{
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
          len: [1, 300]
        }
      },

      task1: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          len: [1, 140]
        }
      },

      task2: {
        type: DataTypes.STRING,
        allowNull: true,

        validate: {
          len: [1, 140]
        }
      },

      task3: {
        type: DataTypes.STRING,
        allowNull: true,

        validate: {
          len: [1, 140]
        }
      },

      task4: {
        type: DataTypes.STRING,
        allowNull: true,

        validate: {
          len: [1, 140]
        }
      },

      task5: {
        type: DataTypes.STRING,
        allowNull: true,

        validate: {
          len: [1, 140]
        }
      }

    },
    {
      timestamps: false
    }
  );

  Experience.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Experience.belongsTo(models.User, {
      foreignKey: {
        foreignKey: "id"
      }
    });
  };

  return Experience;
};
