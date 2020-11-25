module.exports = (sequelize, DataTypes) => {

  sequelize.define('imagencoleccion', {

    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    coleccion: {
        type: DataTypes.STRING(20),
        allowNull: false
      }, 
    documento: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
    faceId: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    imagenId: {
        type: DataTypes.STRING(200),
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
