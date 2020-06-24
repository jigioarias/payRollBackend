module.exports = (sequelize, DataTypes) => {

  sequelize.define('prestacionsocial', {
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
        type: DataTypes.STRING(20),
        allowNull: false,
        isIn: [['CENSANTIAS', 'PRIMA','INTERESES_CENSATIAS','VACACIONES']]    //parcial o definitiva
       },
      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      discount:{
        type: DataTypes.STRING(1),
        allowNull:false
      }

  }, {
    
  });

};
