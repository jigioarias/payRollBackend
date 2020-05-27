module.exports = (sequelize, DataTypes) => {

  sequelize.define('sucursal', {

    // attributes
    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    address: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
     description: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false
      },

     active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
  }, {
    
  });

};
