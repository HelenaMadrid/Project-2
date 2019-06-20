var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING
      },
      passwordMatch: {
        type: DataTypes.STRING
      }
    },
    {
      hooks: {
        beforeCreate: user => {
          {
            user.password =
              // eslint-disable-next-line eqeqeq
              user.password && user.password != ""
                ? bcrypt.hashSync(user.password, 10)
                : "";
            user.passwordMatch =
              // eslint-disable-next-line eqeqeq
              user.passwordMatch && user.passwordMatch != ""
                ? bcrypt.hashSync(user.passwordMatch, 10)
                : "";
          }
        }
      }
    }
  );

  User.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    User.hasMany(models.Experience, {
      foreignKey: "UserId"
    });
    User.hasMany(models.Studies, {
      foreignKey: "UserId"
    });
    User.hasMany(models.Skills, {
      foreignKey: "UserId"
    });
    User.hasMany(models.Languages, {
      foreignKey: "UserId"
    });
    User.hasMany(models.GeneralInfo, {
      foreignKey: "UserId"
    });
  };
  // User.hasMany(models.Experience); 
  // User.hasMany(models.Studies); 
  // User.hasMany(models.Skills); 
  // User.hasMany(models.GeneralInfo); 

  return User;
};
