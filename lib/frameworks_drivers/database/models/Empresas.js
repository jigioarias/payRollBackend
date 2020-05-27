module.exports = (sequelize, DataTypes) => {

  sequelize.define('empresa', {

    // attributes
    nit: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },

    description: {
        type: DataTypes.STRING(2),
        allowNull: false
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
     active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      
      enterpriseGroup: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      }

  }, {
    
  });

};
