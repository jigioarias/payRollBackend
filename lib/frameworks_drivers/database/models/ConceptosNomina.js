module.exports = (sequelize, DataTypes) => {

  sequelize.define('conceptonomina', {
    // attributes
    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    clase: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
    concept: {
        type: DataTypes.INTEGER,
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
