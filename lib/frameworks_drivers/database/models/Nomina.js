module.exports = (sequelize, DataTypes) => {

  sequelize.define('nomina', {
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
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      address: {
        type: DataTypes.STRING(50),
        allowNull: false
      },    
      email: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING(100),
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
      monthSalary: {
        type: DataTypes.FLOAT(10,2),
        allowNull: true
      },
     salary: {
        type: DataTypes.FLOAT(10,2),
        allowNull: false,
      },
      
      InitDayPay: {
        type: DataTypes.DATE,
        allowNull: false      
    },
      endDayPay: {
        type: DataTypes.DATE,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING(1),
        allowNull: false,
        isIn: [['P', 'D']]    //parcial o definitiva
       },
       days: {
        type: DataTypes.INTEGER(2),
        allowNull: false      
      },
      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      }

  }, {
    
  });

};
