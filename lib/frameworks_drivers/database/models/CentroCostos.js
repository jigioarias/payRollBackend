module.exports = (sequelize, DataTypes) => {

  sequelize.define('centrocosto', {

    // attributes
    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(20),
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
      branchOffice: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
  }, {
    
  });

};
