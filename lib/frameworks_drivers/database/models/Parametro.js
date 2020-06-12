module.exports = (sequelize, DataTypes) => {

  sequelize.define('parametro', {
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
    value: {
        type: DataTypes.STRING(100),
        allowNull: false,


      },
    type: {
        type: DataTypes.STRING(1),
        allowNull: false,
        isIn: [['B', 'N']]
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
