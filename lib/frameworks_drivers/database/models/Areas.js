module.exports = (sequelize, DataTypes) => {

  sequelize.define('area', {

    // attributes
    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    unity: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
     active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
      ,
      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      }



  }, {
    
  });

};
