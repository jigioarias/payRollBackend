module.exports = (sequelize, DataTypes) => {

  sequelize.define('unidad', {

    // attributes
    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    brachOffice: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    descripcion: {
        type: DataTypes.STRING(2),
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
