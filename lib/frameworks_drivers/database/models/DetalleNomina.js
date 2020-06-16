module.exports = (sequelize, DataTypes) => {

  sequelize.define('detallenomina', {
    // attributes
    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    payrollId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      
     employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    period: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    concept: {
        type: DataTypes.INTEGER,
        allowNull: false,

      },
    conceptName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },

      valor: {
        type: DataTypes.FLOAT(10,2),
        allowNull: true
      },
      percentaje: {
        type: DataTypes.STRING(3),
        allowNull: true
      },
     conceptType: {
        type: DataTypes.STRING(1),
        allowNull: false,
        isIn: [['V', 'D']]  //devengo o deducccion
      },
      type: {
        type: DataTypes.STRING(1),
        allowNull: false,
        isIn: [['P', 'D']]    //parcial o definitiva
       },

      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
      



  }, {
    
  });

};
