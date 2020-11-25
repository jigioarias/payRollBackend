module.exports = (sequelize, DataTypes) => {

  sequelize.define('coleccion', {

    // attributes
    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
    arn: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
    
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    
    user: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
  }, {
    
  });

};
