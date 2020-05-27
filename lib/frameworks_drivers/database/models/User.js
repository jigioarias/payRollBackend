module.exports = (sequelize, DataTypes) => {

  sequelize.define('user', {

    // attributes
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: true
    }

  }, {
    // options
  });

};
