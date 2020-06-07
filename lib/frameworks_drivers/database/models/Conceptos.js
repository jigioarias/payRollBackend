module.exports = (sequelize, DataTypes) => {

  sequelize.define('concepto', {
    // attributes
    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    code: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fittype: {
        type: DataTypes.STRING(1),
        allowNull: false,
        isIn: [['S', 'R']]

      },
    accountingcode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    conceptType: {
        type: DataTypes.STRING(1),
        allowNull: true,
        isIn: [['B', 'N']]
      },
      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      }



  }, {
    
  });

};
