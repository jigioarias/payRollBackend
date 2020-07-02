module.exports = (sequelize, DataTypes) => {

  sequelize.define('solicitudvacacion', {
    // attributes
    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

   document: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    enjoyInitDate: {
        type: DataTypes.DATE,
        allowNull: false
     },
     enjoyEndDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    moneyDays: {
        type: DataTypes.INTEGER(1),
        allowNull: false
      },
    state:{
        type: DataTypes.STRING(1),
        allowNull: false,
        isIn: [['P', 'R','A']]
    }  ,
      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      }

  }, {
    
  });

};
