module.exports = (sequelize, DataTypes) => {

  sequelize.define('novedadnomina', {
    // attributes
    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    clase: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      
     employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    document: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    concept: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
     
    period: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
      valor: {
        type: DataTypes.FLOAT(10,2),
        allowNull: true
      },
      hours: {
        type: DataTypes.FLOAT(10,2),
        allowNull: true
      },
      
      InitDayPay: {
        type: DataTypes.DATE,
        allowNull: false      
    },
      endDayPay: {
        type: DataTypes.DATE,
        allowNull: false
      },
      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      }

  }, {
    
  });

};
