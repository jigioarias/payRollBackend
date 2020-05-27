module.exports = (sequelize, DataTypes) => {

  sequelize.define('grupoempresa', {

    // attributes
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
        type: DataTypes.STRING(20),
        allowNull: false
      },
      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      }

  }
  , {
    
  });

};
